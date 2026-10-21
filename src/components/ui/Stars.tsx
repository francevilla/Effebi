import { cn } from "@/utils/cn";

/** Stelle della valutazione reale su PagineGialle. */
export function Stars({ className, size = "size-4" }: { className?: string; size?: string }) {
  return (
    <span
      role="img"
      aria-label="Valutazione: 5 stelle su 5"
      className={cn("flex items-center gap-0.5 text-accent", className)}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={size} aria-hidden="true">
          <path
            d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}
