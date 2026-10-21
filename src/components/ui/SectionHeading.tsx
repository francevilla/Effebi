import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { EASE, VIEWPORT } from "./motion";

type Props = {
  title: ReactNode;
  description?: ReactNode;
  /** Piccola riga pratica (fatti verificabili, non un'etichetta). */
  note?: ReactNode;
  id?: string;
  className?: string;
  /** Il creatore della fotografia della sezione, se foto trovata in licenza aperta. */
  credit?: string;
};

export function SectionHeading({ title, description, note, id, className, credit }: Props) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("max-w-[68ch]", className)}>
      <motion.h2
        id={id}
        initial={reduce ? false : { y: 18 }}
        whileInView={{ y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.55, ease: EASE }}
        className="text-head"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={reduce ? false : { y: 14 }}
          whileInView={{ y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          className="mt-4 max-w-[62ch] text-lead text-body"
        >
          {description}
        </motion.p>
      ) : null}
      {note ? <p className="mt-3 text-small text-muted">{note}</p> : null}
      {credit ? <p className="mt-3 text-small text-muted">Foto: {credit}</p> : null}
    </div>
  );
}
