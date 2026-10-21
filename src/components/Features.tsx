import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import bolognaPortici from "@/assets/bologna-portici.jpg";
import castelBritti from "@/assets/castel-britti.jpg";
import porticoSanLuca from "@/assets/portico-sanluca.jpg";
import porticoSantostefano from "@/assets/portico-santostefano.jpg";
import stradaMaggiore from "@/assets/strada-maggiore.jpg";
import teamStudio from "@/assets/team-studio.jpg";
import { EASE } from "@/components/ui/motion";
import { cn } from "@/utils/cn";

/* Le competenze dello studio, come dichiarate nelle schede PagineGialle e PagineBianche. */
const ITEM_COUNT = 6;
const STATEMENTS: { head: boolean; text: string; detail: string }[] = [
  { head: true, text: "Un solo studio.", detail: "Architetti, ingegneri, termotecnici e amministratrice in Via Emilia 168." },
  { head: false, text: "Amministrazione condominiale", detail: "Compensi dal listino: €84, €108 o €132 per unità all'anno, IVA esclusa." },
  { head: false, text: "Gestione affitti", detail: "Entrate e uscite per ogni unità, con rendiconto per voce e millesimi." },
  { head: false, text: "Pratiche catastali e fiscalità", detail: "Conversione in millesimi e registri obbligatori sempre aggiornati." },
  { head: false, text: "Energia e sostenibilità", detail: "Diagnosi, rinegoziazione forniture e studio CER con Eniminds." },
  { head: false, text: "Servizi per i condòmini", detail: "Portale e app: documenti 24/7, segnalazioni e pagamento digitale delle rate." },
];

/* Le due foto piccole che accompagnano ogni affermazione: sempre un soggetto del territorio. */
const PAIRS: { src: string; alt: string; leftStyle?: CSSProperties; rightStyle?: CSSProperties }[] = [
  {
    src: teamStudio,
    alt: "Lo studio di Via Emilia 168: architetti, ingegneri e amministratrice allo stesso tavolo",
    leftStyle: { aspectRatio: "3 / 4", width: "clamp(220px,22vw,380px)", marginBottom: "-34svh" },
    rightStyle: { aspectRatio: "3 / 4", width: "clamp(200px,20vw,350px)", marginTop: "-40svh" },
  },
  {
    src: bolognaPortici,
    alt: "Un portico di Bologna lungo la strada dello studio",
    leftStyle: { aspectRatio: "3 / 4", width: "clamp(220px,22vw,380px)", marginBottom: "-30svh" },
    rightStyle: { aspectRatio: "3 / 4", width: "clamp(200px,20vw,350px)", marginTop: "-36svh" },
  },
  {
    src: stradaMaggiore,
    alt: "Strada Maggiore: un edificio residenziale sotto il portico",
    leftStyle: { aspectRatio: "3 / 4", width: "clamp(220px,22vw,380px)", marginBottom: "-36svh" },
    rightStyle: { aspectRatio: "3 / 4", width: "clamp(200px,20vw,350px)", marginTop: "-32svh" },
  },
  {
    src: porticoSanLuca,
    alt: "Il portico di San Luca: 666 archi fino al Santuario",
    leftStyle: { aspectRatio: "3 / 4", width: "clamp(220px,22vw,380px)", marginBottom: "-32svh" },
    rightStyle: { aspectRatio: "3 / 4", width: "clamp(200px,20vw,350px)", marginTop: "-38svh" },
  },
  {
    src: castelBritti,
    alt: "Un condominio del territorio amministrato dallo studio",
    leftStyle: { aspectRatio: "3 / 4", width: "clamp(220px,22vw,380px)", marginBottom: "-30svh" },
    rightStyle: { aspectRatio: "3 / 4", width: "clamp(200px,20vw,350px)", marginTop: "-34svh" },
  },
  {
    src: porticoSantostefano,
    alt: "Le arcate del portico di Santo Stefano",
    leftStyle: { aspectRatio: "3 / 4", width: "clamp(220px,22vw,380px)", marginBottom: "-34svh" },
    rightStyle: { aspectRatio: "3 / 4", width: "clamp(200px,20vw,350px)", marginTop: "-40svh" },
  },
];

