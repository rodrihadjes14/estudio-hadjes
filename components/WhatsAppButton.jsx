"use client";
import Image from "next/image";

export default function WhatsAppButton({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+5491130261498",
  message = "Hola, quiero hacer una consulta legal.",
  gaLabel = "fab",
}) {
  // Limpia a solo dígitos para wa.me
  const digits = phone.replace(/\D/g, "");
  const baseHref = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  function handleClick(e) {
    try {
      e.preventDefault();

      const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";
      const url = new URL(`https://wa.me/${digits}`);
      url.searchParams.set("text", `${message} (página: ${pathname})`);

      // GA4: evento custom
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "whatsapp_click", {
          link_url: url.toString(),
          link_text: "WhatsApp Icon",
          placement: gaLabel,
          page_location: window.location.href,
          page_title: document.title,
        });
      }

      window.open(url.toString(), "_blank", "noopener,noreferrer");
    } catch {
      // Fallback si algo falla
      window.open(baseHref, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <a
      href={baseHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp"
      onClick={handleClick}
      // FAB fijo, redondo, verde oficial, centrado el ícono
      className="
        fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50
        flex items-center justify-center
        h-14 w-14 md:h-16 md:w-16
        rounded-full bg-[#25D366]
        shadow-lg ring-1 ring-black/15
        transition transform hover:scale-105 hover:shadow-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
        active:scale-95
      "
    >
      <Image
        src="/icons/whatsapp.svg"
        alt=""                             // decorativo (aria-label ya lo describe)
        width={28}
        height={28}
        priority={false}
        className="pointer-events-none w-7 h-7 md:w-8 md:h-8"
      />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
