"use client";

export default function WhatsAppButton({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+5491130261498",
  message = "Hola, vengo del sitio web. Quiero hacer una consulta.",
  gaLabel = "fab",
}) {
  const digits = phone.replace(/\D/g, "");
  // Fallback SSR por si algo impide el onClick
  const baseHref = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  function handleClick(e) {
    try {
      e.preventDefault();
      const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";
      const url = new URL(`https://wa.me/${digits}`);
      url.searchParams.set("text", `${message} (página: ${pathname})`);

      // GA4 evento
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
      // En caso de error, que siga el href default
      window.open(baseHref, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <a
      href={baseHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp"
      className="wa-fab btn-whatsapp"
      onClick={handleClick}
    >
      {/* Ícono SVG (nítido y escalable) */}
      <svg
        className="wa-ico"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        {/* handset blanco sobre fondo verde del botón */}
        <path
          fill="currentColor"
          d="M19.5 18.8c-.2.5-1.2 1-1.6 1.1-.4.1-.9.1-1.5-.1-1.8-.7-3.2-1.9-4.4-3.5-1.1-1.6-1.5-3-1.3-4.1.1-.5.6-1.3 1.1-1.5.3-.1.7 0 1 .2l1.5 1.1c.3.2.4.5.3.8-.1.4-.3.9-.5 1.1-.1.2 0 .4.1.6.6 1 1.4 1.9 2.4 2.6.2.2.4.2.6.1.3-.2.7-.4 1.1-.5.3-.1.6 0 .8.3l1.1 1.5c.2.3.3.7.2 1z"
        />
      </svg>

      {/* Etiqueta accesible oculta (por si querés; ya tenemos aria-label) */}
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
