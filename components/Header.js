// components/Header.js
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-700">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold">Estudio Hadjes</Link>
        <div className="flex gap-4">
          <Link href="/servicios" className="hover:underline underline-offset-2">Servicios</Link>
          <Link href="/blog" className="hover:underline underline-offset-2">Blog</Link>
          <Link href="/faq" className="hover:underline underline-offset-2">FAQ</Link>
          <Link href="/contacto" className="hover:underline underline-offset-2">Contacto</Link>
        </div>
      </nav>
    </header>
  );
}
