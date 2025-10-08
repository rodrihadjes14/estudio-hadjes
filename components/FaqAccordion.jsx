// components/FaqAccordion.jsx
"use client";

import { useState } from "react";

export default function FaqAccordion({ items = [] }) {
  return (
    <div className="divide-y divide-white/10 rounded-xl border border-white/10 text-center">
      {items.map(({ q, a }, i) => (
        <FaqItem key={i} question={q} answer={a} />
      ))}
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <button
        type="button"
        className="flex w-full items-center justify-center text-center gap-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold">{question}</span>
        <span className="select-none">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="mt-2 text-sm opacity-90 text-center">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
