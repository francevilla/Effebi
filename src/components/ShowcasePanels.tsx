import { useId, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check, Download, FileText, Leaf, Lightbulb, Plus, Users, Video, Wrench } from "lucide-react";
import { EASE } from "./ui/motion";
const AVATAR_TONES = ["bg-emerald-500", "bg-teal-600", "bg-sky-700", "bg-amber-600", "bg-rose-700", "bg-slate-500", "bg-cyan-700", "bg-lime-700", "bg-orange-600", "bg-slate-600"];
import { cn } from "@/utils/cn";

const CARD = "rounded-xl border border-white/[0.07] bg-white/[0.03] p-4";
const LABEL = "text-[11px] font-medium text-slate-400";

/* ─────────────── Shared bits ─────────────── */

function PanelHeader({ kicker, title, right }: { kicker: string; title: string; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[11px] text-slate-400">{kicker}</p>
        <p className="mt-0.5 text-lg font-semibold tracking-tight text-white">{title}</p>
      </div>
      {right}
    </div>
  );
}

const PILL_TONES = {
  emerald: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  rose: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
  sky: "bg-sky-400/10 text-sky-300 ring-sky-400/20",
};

function Pill({ children, tone = "emerald" }: { children: ReactNode; tone?: keyof typeof PILL_TONES }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1", PILL_TONES[tone])}>
      {children}
    </span>
  );
}

function MockButton({ children, primary = false }: { children: ReactNode; primary?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold",
        primary
          ? "bg-emerald-400 text-slate-950"
          : "bg-white/[0.06] font-medium text-slate-200 ring-1 ring-white/10"
      )}
    >
      {children}
    </span>
  );
}

function Kpi({
  label,
  value,
  meta,
  positive = false,
  compact = false,
  className,
}: {
  label: string;
  value: string;
  meta: string;
  positive?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(CARD, compact && "p-3 sm:p-4", className)}>
      <p className={LABEL}>{label}</p>
      <p
        className={cn(
          "mt-1.5 font-semibold tracking-tight text-white",
          compact ? "text-base sm:text-xl" : "text-xl sm:text-2xl"
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-1 text-[10.5px] font-medium leading-snug sm:text-[11px]",
          positive ? "text-emerald-400" : "text-slate-400"
        )}
      >
        {meta}
      </p>
    </div>
  );
}

const ACT_TONES = {
  emerald: "bg-emerald-400/10 text-emerald-300",
  sky: "bg-sky-400/10 text-sky-300",
  violet: "bg-teal-400/10 text-teal-300",
  amber: "bg-amber-400/10 text-amber-300",
};

function Activity({
  icon: Icon,
  tone,
  title,
  meta,
  i,
}: {
  icon: LucideIcon;
  tone: keyof typeof ACT_TONES;
  title: string;
  meta: string;
  i: number;
}) {
  return (
    <motion.li
      initial={{ x: 10 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.08 }}
      className="flex items-center gap-3"
    >
      <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", ACT_TONES[tone])}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[12.5px] font-medium text-slate-100">{title}</p>
        <p className="truncate text-[11px] text-slate-400">{meta}</p>
      </div>
    </motion.li>
  );
}

/* ─────────────── 1. Dashboard ─────────────── */

const MONTHS = ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"];
const SPEND = [42, 55, 48, 62, 58, 70, 52, 45, 60, 66, 50, 57];

