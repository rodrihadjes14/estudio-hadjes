// app/blog/page.js
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/markdown";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;

export function generateMetadata() {
  return pageMeta({
    title: "Blog",
    description: "Artículos legales en lenguaje claro para trabajadores de CABA y GBA.",
    path: "/blog",
  });
}

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="max-w-5xl mx-auto my-10 px-4 leading-relaxed">
      {/* Breadcrumb visible */}
      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span> <span>Blog</span>
      </nav>

      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="mt-2">Artículos breves y prácticos sobre derecho laboral y del consumidor.</p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {posts.length === 0 ? (
          <p className="opacity-80">No hay artículos publicados aún.</p>
        ) : (
          posts.map((p) => (
            <article key={p.slug} className="rounded-lg border border-neutral-700 p-4">
              <h2 className="text-xl font-semibold">
                <Link href={`/blog/${p.slug}`} className="underline underline-offset-2">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm opacity-80">
                {p.date}
                {p.author ? ` — ${p.author}` : ""}
              </p>
              {p.summary && <p className="mt-2">{p.summary}</p>}
              <div className="mt-3">
                <Link href={`/blog/${p.slug}`} className="underline underline-offset-2">
                  Leer más
                </Link>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Interlinking interno */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Recursos</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li><Link href="/servicios" className="underline underline-offset-2">Ver todos los servicios</Link></li>
          <li><Link href="/faq" className="underline underline-offset-2">Preguntas frecuentes</Link></li>
          <li><Link href="/contacto" className="underline underline-offset-2">Contactanos</Link></li>
        </ul>
      </section>
    </main>
  );
}
