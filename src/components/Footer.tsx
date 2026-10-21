import { WhatsAppIcon } from "./icons";
import { CONTACT, CONTAINER, LEGAL_LINKS, LISTINGS, RATING } from "@/lib/constants";

const SITE_LINKS = [
  { label: "Chi siamo", href: "#chi-siamo" },
  { label: "La tua quota", href: "#quota" },
  { label: "Energia", href: "#energia" },
  { label: "Listino", href: "#prezzi" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Domande", href: "#faq" },
  { label: "Contatti", href: "#contatti" },
];

/** Crediti delle fotografie in licenza aperta, obbligatori per CC BY-SA. */
const PICTURE_CREDITS = [
  {
    title: "Bologna Portici 349",
    creator: "GFreihalter",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    page: "https://commons.wikimedia.org/wiki/File:Bologna_Portici_349.jpg",
  },
  {
    title: "Portico san luca",
    creator: "Puscas Vadim (Nebbius)",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Portico_san_luca.jpg",
  },
  {
    title: "Arcate del Portico di Santo Stefano",
    creator: "Agnese.pi",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Arcate_del_Portico_di_Santo_Stefano.jpg",
  },
  {
    title: "Strada Maggiore",
    creator: "MarkPagl",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Strada_Maggiore.jpg",
  },
  {
    title: "Castel de' Britti",
    creator: "ALEXFUSEALBA",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File:Castel_de%27_Britti.jpg",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg pt-20">
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-[2rem] leading-none text-ink">
              Studio EffeBi <span className="text-muted">×</span> Eniminds
            </p>
            <p className="mt-5 max-w-[420px] text-body text-body">
              Amministrazione condominiale a San Lazzaro di Savena, Bologna e provincia. Energia e sostenibilità, con
              Eniminds.
            </p>
            <ul className="mt-8 space-y-2">
              <li>
                <a href={CONTACT.phoneHref} className="text-body text-ink hover:text-accent">
                  {CONTACT.phoneDisplay} · voce e WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="size-4 text-accent" aria-hidden="true" />
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-body text-body hover:text-ink">
                  Scrivi su WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="text-body text-body hover:text-ink">
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-body text-body">
                {CONTACT.street} · {CONTACT.city}
              </li>
              <li className="text-small text-muted">{CONTACT.hours}</li>
            </ul>
          </div>

          <nav aria-label="Indice della pagina">
            <p className="text-small text-muted">Indice della pagina</p>
            <ul className="mt-4 space-y-2.5">
              {SITE_LINKS.map((l) => (
                <li key={l.href + l.label}>
                  <a href={l.href} className="text-body text-body hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-small text-muted">Schede pubbliche</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={LISTINGS.paginegialleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-body hover:text-ink"
                >
                  PagineGialle · {RATING.display} su 5
                </a>
              </li>
              <li>
                <a href={LISTINGS.paginebianche} target="_blank" rel="noopener noreferrer" className="text-body text-body hover:text-ink">
                  PagineBianche
                </a>
              </li>
              <li>
                <a href="https://eniminds.com/" target="_blank" rel="noopener noreferrer" className="text-body text-body hover:text-ink">
                  eniminds.com
                </a>
              </li>
            </ul>
            <p className="text-small text-muted">Le pagine legali</p>
            {LEGAL_LINKS.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-body text-body hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 max-w-[320px] text-small text-muted">
                Privacy e cookie: in pubblicazione tramite gestore terzo.
              </p>
            )}
          </div>
        </div>

        {/* Crediti obbligatori per le fotografie CC BY-SA */}
        <p className="credits mt-16 max-w-[900px] text-small leading-relaxed text-muted">
          Fotografie:{" "}
          {PICTURE_CREDITS.map((c, i) => (
            <span key={c.page}>
              <a href={c.page} target="_blank" rel="noopener noreferrer" className="text-body hover:text-ink">
                “{c.title}”
              </a>{" "}
              di {c.creator},{" "}
              <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-body hover:text-ink">
                {c.license}
              </a>
              , via Wikimedia Commons
              {i < PICTURE_CREDITS.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>

        <div className="mt-10 pb-10 text-small text-muted">
          <p>
            © {year} Studio EffeBi Amministrazioni Condominiali · P.IVA 03659601201 · Eniminds srl — startup innovativa
            e Società Benefit.
          </p>
        </div>
      </div>
    </footer>
  );
}
