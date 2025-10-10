// lib/seo.js
export function pageMeta({ title, description = "", path = "/", ogImage }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = new URL(path || "/", base).toString();

  const ogImages = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Tu Abogado Cerca",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
