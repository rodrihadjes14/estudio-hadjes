// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-wrap">
      <h1 className="hero__title">Página no encontrada</h1>
      <p className="mt-2">La página que buscás no existe o fue movida.</p>
      <p className="mt-2">
        Volvé al <Link href="/" className="link">inicio</Link> o visitá los{" "}
        <Link href="/servicios" className="link">servicios</Link>.
      </p>
    </main>
  );
}
