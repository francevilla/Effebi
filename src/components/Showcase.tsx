import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ChartPie, LayoutDashboard, Lock, Smartphone, Vote, Wrench, Zap, BellRing } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem, EASE } from "./ui/motion";
import { AssembleePanel, DashboardPanel, EnergiaPanel, RendicontiPanel, SegnalazioniPanel } from "./ShowcasePanels";
import { CONTAINER } from "@/lib/constants";
import { cn } from "@/utils/cn";

type Tab = {
  id: string;
  label: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  Panel: ComponentType;
};

const TABS: Tab[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Panoramica in tempo reale",
    desc: "Saldo di cassa, rate in scadenza e interventi in corso in un colpo d'occhio, dal telefono o dal computer.",
    icon: LayoutDashboard,
    Panel: DashboardPanel,
  },
  {
    id: "rendiconti",
    label: "Rendiconti",
    title: "Ogni euro, tracciato",
    desc: "Spese divise per voce e millesimi, fatture dei fornitori scaricabili ed estratto conto personale sempre aggiornato.",
    icon: ChartPie,
    Panel: RendicontiPanel,
  },
  {
    id: "segnalazioni",
    label: "Segnalazioni",
    title: "Guasti risolti, non rimandati",
    desc: "Apri un ticket con foto in 30 secondi e segui l'intervento passo dopo passo, fino alla chiusura.",
    icon: Wrench,
    Panel: SegnalazioniPanel,
  },
  {
    id: "consumi",
    label: "Energia",
    title: "Consumi sotto controllo",
    desc: "Monitoraggio dei consumi comuni e confronto con l'anno precedente, con i consigli degli energy manager Eniminds.",
    icon: Zap,
    Panel: EnergiaPanel,
  },
  {
    id: "assemblee",
    label: "Assemblee",
    title: "Decisioni più rapide",
    desc: "Convocazione, ordine del giorno, deleghe e voto da remoto. Il verbale arriva in giornata.",
    icon: Vote,
    Panel: AssembleePanel,
  },
];

const HIGHLIGHTS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Smartphone, title: "Web e app, 24/7", desc: "Un accesso personale per ogni condòmino, da qualsiasi dispositivo." },
  { icon: Lock, title: "Dati protetti", desc: "Connessioni cifrate e trattamento dei dati conforme al GDPR." },
  { icon: BellRing, title: "Notifiche intelligenti", desc: "Scadenze, avvisi e aggiornamenti arrivano in tempo reale." },
];

const DURATION = 6500;

