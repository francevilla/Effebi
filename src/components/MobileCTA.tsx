import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { EASE } from "./ui/motion";
import { CONTACT } from "@/lib/constants";

/** Sticky conversion bar for small screens: appears after the hero, hides near the contact form. */
export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const contact = document.getElementById("contatti");
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setShow(pastHero && !nearContact);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center gap-2 bg-surface2 p-2">
            <a
              href={CONTACT.phoneHref}
              aria-label="Chiama Studio EffeBi"
              className="flex size-12 shrink-0 items-center justify-center bg-surface text-accent"
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scrivi su WhatsApp"
              className="flex size-12 shrink-0 items-center justify-center bg-surface text-accent"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href="#contatti"
              className="flex h-12 flex-1 items-center justify-center gap-2 bg-accent px-4 text-[17px] font-medium text-accent-ink active:bg-ink"
            >
              Preventivo gratuito
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
