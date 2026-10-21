import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import heroImg from "@/assets/hero-building.jpg";
import { ButtonLink } from "./ui/Button";import { EASE } from "./ui/motion";
import { cn } from "@/utils/cn";
const SENTENCE =
  "Amministrazione condominiale a San Lazzaro di Savena e Bologna. Architetti, ingegneri, termotecnici e una piattaforma per i condòmini: un solo studio, un solo interlocutore.";

/** Titolo dal bordo alto? No: il nome abbraccia il bordo inferiore,brica da film. */
function MaskLine({ children, delay }: { children: ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate bg-bg">
      <div className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden px-4 pb-5 pt-8 sm:px-6 lg:px-8 lg:pb-6">
        <img
          src={heroImg}
          alt="Il condominio che lo studio amministra: facciata con portici a Bologna"
          fetchPriority="high"
          decoding="async"
          className={cn("absolute inset-0 size-full object-cover object-[50%_64%] brightness-[.72]", !reduce && "animate-drift")}
        />

        {/* L'indirizzo in alto a sinistra, la frase e l'azione che attraversano l'orizzonte */}
        <div className="relative flex flex-1 flex-col">
          <motion.p
            initial={false}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-small text-body"
          >
            San Lazzaro di Savena · Bologna
          </motion.p>

          <motion.div
            initial={reduce ? false : { y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.55 }}
            className="mt-auto ml-0 mb-8 max-w-[46ch] md:ml-[27vw] lg:mb-12"
          >
            <p className="text-body text-ink">{SENTENCE}</p>
            <ButtonLink href="#contatti" size="lg" className="mt-6">
              Richiedi un parere gratuito
            </ButtonLink>
          </motion.div>

          <h1 id="hero-title" className="text-display text-ink">
            <MaskLine delay={0.05}>EffeBi</MaskLine>
            <MaskLine delay={0.18}>
              <span className="pl-[13vw]">× Eniminds</span>
            </MaskLine>
          </h1>
          <p className="mt-3 pb-1 text-[18px] text-body">
            Amministrazione condominiale a San Lazzaro di Savena e Bologna · architetti, ingegneri e termotecnici
          </p>
        </div>
      </div>
    </section>
  );
}