/** Una scena, affermazioni a gradini: la fotografia resta ferma, la voce scende. */
export function Features() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const count = ITEM_COUNT;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = rect.top <= 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        setActive(Math.min(count - 1, Math.floor(progress * count)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  const pair = PAIRS[Math.min(active, count - 1)];

  return (
    <section id="chi-siamo" aria-labelledby="features-title" className="relative bg-surface">
      <div ref={wrapRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <img
            src={bolognaPortici}
            alt="Un portico di Bologna nella zona in cui lo studio lavora"
            className="absolute inset-0 size-full object-cover brightness-[.62]"
            loading="lazy"
            decoding="async"
          />
          {/* Scrim neutro solo sull'area di lettura, secondo degli elementi soprastanti */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[46%] bg-[linear-gradient(to_bottom,rgba(0,0,0,.72)_0%,rgba(0,0,0,.34)_55%,rgba(0,0,0,0)_100%)]" /* taste-skill-ignore: scrim neutro sotto il testo, unica eccezione */
          />

          <div className="relative grid h-full grid-rows-[auto_1fr_auto] px-4 pb-4 pt-24 sm:px-6 lg:px-8">
            {/* Colonna centrale: un'affermazione per campata, con il fatto reale che la sostiene */}
            <div className="mx-auto flex w-full max-w-[760px] flex-col gap-3">
              {STATEMENTS.map((s, i) => (
                <div key={s.text}>
                  {s.head ? (
                    <h2
                      id="features-title"
                      className={cn(
                        "font-display text-[clamp(2.25rem,4.2vw,4rem)] leading-[0.95] transition-colors duration-300",
                        i === active ? "text-accent" : "text-ink"
                      )}
                    >
                      {s.text}
                    </h2>
                  ) : (
                    <span
                      className={cn(
                        "block text-[clamp(1.125rem,1.3vw,1.25rem)] leading-snug transition-colors duration-300",
                        i === active ? "text-accent" : "text-body"
                      )}
                    >
                      {s.text}
                    </span>
                  )}
                  {i === active ? (
                    <motion.p
                      initial={reduce ? false : { y: 8 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="mt-1 max-w-[52ch] text-[17px] text-body"
                    >
                      {s.detail}
                    </motion.p>
                  ) : null}
                </div>
              ))}
            </div>

            {/* L'indirizzo e gli orari: le risposte pratiche restano a schermo */}
            <div className="row-start-3 flex flex-wrap items-end justify-between gap-x-10 gap-y-2 text-small text-body">
              <p>Via Emilia 168 · San Lazzaro di Savena (BO)</p>
              <p>Lun–Gio 8:30–17:00</p>
            </div>
          </div>

          {/* Le due fotографиe mobili, una per lato, a distanza diversa */}
          <div className="pointer-events-none absolute inset-y-0 left-4 hidden w-[25vw] max-w-[380px] flex-col justify-center sm:px-2 lg:flex lg:left-8">
            <motion.figure
              key={`${active}-left`}
              initial={false}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
              style={pair.leftStyle}
            >
              <img src={pair.src} alt={pair.alt} className="size-full object-cover" loading="lazy" decoding="async" />
            </motion.figure>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-4 hidden w-[25vw] max-w-[350px] flex-col justify-center sm:px-2 lg:flex lg:right-8">
            <motion.figure
              key={`${active}-right`}
              initial={false}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              className="overflow-hidden"
              style={pair.rightStyle}
            >
              <img src={pair.src} alt="" className="size-full object-cover" loading="lazy" decoding="async" aria-hidden="true" />
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
