// app/blog/page.js
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/markdown";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;

export function generateMetadata() {
  return pageMeta({
    title: "Blog",
    description: "Artículos legales en lenguaje claro para trabajadores de Capital Federal y GBA.",
    path: "/blog",
  });
}

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="page-wrap">
      {/* Breadcrumb visible */}
      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span> <span>Blog</span>
      </nav>

      <h1>Blog</h1>

      <section className="section section-center">
        <p className="max-w-2xl">
          Artículos breves y prácticos sobre derecho laboral y del consumidor.
        </p>

        {posts.length === 0 ? (
          <p className="mt-4 opacity-80">No hay artículos publicados aún.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {posts.map((p) => (
              <article key={p.slug} className="card">
                <h2 className="text-lg font-semibold">
                  <Link href={`/blog/${p.slug}`} className="link">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm opacity-75">
                  {p.date}
                  {p.author ? ` — ${p.author}` : ""}
                </p>
                {p.summary && <p className="mt-2 opacity-90">{p.summary}</p>}
                <div className="mt-3">
                  <Link href={`/blog/${p.slug}`} className="btn focus-ring">
                    Leer más
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Interlinking interno */}
      <section className="section">
        <h2 className="section-title">Recursos</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li><Link href="/servicios" className="link">Ver todos los servicios</Link></li>
          <li><Link href="/faq" className="link">Preguntas frecuentes</Link></li>
          <li><Link href="/contacto" className="link">Contactanos</Link></li>
        </ul>
      </section>
    </main>
  );
}
