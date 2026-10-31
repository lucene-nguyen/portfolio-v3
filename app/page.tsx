import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16">
      <ThemeSwitcher />
      <h1 className="mt-8 text-3xl font-semibold">Nguyen Manh Cuong</h1>
      <p className="mt-2 font-mono text-text-muted">Fullstack Software Engineer</p>
    </main>
  );
}
