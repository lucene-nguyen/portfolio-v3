import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const loaders = vi.hoisted(() => ({
  feature: vi.fn(async () => ({ default: () => <p>beta feature</p> })),
  layout: vi.fn(async () => ({
    default: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="beta-layout">{children}</div>
    ),
  })),
}));

vi.mock("@/themes/registry", () => {
  const tokens = {
    bg: "#000000",
    surface: "#111111",
    border: "#222222",
    text: "#ffffff",
    textMuted: "#cccccc",
    textSubtle: "#bbbbbb",
    accent: "#00ff00",
    accentContrast: "#000000",
  };
  const themes = [
    { id: "alpha", name: "Alpha", colorScheme: "dark", tokens },
    {
      id: "beta",
      name: "Beta",
      colorScheme: "light",
      tokens,
      layout: loaders.layout,
      features: [loaders.feature],
    },
  ];
  return {
    themes,
    defaultTheme: themes[0],
    getTheme: (id: string) => themes.find((t) => t.id === id),
  };
});

import { ThemeProvider } from "./theme-provider";
import { ThemeRuntime } from "./theme-runtime";
import { ThemeSwitcher } from "./theme-switcher";

function renderApp() {
  return render(
    <ThemeProvider>
      <ThemeSwitcher />
      <ThemeRuntime>
        <main>Shared content</main>
      </ThemeRuntime>
    </ThemeProvider>,
  );
}

const pick = (value: string) =>
  act(async () => {
    fireEvent.change(screen.getByLabelText("Theme"), { target: { value } });
  });

describe("theme engine", () => {
  beforeEach(() => {
    localStorage.clear();
    loaders.feature.mockClear();
    loaders.layout.mockClear();
    document.documentElement.dataset.theme = "alpha";
    window.history.replaceState(null, "", "/");
  });

  it("does not load inactive themes' layout or features", () => {
    renderApp();
    expect(loaders.feature).not.toHaveBeenCalled();
    expect(loaders.layout).not.toHaveBeenCalled();
  });

  it("switches theme, persists it, announces it, and keeps content", async () => {
    renderApp();
    const before = screen.getByRole("main").textContent;

    await pick("beta");

    expect(document.documentElement.dataset.theme).toBe("beta");
    expect(localStorage.getItem("theme")).toBe("beta");
    expect(screen.getByRole("status")).toHaveTextContent("Theme: Beta");
    expect(await screen.findByText("beta feature")).toBeInTheDocument();
    expect(await screen.findByTestId("beta-layout")).toBeInTheDocument();
    expect(screen.getByRole("main").textContent).toBe(before);
    expect(loaders.feature).toHaveBeenCalledTimes(1);
  });

  it("drops a ?theme override when the visitor picks a theme", async () => {
    window.history.replaceState(null, "", "/?theme=beta&x=1");
    document.documentElement.dataset.theme = "beta";
    renderApp();
    await pick("alpha");
    expect(window.location.search).toBe("?x=1");
  });

  it("ignores unknown ids", async () => {
    renderApp();
    await pick("nope");
    expect(document.documentElement.dataset.theme).toBe("alpha");
  });
});
