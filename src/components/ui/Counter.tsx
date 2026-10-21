import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

function fmt(v: number, decimals: number) {
  return v.toLocaleString("it-IT", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/** Number that counts up (or down) the first time it scrolls into view. */
export function Counter({ to, from = 0, duration = 1.8, prefix = "", suffix = "", decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [initial] = useState(() => prefix + fmt(from, decimals) + suffix);

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (reduce) {
      node.textContent = prefix + fmt(to, decimals) + suffix;
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate(v) {
        node.textContent = prefix + fmt(v, decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration, prefix, suffix, decimals]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {initial}
      </span>
      <span className="sr-only">{prefix + fmt(to, decimals) + suffix}</span>
    </span>
  );
}

type AnimatedNumberProps = {
  value: number;
  format: (n: number) => string;
  className?: string;
};

/** Smoothly tweens between numeric values (interruptible). Decorative – pair with an sr-only value. */
export function AnimatedNumber({ value, format, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(value);
  const formatRef = useRef(format);
  formatRef.current = format;
  const reduce = useReducedMotion();
  const [initial] = useState(() => format(value));

  useEffect(() => {
    return mv.on("change", (v) => {
      if (ref.current) ref.current.textContent = formatRef.current(v);
    });
  }, [mv]);

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.5, ease: EASE });
    return () => controls.stop();
  }, [value, reduce, mv]);

  return (
    <span ref={ref} aria-hidden="true" className={className}>
      {initial}
    </span>
  );
}
