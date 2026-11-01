import { cn } from "@/lib/utils";

export const container = "mx-auto w-full max-w-[1200px] px-6";

export const buttonPrimary =
  "inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-accent px-[22px] font-semibold text-accent-contrast transition-opacity duration-150 hover:opacity-90";
export const buttonSecondary =
  "inline-flex min-h-12 items-center gap-2 rounded-[10px] border border-border-strong px-[22px] font-medium text-text transition-colors duration-150 hover:bg-surface";

/** Card inside a `data-part="kit"` item (starter kits, Work with me services). */
export const kitCard =
  "flex min-w-0 flex-[1_1_250px] flex-col gap-3 rounded-[14px] border border-border p-6 text-text";

export function SectionHeader({
  eyebrow,
  title,
  id,
  className,
}: {
  eyebrow: string;
  title: string;
  id: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p data-part="eyebrow" className="mb-2.5 font-mono text-sm text-accent">
        {eyebrow}
      </p>
      <h2 id={id} className="font-heading text-[32px] font-bold tracking-[-0.01em] sm:text-[40px]">
        {title}
      </h2>
    </div>
  );
}

export function Tag({ children, outline }: { children: React.ReactNode; outline?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-md px-2.5 py-[5px] font-mono text-xs text-text-2",
        outline ? "border border-border-strong" : "bg-surface-2",
      )}
    >
      {children}
    </span>
  );
}

// Lucide v1 ships no brand icons; path from the approved mockup.
export function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}
