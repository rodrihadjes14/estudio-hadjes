import Link from "next/link";


export default function Header() {
  return (
    <header style={{padding:"16px", borderBottom:"1px solid #444"}}>
      <nav style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Link href="/" style={{fontWeight:"bold", fontSize:20}}>Estudio Hadjes</Link>
        <div style={{display:"flex", gap:"16px"}}>
          <Link href="/servicios">Servicios</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
      </nav>
    </header>
  );
}