export function DashboardPanel() {
  return (
    <div className="space-y-4">
      <PanelHeader
        kicker="Buongiorno, Laura"
        title="Condominio Via dei Tigli 12"
        right={<Pill tone="emerald">Tutto in regola</Pill>}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Kpi label="Fondo cassa" value="€ 48.320" meta="+4,2% sul 2024" positive />
        <Kpi label="Prossima rata" value="€ 312" meta="Scadenza 15 luglio" />
        <Kpi label="Ticket aperti" value="2" meta="1 in chiusura oggi" className="col-span-2 sm:col-span-1" />
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        <div className={cn(CARD, "md:col-span-3")}>
          <div className="flex items-center justify-between">
            <p className={LABEL}>Spese 2025 per mese</p>
            <p className="text-[10.5px] text-slate-400">migliaia di €</p>
          </div>
          <div className="mt-4 flex h-32 gap-1.5" aria-hidden="true">
            {SPEND.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col gap-1.5">
                <div className="relative flex-1">
                  <motion.div
                    className={cn(
                      "absolute inset-x-0 bottom-0 origin-bottom rounded-t-[5px]",
                      i === 9 ? "bg-emerald-500" : "bg-white/10"
                    )}
                    style={{ height: `${h}%` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.03 }}
                  />
                </div>
                <span className="text-center text-[9px] text-slate-400">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={cn(CARD, "md:col-span-2")}>
          <p className={LABEL}>Attività recenti</p>
          <ul className="mt-3 space-y-3">
            <Activity icon={Check} tone="emerald" title="Rata Q2 ricevuta" meta="Interno 4B · 2 min fa" i={0} />
            <Activity icon={Wrench} tone="sky" title="Ascensore: intervento chiuso" meta="Ascensori Felsina · 1 h fa" i={1} />
            <Activity icon={FileText} tone="violet" title="Verbale assemblea pubblicato" meta="Ieri, 21:40" i={2} />
            <Activity icon={Leaf} tone="amber" title="Report energetico di giugno" meta="Eniminds · 2 giorni fa" i={3} />
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 2. Rendiconti ─────────────── */

const CATS = [
  { label: "Riscaldamento", value: 38, color: "#34d399" },
  { label: "Pulizie", value: 18, color: "#2dd4bf" },
  { label: "Manutenzioni", value: 16, color: "#4ade80" },
  { label: "Energia elettrica", value: 14, color: "#38bdf8" },
  { label: "Assicurazione", value: 8, color: "#fbbf24" },
  { label: "Compenso amm.", value: 6, color: "#f472b6" },
];

const INVOICES = [
  { vendor: "Ascensori Felsina srl", item: "Manutenzione ascensore · Q2", amount: "€ 490,00", status: "Pagata" },
  { vendor: "Pulizie Savena", item: "Pulizia scale · giugno", amount: "€ 320,00", status: "Pagata" },
  { vendor: "Fornitore energia", item: "Luce parti comuni · maggio", amount: "€ 184,60", status: "Verificata" },
  { vendor: "Idraulica Emiliana", item: "Riparazione colonna di scarico", amount: "€ 610,00", status: "Pagata" },
];

const R = 42;
const C = 2 * Math.PI * R;

export function RendicontiPanel() {
  let acc = 0;
  return (
    <div className="space-y-4">
      <PanelHeader
        kicker="Esercizio 2025 · consuntivo"
        title="Rendiconto condominiale"
        right={
          <MockButton>
            <Download className="size-3.5" aria-hidden="true" />
            Scarica PDF
          </MockButton>
        }
      />
      <div className="grid gap-3 md:grid-cols-5">
        <div className={cn(CARD, "md:col-span-2")}>
          <p className={LABEL}>Ripartizione spese</p>
          <div className="relative mx-auto mt-3 size-40">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
              {CATS.map((c, i) => {
                const len = (c.value / 100) * C;
                const offset = -acc;
                acc += len;
                return (
                  <motion.circle
                    key={c.label}
                    cx="60"
                    cy="60"
                    r={R}
                    fill="none"
                    stroke={c.color}
                    strokeWidth="14"
                    strokeDashoffset={offset}
                    initial={{ strokeDasharray: `0 ${C}` }}
                    animate={{ strokeDasharray: `${Math.max(len - 1.5, 0)} ${C}` }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.08 }}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[10.5px] text-slate-400">Totale</p>
              <p className="text-lg font-semibold tracking-tight text-white">€ 18.640</p>
            </div>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {CATS.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: c.color }} aria-hidden="true" />
                <span className="truncate">{c.label}</span>
                <span className="ml-auto text-slate-400">{c.value}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(CARD, "md:col-span-3")}>
          <div className="flex items-center justify-between">
            <p className={LABEL}>Ultime fatture fornitori</p>
            <span className="text-[11px] text-emerald-300">Tutte verificate</span>
          </div>
          <ul className="mt-2 divide-y divide-white/[0.06]" data-ui>
            {INVOICES.map((inv, i) => (
              <motion.li
                key={inv.vendor}
                initial={{ y: 8 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.07 }}
                className="flex items-center gap-3 py-2.5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-slate-300">
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium text-slate-100">{inv.vendor}</p>
                  <p className="truncate text-[11px] text-slate-400">{inv.item}</p>
                </div>
                <div className="text-right">
                  <p className="tabular-nums text-[12px] text-slate-100">{inv.amount}</p>
                  <p className={cn("text-[10.5px]", inv.status === "Pagata" ? "text-emerald-300" : "text-sky-300")}>
                    {inv.status}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-[12px]">
            <span className="text-slate-400">Il tuo saldo personale</span>
            <span className="font-semibold text-emerald-300">In regola · € 0,00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 3. Segnalazioni ─────────────── */

const T_LIST = [
  {
    id: "#128",
    title: "Ascensore fermo al 2° piano",
    time: "Oggi, 08:12",
    status: "Risolto",
    cls: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  },
  {
    id: "#127",
    title: "Luce scale, piano 3",
    time: "Ieri, 19:30",
    status: "In corso",
    cls: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  },
  {
    id: "#125",
    title: "Infiltrazione box auto",
    time: "Lun, 10:02",
    status: "Presa in carico",
    cls: "bg-sky-400/10 text-sky-300 ring-sky-400/20",
  },
];

const TIMELINE = [
  { time: "08:12", title: "Segnalazione inviata", desc: "Con foto, dall'app · Interno 2A" },
  { time: "08:20", title: "Presa in carico", desc: "Assegnata ad Ascensori Felsina" },
  { time: "10:05", title: "Tecnico sul posto", desc: "Sostituzione della pulsantiera" },
  { time: "11:52", title: "Intervento concluso", desc: "Collaudo ok · fattura in verifica" },
];

export function SegnalazioniPanel() {
  return (
    <div className="space-y-4">
      <PanelHeader
        kicker="Manutenzioni"
        title="Segnalazioni"
        right={
          <MockButton primary>
            <Plus className="size-3.5" aria-hidden="true" />
            Nuova segnalazione
          </MockButton>
        }
      />
      <div className="grid gap-3 md:grid-cols-5">
        <ul className="space-y-2 md:col-span-2">
          {T_LIST.map((t, i) => (
            <motion.li
              key={t.id}
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
              className={cn(
                "rounded-xl border p-3",
                i === 0 ? "border-emerald-400/30 bg-emerald-400/[0.06]" : "border-white/[0.07] bg-white/[0.03]"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="tabular-nums text-[10.5px] text-slate-400">{t.id}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1", t.cls)}>{t.status}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] font-medium text-slate-100">{t.title}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{t.time}</p>
            </motion.li>
          ))}
        </ul>
        <div className={cn(CARD, "md:col-span-3")}>
          <div className="flex items-center justify-between gap-2">
            <p className={LABEL}>Ticket #128 · cronologia</p>
            <span className="text-[11px] font-medium text-emerald-300">Risolto in 3h 40m</span>
          </div>
          <ol className="relative mt-4 space-y-4">
            <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-px bg-white/10" data-ui />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-emerald-400" data-ui
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            />
            {TIMELINE.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ x: 10 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.15 }}
                className="relative flex gap-3"
              >
                <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12.5px] font-medium text-slate-100">{s.title}</p>
                    <span className="tabular-nums text-[10.5px] text-slate-400">{s.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 4. Energia ─────────────── */

const E_MONTHS = ["Ott", "Nov", "Dic", "Gen", "Feb", "Mar", "Apr"];
const E_PREV = [18, 32, 44, 48, 40, 28, 14];
const E_CURR = [15, 26, 36, 39, 33, 23, 11];

function toPoints(values: number[]): [number, number][] {
  const step = 280 / (values.length - 1);
  return values.map((v, i) => [20 + i * step, 130 - v * 2.1]);
}

function smoothPath(pts: [number, number][]) {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i + 2 < pts.length ? pts[i + 2] : p2;
    const t = 0.18;
    const c1x = p1[0] + (p2[0] - p0[0]) * t;
    const c1y = p1[1] + (p2[1] - p0[1]) * t;
    const c2x = p2[0] - (p3[0] - p1[0]) * t;
    const c2y = p2[1] - (p3[1] - p1[1]) * t;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

export function EnergiaPanel() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const prev = smoothPath(toPoints(E_PREV));
  const currPts = toPoints(E_CURR);
  const curr = smoothPath(currPts);
  const last = currPts[currPts.length - 1];
  const area = `${curr} L ${last[0].toFixed(1)} 130 L ${currPts[0][0].toFixed(1)} 130 Z`;

  return (
    <div className="space-y-4">
      <PanelHeader
        kicker="Stagione termica 2025/26"
        title="Monitoraggio energetico"
        right={
          <Pill tone="emerald">
            <Leaf className="size-3" aria-hidden="true" /> Analisi Eniminds
          </Pill>
        }
      />
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Kpi compact label="Consumi" value="−18%" meta="sulla stagione precedente" positive />
        <Kpi compact label="Risparmio" value="€ 6.420" meta="stimato a fine stagione" positive />
        <Kpi compact label="CO₂ evitata" value="9,4 t" meta="equivalenti" positive />
      </div>
      <div className={CARD}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={LABEL}>Consumi riscaldamento (MWh)</p>
          <div className="flex items-center gap-3 text-[10.5px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-4 border-t border-dashed border-slate-400" aria-hidden="true" data-ui />
              2024/25
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-emerald-400" aria-hidden="true" />
              2025/26
            </span>
          </div>
        </div>
        <svg viewBox="0 0 320 150" className="mt-3 h-40 w-full sm:h-44" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-line`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#34d399" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id={`${id}-area`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#34d399" stopOpacity="0.28" />
              <stop offset="1" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[30, 60, 90, 120].map((y) => (
            <line key={y} x1="20" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
          ))}
          <motion.path
            d={prev}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={false}
          />
          <motion.path
            d={area}
            fill={`url(#${id}-area)`}
            initial={false}
          />
          <motion.path
            d={curr}
            fill="none"
            stroke={`url(#${id}-line)`}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          />
          {currPts.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#0a101c"
              stroke="#34d399"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.4, ease: EASE }}
            />
          ))}
          {E_MONTHS.map((m, i) => (
            <text key={m} x={20 + i * (280 / 6)} y="146" textAnchor="middle" fontSize="9" fill="#64748b">
              {m}
            </text>
          ))}
        </svg>
      </div>
      <motion.div
        initial={{ y: 8 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        className="flex items-start gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-3.5"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-300/15 text-amber-300">
          <Lightbulb className="size-4" aria-hidden="true" />
        </span>
        <p className="text-[12px] leading-relaxed text-slate-300">
          <span className="font-semibold text-amber-200">Consiglio dell'energy manager:</span> anticipare lo spegnimento
          serale dell'impianto alle 22:00 può ridurre i consumi di un ulteriore 4%.
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────────── 5. Assemblee ─────────────── */

const AGENDA = [
  "Rifacimento della facciata e accesso alle detrazioni fiscali",
  "Impianto fotovoltaico condominiale",
  "Varie ed eventuali",
];

const VOTES = [
  { label: "Favorevoli", value: 612, pct: 82, cls: "bg-emerald-400" },
  { label: "Contrari", value: 88, pct: 12, cls: "bg-rose-400" },
  { label: "Astenuti", value: 42, pct: 6, cls: "bg-slate-400" },
];

export function AssembleePanel() {
  return (
    <div className="space-y-4">
      <PanelHeader
        kicker="Assemblea in videoconferenza"
        title="Assemblea straordinaria"
        right={
          <Pill tone="rose">
            <span className="size-1.5 rounded-full bg-rose-400" aria-hidden="true" /> In corso
          </Pill>
        }
      />
      <div className="grid gap-3 md:grid-cols-5">
        <div className={cn(CARD, "md:col-span-2")}>
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-white/10">
              <span className="text-[9px] font-semibold uppercase text-rose-300">Set</span>
              <span className="text-sm font-semibold leading-none text-white">18</span>
            </span>
            <div>
              <p className="text-[12.5px] font-medium text-slate-100">Giovedì, ore 20:30</p>
              <p className="text-[11px] text-slate-400">Online + sala condominiale</p>
            </div>
          </div>
          <p className={cn(LABEL, "mt-4")}>Ordine del giorno</p>
          <ol className="mt-2 space-y-2">
            {AGENDA.map((a, i) => (
              <li key={a} className="flex gap-2 text-[12px] leading-snug text-slate-300">
                <span className="tabular-nums text-slate-400">{i + 1}.</span>
                {a}
              </li>
            ))}
          </ol>
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3" data-ui>
            <div className="flex -space-x-2" aria-hidden="true">
              {["LM", "GR", "FT", "PB"].map((p, i) => (
                <span
                  key={p}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-[9px] font-semibold text-white ring-2 ring-[#151210]",
                    AVATAR_TONES[i]
                  )}
                >
                  {p}
                </span>
              ))}
            </div>
            <span className="text-[11px] text-slate-400">18 presenti · 742 ‰</span>
          </div>
        </div>
        <div className={cn(CARD, "md:col-span-3")}>
          <div className="flex items-center justify-between gap-2">
            <p className={LABEL}>Votazione · punto 1</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              Approvato
            </span>
          </div>
          <p className="mt-2 text-[13px] font-medium text-slate-100">
            Rifacimento della facciata e accesso alle detrazioni fiscali
          </p>
          <div className="mt-4 space-y-3.5">
            {VOTES.map((v, i) => (
              <div key={v.label}>
                <div className="flex justify-between text-[11.5px]">
                  <span className="text-slate-300">{v.label}</span>
                  <span className="tabular-nums text-slate-400">
                    {v.value} ‰ · {v.pct}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className={cn("h-full origin-left rounded-full", v.cls)}
                    style={{ width: `${v.pct}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
            Maggioranza degli intervenuti e oltre 500 millesimi, come previsto dall'art. 1136 c.c.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <span className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[12px] font-semibold text-slate-950">
              <Video className="size-3.5" aria-hidden="true" />
              Partecipa online
            </span>
            <span className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-2 text-[12px] font-medium text-slate-200 ring-1 ring-white/10">
              <Users className="size-3.5" aria-hidden="true" />
              Delega
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
