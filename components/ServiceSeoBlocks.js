import Link from "next/link";


// components/ServiceSeoBlocks.js
export function LeadBlock({ title, children }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}

export function CtaPrimary({ href = "/contacto", children = "Contanos tu caso" }) {
  return (
    <div className="mt-6">
      <Link
        href={href}
        className="inline-block rounded-md border border-neutral-500 px-4 py-2 hover:bg-neutral-900"
      >
        {children}
      </Link>
    </div>
  );
}


/** Listado con bullets claros, evita párrafos largos */
export function BulletList({ items = [] }) {
  return (
    <ul className="mt-3 list-disc pl-5 leading-relaxed">
      {items.map((t, i) => (
        <li key={i} className="my-1">{t}</li>
      ))}
    </ul>
  );
}
