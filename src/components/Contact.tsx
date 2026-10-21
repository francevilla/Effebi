import { useState, type FormEvent } from "react";
import stradaMaggiore from "@/assets/strada-maggiore.jpg";
import { CONTACT, CONTAINER, WEB3FORMS_ACCESS_KEY } from "@/lib/constants";
import { Button, ButtonLink } from "./ui/Button";
import { OpenStatus } from "./ui/OpenStatus";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./ui/motion";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { nome: "", telefono: "", email: "", condominio: "", unita: "", messaggio: "", botcheck: false, consenso: false };

/** Inviare con Web3Forms se c'è la chiave (da impostare in src/lib/constants.ts), altrimenti mailto. */
async function send(payload: typeof EMPTY) {
  if (!WEB3FORMS_ACCESS_KEY) return "no-key" as const;
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "Richiesta dal sito — Studio EffeBi × Eniminds",
      from_name: payload.nome,
      nome: payload.nome,
      telefono: payload.telefono,
      email: payload.email,
      condominio: payload.condominio,
      unita: payload.unita,
      messaggio: payload.messaggio,
    }),
  });
  const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
  if (res.ok && data?.success) return "ok" as const;
  return "fail" as const;
}

function mailtoFallback(p: typeof EMPTY) {
  const body = [
    `Nome: ${p.nome}`,
    `Telefono: ${p.telefono}`,
    `Email: ${p.email}`,
    `Condominio: ${p.condominio}`,
    p.unita ? `Unità: ${p.unita}` : "",
    p.messaggio,
  ].filter(Boolean).join("\n");
  window.location.href = `mailto:${CONTACT.email}?${new URLSearchParams({ subject: "Richiesta dal sito — Studio EffeBi × Eniminds", body }).toString().replace(/\+/g, "%20")}`;
}

const field =
  "w-full min-h-12 bg-surface2 px-4 py-3 text-[17px] text-ink border border-white/25 placeholder:text-muted focus:border-accent focus-visible:outline-none autofill:bg-surface2" /* taste-skill-ignore: campi di un modulo reale */;

const labelCls = "mt-6 block text-small text-muted first:mt-0";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState(EMPTY);
  const set = (k: keyof typeof EMPTY) => (e: { target: { type?: string; checked?: boolean; value?: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? Boolean(e.target.checked) : e.target.value ?? "" }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const result = await send(form);
    if (result === "ok") {
      setStatus("sent");
      return;
    }
    setStatus("idle");
    mailtoFallback(form);
    setStatus("error");
  }

  return (
    <section id="contatti" aria-labelledby="contact-title" className="bg-surface py-28 sm:py-36">
      <div className={CONTAINER}>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
          {/* L'indirizzo: ciò che chiama, dove siamo, quando rispondiamo */}
          <div>
            <Reveal>
              <h2 id="contact-title" className="text-head">
                Parliamone in studio.
              </h2>
              <p className="mt-4 max-w-[52ch] text-lead text-body">
                Il primo parere è gratuito: raccontaci il condominio e ti diciamo come lo porteremmo avanti.
              </p>
            </Reveal>

            <div className="mt-12 max-w-[480px]">
              <a
                href={CONTACT.phoneHref}
                className="mt-1 block font-display text-[clamp(2.5rem,4.5vw,4rem)] leading-none text-accent hover:text-ink"
              >
                {CONTACT.phoneDisplay}
              </a>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" variant="secondary">
                  <WhatsAppIcon className="size-5" />
                  Scrivi su WhatsApp
                </ButtonLink>
                <ButtonLink href={CONTACT.emailHref} variant="quiet" className="self-center">
                  {CONTACT.email}
                </ButtonLink>
              </div>

              <address className="mt-10 text-body text-body not-italic">
                {CONTACT.street} · {CONTACT.city}
                <br />
                <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer" className="text-small text-muted underline decoration-1 underline-offset-4 hover:text-ink">
                  Apri in mappa
                </a>
              </address>
              <div className="mt-6">
                <OpenStatus className="text-body" />
                <p className="mt-1 text-small text-muted">
                  {CONTACT.hours} · {CONTACT.hoursNote}
                </p>
              </div>

              <img
                src={stradaMaggiore}
                alt="Strada Maggiore a Bologna: l'edificio tipico sotto i portici della città dello studio"
                loading="lazy"
                decoding="async"
                className="mt-10 aspect-[4/5] w-full max-w-[380px] object-cover"
              />
            </div>
          </div>

          {/* Il modulo: quando riceve una chiave invia diretto, oggi ripiega su email */}
          <form onSubmit={onSubmit} noValidate={false} className="max-w-[560px] lg:justify-self-end">
            <p className="text-small text-muted">La lettera per lo studio</p>
            <label htmlFor="f-nome" className={labelCls}>
              Nome e cognome
            </label>
            <input id="f-nome" name="nome" required autoComplete="name" value={form.nome} onChange={set("nome")} className={field} />
            <div className="grid gap-x-6 sm:grid-cols-2">
              <div>
                <label htmlFor="f-tel" className={labelCls}>
                  Telefono
                </label>
                <input id="f-tel" name="telefono" type="tel" required autoComplete="tel" value={form.telefono} onChange={set("telefono")} className={field} />
              </div>
              <div>
                <label htmlFor="f-email" className={labelCls}>
                  Email
                </label>
                <input id="f-email" name="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className={field} />
              </div>
            </div>
            <label htmlFor="f-cond" className={labelCls}>
              Indirizzo del condominio
            </label>
            <input id="f-cond" name="condominio" required autoComplete="street-address" value={form.condominio} onChange={set("condominio")} className={field} />
            <div className="grid gap-x-6 sm:grid-cols-2">
              <div>
                <label htmlFor="f-unita" className={labelCls}>
                  Unità immobiliari (approx.)
                </label>
                <input id="f-unita" name="unita" type="number" min={2} max={300} value={form.unita} onChange={set("unita")} className={field} />
              </div>
            </div>
            <label htmlFor="f-msg" className={labelCls}>
              Di cosa serve parlarci?
            </label>
            <textarea
              id="f-msg"
              name="messaggio"
              rows={4}
              required
              value={form.messaggio}
              onChange={set("messaggio")}
              className={`${field} min-h-32 resize-y`}
            />

            <label htmlFor="f-privacy" className="mt-6 flex items-start gap-3 text-small text-body">
              <input id="f-privacy" type="checkbox" required checked={form.consenso} onChange={set("consenso")} className="mt-1 size-4 shrink-0 accent-[#c9a45a]" />
              <span>
                Acconsento al trattamento dei miei dati per essere ricontattato (Reg. UE 2016/679). I dati restano
                presso lo studio e non cedono a terzi.
              </span>
            </label>
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

            <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={status === "sending"}>
              {status === "sending" ? "Invio in corso…" : WEB3FORMS_ACCESS_KEY ? "Invia la richiesta" : "Apri l'email pronta"}
            </Button>

            <p aria-live="polite" className="mt-4 min-h-6 text-small">
              {status === "sent" && <span className="text-accent">Arrivata. Ti rispondiamo in orario d'ufficio.</span>}
              {status === "error" && (
                <span className="text-body">
                  Il modulo non ha trovato l'invio diretto: ti abbiamo aperto una email già compilata — premi invio.
                  (La chiave Web3Forms si imposta in <code className="text-muted">src/lib/constants.ts</code>.)
                </span>
              )}
            </p>
            <p className="mt-2 text-small text-muted">
              Rispondiamo dal lunedì al giovedì, 8:30–17:00.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
