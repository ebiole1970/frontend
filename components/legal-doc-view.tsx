"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

const apiBase =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) || "http://127.0.0.1:8000";

type Kind = "terms" | "privacy";

export function LegalDocView({ kind }: { kind: Kind }) {
  const [md, setMd] = useState("");
  const [err, setErr] = useState("");
  const endpoint = kind === "terms" ? "document/terms" : "document/privacy";

  useEffect(() => {
    const base = apiBase.replace(/\/$/, "");
    void fetch(`${base}/api/v1/legal/${endpoint}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(setMd)
      .catch((e) => setErr(e instanceof Error ? e.message : "Errore caricamento"));
  }, [endpoint]);

  if (err) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm text-rose-400">{err}</p>
        <p className="mt-4 text-xs text-slate-500">
          Verifica che il backend sia avviato e che esistano i file in <code className="text-slate-400">backend/legal/</code>.
        </p>
        <Link href="/" className="mt-6 inline-block text-emerald-500">
          ← Home
        </Link>
      </main>
    );
  }

  if (!md) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm text-slate-400">Caricamento testo legale…</p>
      </main>
    );
  }

  return (
    <main
      className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed text-slate-300
      [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-slate-100 [&_h1]:mb-4
      [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-slate-100
      [&_h3]:mt-4 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:text-slate-200
      [&_p]:mt-2 [&_strong]:text-slate-200 [&_em]:text-slate-400
      [&_hr]:my-6 [&_hr]:border-slate-700"
    >
      <p className="mb-6 text-xs text-slate-500">
        Testo caricato da <code className="text-slate-400">backend/legal/</code> (modificabile; riavviare il
        backend dopo le correzioni).
      </p>
      <ReactMarkdown>{md}</ReactMarkdown>
      <nav className="mt-10 flex flex-wrap gap-4 text-sm">
        {kind === "terms" ? (
          <Link href="/privacy-policy" className="text-emerald-500 hover:text-emerald-400">
            Privacy
          </Link>
        ) : (
          <Link href="/terms-of-service" className="text-emerald-500 hover:text-emerald-400">
            Termini di servizio
          </Link>
        )}
        <Link href="/" className="text-emerald-500 hover:text-emerald-400">
          ← Home
        </Link>
      </nav>
    </main>
  );
}