/** Il portale in anteprima: interfaccia reale dello studio, qui mostrata come DEMO con dati fittizi. */
export function Showcase() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const autoplay = !reduce && !hovering && !interacted;

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % TABS.length), DURATION);
    return () => window.clearTimeout(t);
  }, [active, autoplay]);

  useEffect(() => {
    const list = listRef.current;
    const el = tabRefs.current[active];
    if (!list || !el || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const choose = (i: number, focus = false) => {
    setActive(i);
    setInteracted(true);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = TABS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      choose(next, true);
    }
  };

  const tab = TABS[active];
  const Panel = tab.Panel;

  return (
    <section id="piattaforma" aria-labelledby="showcase-title" className="bg-surface py-24 sm:py-32">
      <div className={CONTAINER}>
        <SectionHeading
          id="showcase-title"
          title="La piattaforma."
          description="Il portale e l'app per i condòmini nascono con Eniminds: documenti, segnalazioni, consumi e assemblee in un solo accesso."
          note="Quello che segue è un campione: schermate con dati fittizi di un edificio di esempio."
        />

        <div
          ref={gridRef}
          className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* La lista delle schermate: titoletti veri, un selezione a tono pieno */}
          <div className="lg:col-span-4">
            <div
              ref={listRef}
              role="tablist"
              aria-label="Funzionalità della piattaforma"
              aria-orientation="vertical"
              className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {TABS.map((t, i) => {
                const selected = i === active;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`tab-${t.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${t.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choose(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      "group relative shrink-0 snap-start text-left outline-none lg:w-full",
                      selected ? "bg-surface2 text-ink" : "text-body hover:text-ink"
                    )}
                  >
                    <span className="relative flex items-center gap-3 px-4 py-3 lg:items-start lg:gap-4 lg:px-5 lg:py-4">
                      <Icon className={cn("size-5 shrink-0", selected ? "text-accent" : "text-muted")} aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-[17px] lg:hidden">{t.label}</span>
                        <span className="hidden text-[17px] lg:block">{t.title}</span>
                        <AnimatePresence initial={false}>
                          {selected ? (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: EASE }}
                              className="hidden overflow-hidden lg:block"
                            >
                              <span className="block pt-1.5 text-small text-muted">{t.desc}</span>
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </span>
                    </span>
                    {selected ? (
                      <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden" aria-hidden="true">
                        <motion.span
                          key={`${active}-${autoplay}`}
                          className="block h-full origin-left bg-accent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: autoplay ? 1 : 0 }}
                          transition={{ duration: autoplay ? DURATION / 1000 : 0.3, ease: "linear" }}
                        />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={tab.id}
                initial={{ y: 6 }}
                animate={{ y: 0 }}
                exit={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-4 text-body lg:hidden"
              >
                <span className="font-medium text-ink">{tab.title}.</span> {tab.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Il campione: finestra piatta, quadro etichettato DEMO */}
          <div className="min-w-0 lg:col-span-8">
            <BrowserFrame active={active} onSelect={(i) => choose(i)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id}
                  role="tabpanel"
                  id={`panel-${tab.id}`}
                  aria-labelledby={`tab-${tab.id}`}
                  tabIndex={0}
                  initial={{ y: 12 }}
                  animate={{ y: 0 }}
                  exit={{ y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  data-ui
                  className="outline-none"
                >
                  <Panel />
                </motion.div>
              </AnimatePresence>
            </BrowserFrame>
            <p className="mt-4 max-w-[62ch] text-small text-muted">
              Anteprima dimostrativa: l'indirizzo e i dati mostrati sono fittizi. Portale e app reali ricevono l'accesso
              alla nomina in assemblea.
            </p>
          </div>
        </div>

        {/* Ciò che resta fermo: linea d'accento, un titolo e una riga */}
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-3 lg:mt-20">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <StaggerItem key={h.title}>
                <div className="flex h-full flex-col gap-3 bg-surface pt-5">
                  <Icon className="size-6 text-accent" aria-hidden="true" />
                  <h3 className="font-display text-[1.4rem] leading-tight text-ink">{h.title}</h3>
                  <p className="text-body">{h.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/** Finestra della demo: chrome piatto, URL fittizio e piastrina DEMO sempre visibile. */
function BrowserFrame({
  active,
  onSelect,
  children,
}: {
  active: number;
  onSelect: (i: number) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative border border-white/20 bg-bg" data-ui>
      <div className="flex items-center gap-3 bg-surface px-4 py-3" data-ui>
        <span className="bg-accent px-2 py-1 text-[12px] font-medium tracking-[0.14em] text-accent-ink">DEMO</span>
        <div className="flex min-w-0 items-center gap-1.5 text-[13px] text-muted" aria-hidden="false">
          <Lock className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate" aria-label="Indirizzo di esempio, non REALE">
            demo.portale-effebi.it/via-dei-tigli-12
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Barra laterale della demo, specchio decorativo delle schede */}
        <aside aria-hidden="true" className="hidden w-48 shrink-0 flex-col gap-1 p-3 md:flex">
          <p className="px-2 py-2 font-display text-[17px] text-ink">
            Portale <span className="text-muted">· demo</span>
          </p>
          {TABS.map((t, i) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(i);
                }}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 text-left text-[14px]",
                  i === active ? "bg-surface2 text-ink" : "text-muted hover:text-body"
                )}
              >
                <Icon className="size-4" />
                {t.label}
              </button>
            );
          })}
        </aside>

        <div className="min-h-[440px] min-w-0 flex-1 p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
