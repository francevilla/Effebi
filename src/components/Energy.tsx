import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import energyRooftop from "@/assets/energy-rooftop.jpg";
import { EASE } from "@/components/ui/motion";

/** Le tre distanze della stessa fotografia, con la frase che si completa. */
const STAGES = [
  { scale: 1, origin: "50% 42%" },
  { scale: 1.8, origin: "30% 62%" },
  { scale: 2.6, origin: "54% 26%" },
] as const;

const CAPTION = "Il tetto con l'impianto fotovoltaico: diagnosi, fornitura condivisa e consumo monitorato.";

export function Energy() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStage(Number((e.target as HTMLElement).dataset.stage));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    wrap.querySelectorAll("[data-stage]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const s = STAGES[stage];

  return (
    <section id="energia" aria-labelledby="energy-title" className="relative bg-bg">
      <div ref={wrapRef} className="relative h-[280vh]">
        <div aria-hidden="true" className="absolute inset-0">
          <div data-stage="0" className="h-1/3" />
          <div data-stage="1" className="h-1/3" />
          <div data-stage="2" className="h-1/3" />
        </div>

        <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center px-4 sm:px-6">
          <motion.h2
            id="energy-title"
            initial={reduce ? false : { y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] text-ink"
          >
            L'energia del condominio,
          </motion.h2>

          <motion.p
            initial={reduce ? false : { y: 14 }}
            animate={stage > 0 ? { y: 0 } : { y: 14 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative z-10 text-center font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] text-accent"
          >
            sotto controllo.
          </motion.p>

          <figure className="mt-0 w-full max-w-[640px]">
            <div className="overflow-hidden">
              <img
                src={energyRooftop}
                alt="Il tetto di un condominio con l'impianto fotovoltaico e la città di Bologna alle sue spalle"
                loading="lazy"
                decoding="async"
                className="aspect-[3/2] w-full object-cover transition-transform duration-700"
                style={{
                  transform: `scale(${s.scale})`,
                  transformOrigin: s.origin,
                  transitionTimingFunction: "var(--ease-brand)",
                }}
              />
            </div>
          </figure>

          <div className="mt-7 flex w-full max-w-[720px] items-start justify-end gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 2 ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="hidden max-w-[26ch] text-body md:block"
            >
              {CAPTION}
            </motion.p>
          </div>

          <p className="mt-auto mb-6 max-w-[52ch] text-center text-small text-muted">
            Esempio illustrativo: nell'ipotesi mostrata il 38% dell'energia prodotta è autoconsumata. Diagnosi e
            risparmi effettivi variano da edificio a edificio.
          </p>
        </div>
      </div>
    </section>
  );
}
