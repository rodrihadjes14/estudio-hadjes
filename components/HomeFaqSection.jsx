// components/HomeFaqSection.jsx
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/lib/faqs";

export default function HomeFaqSection() {
  // subset SEO-friendly: no duplicamos todo el FAQ en la home
  const subset = FAQS.slice(0, 4);
  return (
    <section className="section text-center">
      <p className="mt-2 text-white max-w-prose mx-auto">
        Respuestas rápidas a dudas comunes. Para ver todas, visitá la sección completa.
      </p>
      <div className="mt-4">
        <FaqAccordion items={subset} />
      </div>
      <div className="mt-4 flex justify-center">
        <Link href="/faq" className="btn focus-ring bg-white/10 hover:bg-white/20">
          Ver todas las preguntas
        </Link>
      </div>
    </section>
  );
}
