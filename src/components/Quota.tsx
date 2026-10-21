import { useMemo, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ButtonLink } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "./ui/motion";
import { PLANS } from "@/lib/constants";
import { cn } from "@/utils/cn";

const eur = (v: number) => v.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/** La cosa viva: la quota annuale del condominio, calcolata sul listino reale. */
export function Quota() {
  const reduce = useReducedMotion();
  const [plan, setPlan] = useState<(typeof PLANS)[number]>(PLANS[1]);
  const [units, setUnits] = useState(12);

  const total = useMemo(() => plan.price * units, [plan, units]);

  return (
    <section id="quota" aria-labelledby="quota-title" className="relative overflow-x-clip bg-bg py-28 sm:py-36">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-8">
        <div>
          <SectionHeading
            id="quota-title"
            title="La tua quota."
            description="Muovi il cursore: il totale annuale dello studio per il tuo edificio, calcolato sul listino vero. Niente sorprese in assemblea."
          />

          {/* Il piano, scelto tra tre voci reali del listino */}
          <fieldset className="mt-10">
            <legend className="text-small text-muted">Piano di amministrazione</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {PLANS.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center gap-3 px-4 text-[17px] transition-colors",
                    plan.id === p.id ? "bg-accent text-accent-ink" : "bg-surface2 text-ink hover:bg-surface"
                  )}
                >
                  <input
                    type="radio"
                    name="piano"
                    value={p.id}
                    checked={plan.id === p.id}
                    onChange={() => setPlan(p)}
                    className="sr-only"
                  />
                  <span aria-hidden="true" className={cn("size-2.5", plan.id === p.id ? "bg-accent-ink" : "bg-muted")} />
                  {p.name} · {eur(p.price)}/anno per unità
                </label>
              ))}
            </div>
          </fieldset>

          {/* Il cursore porta il conteggio */}
          <div className="mt-10 max-w-[560px]">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="units-range" className="text-[17px] text-ink">
                Unità immobiliari nel condominio
              </label>
              <output htmlFor="units-range" className="text-[19px] font-medium tabular-nums text-ink">
                {units}
              </output>
            </div>
            <div className="relative mt-3">
              <div aria-hidden="true" className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-surface2" />
              <div
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-1 w-1/2 -translate-y-1/2 bg-accent transition-[width] duration-100"
                style={{ width: `${((units - 2) / 118) * 100}%` }}
              />
              <input
                id="units-range"
                type="range"
                className="range-input relative z-10"
                min={2}
                max={120}
                step={1}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                aria-valuetext={`${units} unità immobiliari`}
              />
            </div>
            <div aria-hidden="true" className="mt-1 flex justify-between text-small text-muted">
              <span>2</span>
              <span>120</span>
            </div>
          </div>

          {/* Il numero vivo */}
          <div className="mt-12 flex flex-wrap items-end gap-x-8 gap-y-4">
            <motion.div
              initial={false}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="min-w-[240px]"
            >
              <p className="font-display text-[clamp(3rem,6vw,5.5rem)] tabular-nums leading-none text-ink">
                {eur(total)}
              </p>
              <p className="mt-2 text-small text-muted">Totale annuale, IVA esclusa</p>
            </motion.div>
            <ButtonLink href="#contatti" size="lg">
              Richiedi il preventivo
            </ButtonLink>
            <p className="w-full text-small text-muted">
              È il solo compito dell'amministrazione: manutenzioni, fornitori e imposte restano spese reali nei rendiconti.
            </p>
          </div>
        </div>

        {/* La prova: la tabella millesimale, come documento stampato, con l'angolo che esce dal bordo */}
        <div className="relative lg:ml-auto">
          <MillTable planPrice={plan.price} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

/** Scheda stampata inclinata di 1,5°, tagliata dal bordo della pagina. Esempio dimostrativo. */
function MillTable({ planPrice, reduce }: { planPrice: number; reduce: boolean | null }): ReactNode {
  const rows = [
    { unit: "1 · piano terra", milli: 58 },
    { unit: "2 · primo piano", milli: 117 },
    { unit: "3 · secondo piano", milli: 128 },
    { unit: "4 · terzo piano", milli: 124 },
    { unit: "5 · mansarda", milli: 96 },
    { unit: "6 · affaccio interno", milli: 477 },
  ];
  return (
    <motion.figure
      initial={reduce ? false : { y: 22 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-label="Esempio dimostrativo di tabella millesimale"
      className="relative mx-auto w-full max-w-[520px] rotate-[1.5deg] bg-[#e7e5e0] p-8 text-[#191410] lg:translate-x-[8%]"
    >
      <span className="absolute right-0 top-0 bg-[#191410] px-3 py-1.5 text-[14px] font-medium text-white">
        Esempio
      </span>
      <p className="text-[14px] font-medium text-[#6a6057]">Tabella millesimale · come si legge (documento di dimostrazione)</p>
      <table className="mt-4 w-full border-collapse text-[15px]">
        <caption className="sr-only">Esempio dimostrativo di quote di proprietà in millesimi</caption>
        <thead>
          <tr className={cn("border-b border-[#191410]/25 text-left text-[14px] text-[#6a6057]" /* taste-skill-ignore: righe di una tabella reale */)}>
            <th scope="col" className="py-2 font-medium">
              Unità
            </th>
            <th scope="col" className="py-2 text-right font-medium">
              Millesimi
            </th>
            <th scope="col" className="py-2 text-right font-medium">
              Frazione
            </th>
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {rows.map((r) => (
            <tr key={r.unit} className={cn("border-b border-[#191410]/10 last:border-b-0" /* taste-skill-ignore: righe di una tabella reale */)}>
              <td className="py-2">{r.unit}</td>
              <td className="py-2 text-right">{r.milli.toLocaleString("it-IT")}</td>
              <td className="py-2 text-right text-[#6a6057]">{((r.milli / 1000) * 100).toLocaleString("it-IT", { maximumFractionDigits: 1 })}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-5 text-[14px] leading-relaxed text-[#6a6057]">
        Valori puramente dimostrativi, per mostrare come si legge una tabella millesimale regolare (art. 1129 c.c.). Il
        listino reale è <strong className="font-semibold text-[#191410]">{eur(planPrice)} per unità all'anno</strong>, IVA
        esclusa.
      </figcaption>
    </motion.figure>
  );
}
