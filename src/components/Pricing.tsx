import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ButtonLink } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "./ui/motion";
import { CONTAINER, PLANS } from "@/lib/constants";
import { cn } from "@/utils/cn";

const eur = (v: number) => `${v.toLocaleString("it-IT")} €`;

/** La tavola del menù: nome, lineatura puntinata, prezzo. Una voce per ogni piano. */
export function Pricing() {
  const reduce = useReducedMotion();
  return (
    <section id="prezzi" aria-labelledby="pricing-title" className="bg-bg py-28 sm:py-36">
      <div className={CONTAINER}>
        <SectionHeading
          id="pricing-title"
          title="Il listino."
          description="Tre piani, un solo anno di impegno. Il prezzo è per unità immobiliare, IVA esclusa: ciò che leggi è ciò che in assemblea si delibera."
          note="Listino aggiornato alle schede pubbliche dello studio."
        />

        <motion.ul
          initial={reduce ? false : { y: 18 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16"
        >
          {PLANS.map((p) => (
            <li
              key={p.id}
              className={cn("py-10 sm:px-2", p.popular && "bg-surface sm:px-6")}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
                <div>
                  <h3 className="font-display text-[clamp(1.9rem,3.4vw,3.1rem)] leading-none text-ink">{p.name}</h3>
                </div>
                {/* La lineatura puntinata che porta al prezzo, come nel menù */}
                <span aria-hidden="true" className={cn(
                  "hidden min-w-8 grow self-end border-b-2 border-dotted border-muted/60 lg:block" /* taste-skill-ignore: la lineatura del menù è il device di questa sezione */
                )} />
                <p className="tabular-nums">
                  <span className="font-display text-[clamp(2.2rem,4vw,4rem)] leading-none text-accent">{eur(p.price)}</span>
                  <span className="ml-2 text-small text-muted">per unità · anno, IVA esclusa</span>
                </p>
              </div>
              <p className="mt-3 max-w-[52ch] text-lead text-body">{p.tagline}</p>
              <ul className="mt-6 grid gap-x-12 gap-y-2 text-body text-body sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="max-w-[52ch]">
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </motion.ul>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
          <ButtonLink href="#contatti" size="lg">
            Chiedi il preventivo
          </ButtonLink>
          <p className="max-w-[46ch] text-small text-muted">
            I compiti delle opere (manutenzioni, fornitori, imposte) sono spese reali del condominio e restano nei
            rendiconti: non passano da qui.
          </p>
        </div>
      </div>
    </section>
  );
}
