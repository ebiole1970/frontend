"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

export default function RefundPolicyPage() {
  const [text, setText] = useState<string | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const r = await fetch(`${apiBase}/api/v1/legal/document/refunds`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const t = await r.text();
        if (!cancelled) setText(t);
      } catch {
        if (!cancelled) setErr("Impossibile caricare la policy dal backend.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      <p className="text-sm text-slate-500">
        <Link href="/" className="text-emerald-500 hover:text-emerald-400">
          Home
        </Link>
        {" · "}
        <Link href="/subscription" className="text-emerald-500 hover:text-emerald-400">
          Prezzi
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-semibold">Politica di rimborso e crediti</h1>
      {err ? <p className="mt-6 text-sm text-amber-400">{err}</p> : null}
      {text ? (
        <pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">{text}</pre>
      ) : !err ? (
        <p className="mt-6 text-sm text-slate-500">Caricamento…</p>
      ) : null}
    </main>
  );
}
