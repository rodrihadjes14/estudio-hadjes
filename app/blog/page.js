import Link from "next/link";
import { getAllPostsMeta } from "@/lib/markdown";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  return pageMeta({
    title: "Blog",
    description: "Artículos legales en lenguaje claro para trabajadores de CABA y GBA.",
    path: "/blog",
  });
}

export default async function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1>Blog</h1>
      <ul>
        {posts.map(p => (
          <li key={p.slug} style={{ margin: "14px 0" }}>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>
            <small>{p.date} — {p.author}</small>
            <p style={{ marginTop: 6 }}>{p.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
