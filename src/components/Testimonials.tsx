import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import teamStudio from "@/assets/team-studio.jpg";
import { SectionHeading } from "./ui/SectionHeading";
import { Stars } from "./ui/Stars";
import { EASE } from "./ui/motion";
import { LISTINGS, RATING } from "@/lib/constants";
import { REVIEWS, type Review } from "@/lib/reviews";
import { cn } from "@/utils/cn";

/** Due frasi faccia a faccia: la domanda del visitatore, poi le recensioni reali. */
export function Testimonials() {
  const reduce = useReducedMotion();
  const [calypso, roberto] = REVIEWS;

  return (
    <section id="recensioni" aria-labelledby="testimonials-title" className="bg-surface py-28 sm:py-36">
      <div className="mx-auto grid w-full max-w-[1440px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        {/* La domanda, con la foto del posto e il giudizio reale */}
        <div>
          <SectionHeading
            id="testimonials-title"
            title="Chi lo è stato prima di voi?"
            description="Le recensioni pubblicate sullo studio, moderate e verificate dalla redazione di PagineGialle."
          />
          <div className="mt-10 max-w-[420px]">
            <img
              src={teamStudio}
              alt="Lo studio in Via Emilia 168 durante una riunione di consulenza"
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover"
            />
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-body text-body">
              <span className="font-display text-[2.5rem] leading-none text-accent tabular-nums">{RATING.display}</span>
              <Stars />
              <span className="text-small text-muted">
                su PagineGialle · {RATING.count} recensioni verificate
              </span>
            </p>
            <p className="mt-2 text-small text-muted">
              Sono le sole recensioni pubblicate finora: le mostriamo tutte e si leggono così, complete.
            </p>
          </div>
        </div>

        {/* Le citazioni, sfalsate e larghe: riempiono la colonna destra */}
        <div className="lg:pt-6">
          <Quote review={calypso} reduce={reduce} />
          <Quote review={roberto} offset reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

function Quote({ review, offset, reduce }: { review: Review; offset?: boolean; reduce: boolean | null }) {
  return (
    <motion.figure
      initial={reduce ? false : { y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn("mb-16", offset && "sm:ml-[14%]")}
    >
      <blockquote className="text-lead text-ink">
        <span aria-hidden="true" className="mb-4 block font-display text-[3.5rem] leading-[0] text-accent">
          “
        </span>
        {review.segments.map((s, i) =>
          s.hl ? (
            <strong key={i} className="font-medium text-accent">
              {s.t}
            </strong>
          ) : (
            <span key={i}>{s.t}</span>
          )
        )}
      </blockquote>
      <figcaption className="mt-6 text-small text-body">
        <span className="font-medium text-ink">{review.author}</span> · {review.context}
        <br />
        <span className="text-muted">
          Recensione verificata ·{" "}
          <a
            href={LISTINGS.paginegialleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 hover:text-ink"
          >
            PagineGialle
          </a>
        </span>
      </figcaption>
    </motion.figure>
  );
}
