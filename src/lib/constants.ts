export const CONTACT = {
  phoneDisplay: "327 080 5140",
  phoneHref: "tel:+393270805140",
  whatsappHref: `https://wa.me/393270805140?text=${encodeURIComponent(
    "Buongiorno, vorrei ricevere informazioni sull'amministrazione del mio condominio."
  )}`,
  email: "info@eniminds.com",
  emailHref: `mailto:info@eniminds.com?subject=${encodeURIComponent(
    "Richiesta preventivo amministrazione condominiale"
  )}`,
  street: "Via Emilia 168",
  city: "40068 San Lazzaro di Savena (BO)",
  mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Via Emilia 168, 40068 San Lazzaro di Savena BO"
  )}`,
  /** Fonte: schede PagineGialle / PagineBianche */
  hours: "Lun–Gio · 8:30–17:00",
  hoursNote: "Venerdì, sabato e domenica chiuso",
};

/**
 * Web3Forms: compilare con la access key fornita dal cliente.
 * Lasciata vuota, il modulo di contatti ripiega su mailto/WhatsApp.
 */
export const WEB3FORMS_ACCESS_KEY = ""; // TODO(cliente): chiave Web3Forms

/** Pagine legali fornite dal servizio di terze parti (iubenda o equivalente). Vuoto = niente link. */
export const LEGAL_LINKS: { label: string; href: string }[] = [
  // { label: "Privacy policy", href: "https://www.iubenda.com/privacy-policy/xxxx" },
];

/** Schede pubbliche dello studio (fonte di orari, contatti e recensioni). */
export const LISTINGS = {
  paginegialle: "https://www.paginegialle.it/studioeffebiamministrazionicondominiali-sanlazzarodisavena",
  paginegialleReviews:
    "https://www.paginegialle.it/studioeffebiamministrazionicondominiali-sanlazzarodisavena#recensioni",
  paginegialleWrite: "https://www.paginegialle.it/studioeffebiamministrazionicondominiali-sanlazzarodisavena/commenti",
  paginebianche:
    "https://www.paginebianche.it/scheda/studioeffebiamministrazionicondominiali-sanlazzarodisavena-80f1cd87-a9be-4021-b79e-9c93db18d5e1",
};

/** Valutazione aggregata verificata su PagineGialle. */
export const RATING = { value: 5, display: "5,0", count: 2 };

/** Orari di ricevimento (Europe/Rome) in minuti dalla mezzanotte. Indice JS: 0 = domenica. */
export const SCHEDULE: Record<number, readonly [number, number] | null> = {
  0: null,
  1: [510, 1020],
  2: [510, 1020],
  3: [510, 1020],
  4: [510, 1020],
  5: null,
  6: null,
};

export const NAV_LINKS = [
  { id: "chi-siamo", label: "Chi siamo" },
  { id: "piattaforma", label: "Portale" },
  { id: "energia", label: "Energia" },
  { id: "prezzi", label: "Prezzi" },
  { id: "contatti", label: "Contatti" },
];

/** Listino reale, IVA esclusa, per unità immobiliare e anno. */
export const PLANS = [
  {
    id: "essenziale",
    popular: false,
    name: "Essenziale",
    price: 84,
    tagline: "Ordine, trasparenza e conti sempre in regola.",
    features: [
      "Contabilità, bilancio preventivo e rendiconto annuale",
      "Assemblea ordinaria annuale, in presenza o online",
      "Portale e app condòmini 24/7",
      "Pagamento digitale delle rate",
      "Registri obbligatori digitali",
      "Assistenza in orario d'ufficio",
    ],
  },
  {
    id: "completo",
    name: "Completo",
    price: 108,
    popular: true,
    tagline: "Il piano con la manutenzione e le emergenze sotto controllo.",
    features: [
      "Tutto il piano Essenziale",
      "Fino a 2 assemblee straordinarie incluse",
      "Gestione manutenzioni con ticket e foto",
      "Reperibilità h24 per le emergenze",
      "Controllo bollette e contratti fornitori",
      "Recupero crediti stragiudiziale",
      "Report trimestrale per il consiglio",
    ],
  },
  {
    id: "energia-plus",
    popular: false,
    name: "Energia+",
    price: 132,
    tagline: "Risparmio energetico e valore per l'edificio.",
    features: [
      "Tutto il piano Completo",
      "Diagnosi energetica a cura di Eniminds",
      "Rinegoziazione forniture luce e gas",
      "Monitoraggio dei consumi in tempo reale",
      "Studio di fattibilità CER e fotovoltaico",
      "Consulenza su bonus fiscali e pratiche edilizie",
      "Referente dedicato",
    ],
  },
] as const;

/** Un'accoppiata di margini su tutta la pagina, usata da ogni sezione. */
export const CONTAINER = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8";
