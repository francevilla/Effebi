import { useEffect, useState } from "react";
import { SCHEDULE } from "@/lib/constants";
import { cn } from "@/utils/cn";

const DAY_NAMES = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Giorno (0 = domenica) e minuti dalla mezzanotte nel fuso orario dello studio. */
function nowInRome() {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Rome",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
    const day = WEEKDAYS.indexOf(get("weekday"));
    const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
    if (day >= 0 && Number.isFinite(minutes)) return { day, minutes };
  } catch {
    /* fallback all'ora locale del dispositivo */
  }
  const d = new Date();
  return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
}

const formatTime = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

export function getOpenStatus(): { open: boolean; label: string } {
  const { day, minutes } = nowInRome();
  const today = SCHEDULE[day];

  if (today && minutes >= today[0] && minutes < today[1]) {
    return { open: true, label: `Aperto ora · chiude alle ${formatTime(today[1])}` };
  }
  if (today && minutes < today[0]) {
    return { open: false, label: `Chiuso ora · apre oggi alle ${formatTime(today[0])}` };
  }
  for (let i = 1; i <= 7; i++) {
    const idx = (day + i) % 7;
    const next = SCHEDULE[idx];
    if (next) {
      const when = i === 1 ? "domani" : DAY_NAMES[idx];
      return { open: false, label: `Chiuso ora · riapre ${when} alle ${formatTime(next[0])}` };
    }
  }
  return { open: false, label: "Chiuso" };
}

export function useOpenStatus() {
  const [status, setStatus] = useState(getOpenStatus);
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}

/** Indicatore live "Aperto / Chiuso" calcolato sugli orari reali di ricevimento dello studio. */
export function OpenStatus({ className }: { className?: string }) {
  const { open, label } = useOpenStatus();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-small font-medium text-body",
        className
      )}
    >
      <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", open ? "bg-[#5d9e52]" : "bg-accent")} />
      {label}
    </span>
  );
}
