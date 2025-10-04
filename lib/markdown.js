import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function filenameToSlug(filename) {
  return filename.replace(/\.md$/, "");
}

export function getAllPostsMeta() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));
  const posts = files.map(filename => {
    const filePath = path.join(POSTS_DIR, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { data } = matter(file);
    const fallbackSlug = filenameToSlug(filename);
    return {
      title: data.title ?? "",
      slug: data.slug ?? fallbackSlug,
      date: data.date ?? "",
      author: data.author ?? "",
      summary: data.summary ?? "",
      tags: data.tags ?? [],
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug) {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));

  for (const filename of files) {
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    const fmSlug = data.slug ?? filenameToSlug(filename);
    if (fmSlug === slug) {
      const fileHtml = await remark()
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: "wrap" })
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(content);

      return {
        meta: {
          title: data.title ?? "",
          slug: fmSlug,
          date: data.date ?? "",
          author: data.author ?? "",
          summary: data.summary ?? "",
          tags: data.tags ?? [],
        },
        html: String(fileHtml),
      };
    }
  }

  return null;
}
