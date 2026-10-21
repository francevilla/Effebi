import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { EASE } from "@/components/ui/motion";
import { cn } from "@/utils/cn";

const FAQS = [
  {
    q: "Come si cambia amministratore di condominio?",
    a: "La nomina del nuovo amministratore avviene con una delibera dell'assemblea approvata dalla maggioranza degli intervenuti che rappresenti almeno la metà del valore dell'edificio (500 millesimi), come previsto dall'art. 1136 c.c. Ti affianchiamo in ogni fase: dalla richiesta di convocazione alla presentazione del preventivo, fino al passaggio di consegne con il precedente amministratore.",
  },
  {
    q: "Il primo incontro è gratuito?",
    a: "Sì. Puoi chiedere un primo parere gratuito sulla situazione del tuo condominio, anche se oggi è gestito da un altro amministratore: analizziamo il caso con attenzione e, se lo desideri, prepariamo un preventivo per la gestione ordinaria da presentare agli altri condòmini.",
  },
  {
    q: "Quanto costa e cosa è incluso nel compenso?",
    a: "Il compenso dipende dal numero di unità immobiliari e dal piano scelto, a partire da €84 per unità all'anno. Come prevede l'art. 1129 c.c., al momento della nomina riceverai l'indicazione analitica di tutte le voci: nessun costo extra non concordato.",
  },
  {
    q: "Dove consulto i documenti del condominio?",
    a: "Ogni condòmino riceve un accesso personale al portale e all'app: rendiconti, verbali, fatture dei fornitori, regolamento ed estratto conto sono disponibili 24 ore su 24. È il modo più semplice per consultare la documentazione condominiale, senza appuntamenti.",
  },
  {
    q: "Cosa succede in caso di guasto o emergenza?",
    a: "Puoi aprire una segnalazione dall'app in qualsiasi momento, allegando foto, e seguirne ogni passaggio fino alla chiusura. Nei piani Completo ed Energia+ è attiva anche una reperibilità h24 per le urgenze (allagamenti, guasti all'ascensore o al riscaldamento) con tecnici qualificati del nostro network.",
  },
  {
    q: "In che modo Eniminds riduce i costi energetici?",
    a: "Gli energy manager di Eniminds analizzano le bollette delle parti comuni, rinegoziano i contratti di fornitura e valutano interventi di efficientamento, fotovoltaico e Comunità Energetiche Rinnovabili, indicando gli incentivi e le detrazioni disponibili. Ogni proposta arriva in assemblea con numeri chiari su costi e ritorno dell'investimento.",
  },
  {
    q: "Le assemblee si possono svolgere online?",
    a: "Sì. L'art. 66 delle disposizioni di attuazione del Codice Civile consente la partecipazione in videoconferenza, se previsto dal regolamento o con il consenso della maggioranza dei condòmini. Organizziamo assemblee online e ibride, con voto per millesimi tracciato e verbale inviato in giornata.",
  },
  {
    q: "Gestite anche piccoli condomini o senza amministratore?",
    a: "Certo. Negli edifici fino a otto condòmini, dove la nomina dell'amministratore non è obbligatoria, proponiamo il servizio Su misura: consulenza a chiamata, gestione delle spese comuni, pratiche tecniche e servizi energetici Eniminds a canone fisso.",
  },
] as const;

/** Due colonne: la lista delle domande a sinistra, la risposta aperta a destra. */
export function FAQ() {
  const [active, setActive] = useState(0);
  const faq = FAQS[active];

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-bg py-28 sm:py-36">
      <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        {/* La lista delle domande, come interrogazione dell'archivio */}
        <div>
          <SectionHeading id="faq-title" title="Prima ancora di chiederci." description="Le domande che ci fanno tutti i giorni, risposte in apertura." />
          <ol className="mt-12 space-y-1">
            {FAQS.map((f, i) => (
              <li key={f.q}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={cn(
                    "w-full max-w-[38ch] py-2 text-left text-[18px] leading-snug transition-colors",
                    i === active ? "text-accent" : "text-body hover:text-ink"
                  )}
                >
                  {f.q}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* La risposta, in display size, con i riferimenti di legge */}
        <div aria-live="polite" className="lg:pl-14">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-w-[62ch]"
          >
            <h3 className="font-display text-[clamp(1.75rem,2.8vw,3rem)] leading-[1.02] text-ink">{faq.q}</h3>
            <p className="mt-8 text-body">{faq.a}</p>
            <p className="mt-8 text-small text-muted">Parere pratico, non consulenza legale: per il tuo caso specifico chiedi in studio.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
