import { notFound } from "next/navigation";
import { getAllPostsMeta, getPostBySlug } from "@/lib/markdown";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const { meta } = post;
  return pageMeta({
    title: meta.title,
    description: meta.summary || "",
    path: `/blog/${meta.slug}`,
  });
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const { meta, html } = post;

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${base}/blog/${meta.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    datePublished: meta.date || "",
    author: { "@type": "Organization", name: meta.author || "Estudio Hadjes" },
    publisher: { "@type": "Organization", name: "Estudio Hadjes" },
    mainEntityOfPage: canonical,
  };

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <JsonLd data={articleLd} />
      <h1>{meta.title}</h1>
      <small>{meta.date} — {meta.author}</small>
      <article
        style={{ marginTop: 16, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
