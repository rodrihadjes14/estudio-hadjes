"use client";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export default function WhatsAppButton({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+5491130261498",
  message = "Hola, vengo del sitio web. Quiero hacer una consulta.",
  showLabel = true,
  gaLabel = "fab", // para distinguir ubicaciones si tenés más de un botón
}) {
  const pathname = usePathname();
  const digits = phone.replace(/\D/g, "");
  const url = new URL(`https://wa.me/${digits}`);
  url.searchParams.set("text", `${message} (página: ${pathname})`);

  const handleClick = useCallback(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        link_url: url.toString(),
        link_text: showLabel ? "WhatsApp" : "WhatsApp Icon",
        placement: gaLabel,                 // ej: "fab", "header", "footer"
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [url, showLabel, gaLabel]);

  return (
    <a
      href={url.toString()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp"
      className="wa-fab btn-whatsapp"
      onClick={handleClick}
    >
      {/* … tu SVG del ícono … */}
      {showLabel && <span className="hidden sm:inline">WhatsApp</span>}
    </a>
  );
}
