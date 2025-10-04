export function pageMeta({ title, description = "", path = "/" }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = new URL(path, base).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Estudio Hadjes",
      type: "website",
    },
  };
}
