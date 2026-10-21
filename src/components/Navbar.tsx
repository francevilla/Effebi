import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { CONTACT, NAV_LINKS } from "@/lib/constants";
import { LogoMark } from "./ui/Logo";
import { EASE } from "./ui/motion";

/** Barra piatta: marchio, quattro link, un'azione. Nessun blur, nessuna ombra. */
export function Navbar() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg print:hidden">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Studio EffeBi × Eniminds, torna in cima">
          <LogoMark className="size-8 text-accent" />
          <span className="font-display text-[21px] leading-none tracking-[-0.01em] text-ink">
            Studio EffeBi <span className="text-muted">×</span> Eniminds
          </span>
        </a>

        <nav aria-label="Sezioni" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-body text-body transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={CONTACT.phoneHref}
          className="ml-auto inline-flex min-h-11 items-center bg-accent px-4 text-[16px] font-medium text-accent-ink transition-colors hover:bg-ink md:ml-2 md:shrink-0"
        >
          {CONTACT.phoneDisplay}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-menu"
          className="flex size-11 items-center justify-center text-ink md:hidden"
        >
          <span className="sr-only">{open ? "Chiudi il menù" : "Apri il menù"}</span>
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <motion.nav
          id="nav-menu"
          aria-label="Sezioni, menù principale"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="bg-bg px-4 pb-6 pt-3 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center bg-surface2 px-4 text-lead text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      ) : null}
    </header>
  );
}
