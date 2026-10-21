import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import castelBritti from "@/assets/castel-britti.jpg";
import porticoSantostefano from "@/assets/portico-santostefano.jpg";
import teamStudio from "@/assets/team-studio.jpg";
import porticoSanLuca from "@/assets/portico-sanluca.jpg";
import { CONTAINER } from "@/lib/constants";

const STEPS = [
  {
    caption: "Il primo parere",
    desc: "Giorno 1: ci racconti il tuo condominio, in studio o al telefono. Valutiamo conti, contratti e stato dell'edificio, senza alcun impegno.",
    photo: teamStudio,
    alt: "In studio per il primo parere: l'amministratrice con i consulenti",
    spacer: 96,
  },
  {
    caption: "Il preventivo",
    desc: "Entro 48 ore ricevi un'offerta analitica, voce per voce, pronta da presentare al consiglio e in assemblea.",
    photo: porticoSantostefano,
    alt: "Arcate del portico di Santo Stefano, Bologna",
    spacer: 56,
  },
  {
    caption: "La nomina",
    desc: "Alla prima assemblea ti affianchiamo nella convocazione e nella delibera, con le maggioranze previste dall'art. 1136 c.c.",
    photo: porticoSanLuca,
    alt: "Il portico di San Luca, il più lungo del mondo",
    spacer: 120,
  },
  {
    caption: "Le consegne",
    desc: "Entro 30 giorni recuperiamo documenti e contabilità dal precedente amministratore e attiviamo l'app per tutti i condòmini.",
    photo: castelBritti,
    alt: "Un edificio del territorio amministrato dallo studio",
    spacer: 40,
  },
] as const;

/** Fila di momenti trascinabile: ogni colonna è un tempo reale del passaggio di consegne. */
export function Process() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  const scrollTo = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: dir * 312, behavior: reduce ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const max = row.scrollWidth - row.clientWidth;
    setProgress(max > 0 ? row.scrollLeft / max : 0);
  };

  return (
    <section id="come-funziona" aria-labelledby="process-title" className="bg-bg py-28 sm:py-36">
      <div className={CONTAINER}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="process-title"
            title="Come iniziamo."
            description="Seguiamo noi l'intero percorso, dalla prima analisi al passaggio di consegne. A voi resta solo la scelta."
          />
          <div className="hidden gap-2 lg:flex">
            <ScrollButton dir={-1} move={scrollTo} label="Precedente" glyph="‹" />
            <ScrollButton dir={1} move={scrollTo} label="Successivo" glyph="›" />
          </div>
        </div>

        {/* Barra di avanzamento: da quanto è stata percorsa la fila */}
        <div aria-hidden="true" className="mt-10 h-[6px] w-full bg-surface2">
          <div
            className="h-full bg-accent transition-[width] duration-200"
            style={{ width: `${Math.max(14, progress * 100)}%` }}
          />
        </div>

        <div
          ref={rowRef}
          onScroll={onScroll}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2"
        >
          {STEPS.map((s) => (
            <figure
              key={s.caption}
              className="w-[280px] shrink-0 snap-start sm:w-[300px] lg:w-[320px]"
            >
              <figcaption>
                <h3 className="font-display text-[clamp(1.75rem,2.4vw,2.5rem)] leading-tight text-ink">
                  {s.caption}
                </h3>
                <p className="mt-3 max-w-[36ch] text-body">{s.desc}</p>
              </figcaption>
              <div style={{ height: s.spacer }} aria-hidden="true" className="mb-6" />
              <img src={s.photo} alt={s.alt} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollButton({ dir, move, label, glyph }: { dir: 1 | -1; move: (d: 1 | -1) => void; label: string; glyph: string }) {
  return (
    <button
      type="button"
      onClick={() => move(dir)}
      className="flex size-12 items-center justify-center bg-surface2 text-[22px] text-ink transition-colors hover:bg-accent hover:text-accent-ink"
      aria-label={label}
    >
      <span aria-hidden="true">{glyph}</span>
    </button>
  );
}
