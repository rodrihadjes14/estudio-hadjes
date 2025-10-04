export function LeadBlock({ title, children }) {
  return (
    <section style={{marginTop:24}}>
      <h2 style={{marginBottom:8}}>{title}</h2>
      <div style={{lineHeight:1.75}}>{children}</div>
    </section>
  );
}

export function CtaPrimary({ href="/contacto", children="Contanos tu caso" }) {
  return (
    <div style={{marginTop:24}}>
      <a href={href} style={{display:"inline-block", padding:"10px 16px", border:"1px solid #888", borderRadius:6}}>
        {children}
      </a>
    </div>
  );
}

/** Listado con bullets claros, evita párrafos largos */
export function BulletList({ items=[] }) {
  return (
    <ul style={{marginTop:12, lineHeight:1.75}}>
      {items.map((t,i)=>(<li key={i} style={{margin:"6px 0"}}>{t}</li>))}
    </ul>
  );
}
