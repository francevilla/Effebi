import { cn } from "@/utils/cn";

/** Marchio: segno + nome. Due pesi soltanto (condensed 700 per il nome). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect width="40" height="40" fill="currentColor" />
      <path
        d="M11 20.5 20 12l9 8.5"
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.5 28.5V22h11v6.5" fill="none" stroke="var(--color-bg)" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={cn("size-8 shrink-0 text-accent", markClassName)} />
      <span className="font-display text-[22px] leading-none tracking-[-0.01em] text-ink">
        Studio EffeBi <span className="text-muted">×</span> Eniminds
      </span>
    </span>
  );
}
