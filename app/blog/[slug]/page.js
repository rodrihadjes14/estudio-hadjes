// app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import { getAllPostsMeta, getPostBySlug } from "@/lib/markdown";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { JSDOM } from "jsdom";

function extractFAQsFromHTML(html) {
  const dom = new JSDOM(html);
  const paragraphs = dom.window.document.querySelectorAll("p");
  const faqs = [];
  let currentQuestion = null;

  paragraphs.forEach(p => {
    const text = p.textContent.trim();
    if (text.startsWith("¿") && text.endsWith("?")) {
      currentQuestion = text;
    } else if (currentQuestion) {
      faqs.push({ q: currentQuestion, a: text });
      currentQuestion = null;
    }
  });

  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}


export const revalidate = 60;

export function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params || {};
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const { meta } = post;
  return pageMeta({
    title: meta.title,
    description: meta.summary || "",
    path: `/blog/${meta.slug}`,
    ogImage: meta.ogImage, // si existe en el front-matter
  });
}

export default async function BlogPost({ params }) {
  const faqSchema = extractFaqSchemaFromHtml(html);
  const { slug } = params || {};
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const { meta, html } = post;

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/blog/${meta.slug}`;

  // JSON-LD: Article
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    datePublished: meta.date || "",
    author: { "@type": "Organization", name: meta.author || "Estudio Hadjes" },
    publisher: { "@type": "Organization", name: "Estudio Hadjes" },
    mainEntityOfPage: canonical,
    ...(meta.ogImage
      ? {
          image: [
            `${base}${meta.ogImage.startsWith("/") ? "" : "/"}${meta.ogImage}`,
          ],
        }
      : {}),
  };

  // JSON-LD: Breadcrumbs
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: base },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: canonical },
    ],
  };

  return (
    <main className="page-wrap">
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      {faqSchema && <JsonLd data={faqSchema} />}


      {/* Breadcrumb visible */}
      <nav className="mb-4 text-sm">
        <Link href="/">Inicio</Link> <span className="mx-1">/</span>{" "}
        <Link href="/blog">Blog</Link> <span className="mx-1">/</span>{" "}
        <span>{meta.title}</span>
      </nav>

      <h1 className="text-3xl font-semibold">{meta.title}</h1>
      <p className="mt-1 text-sm opacity-80">
        {meta.date}
        {meta.author ? ` — ${meta.author}` : ""}
      </p>

      {/* Cuerpo del post */}
      <section className="section">
        <article
          className="leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>

      {/* Interlinking interno */}
      <section className="section">
        <h2 className="section-title">Seguí leyendo</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>
            <Link href="/servicios" className="link">
              Ver todos los servicios
            </Link>
          </li>
          <li>
            <Link href="/faq" className="link">
              Preguntas frecuentes
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="link">
              Contactanos
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
