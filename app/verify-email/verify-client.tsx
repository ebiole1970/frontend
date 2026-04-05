"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const apiBase =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "http://127.0.0.1:8000";

type Phase = "loading" | "ok" | "err";

export function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [phase, setPhase] = useState<Phase>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setPhase("err");
      setMessage("Link non valido o incompleto.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${apiBase.replace(/\/$/, "")}/api/v1/auth/verify-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const text = await res.text();
        let detail = "";
        try {
          const j = JSON.parse(text) as { detail?: unknown; ok?: boolean };
          if (res.ok && j.ok) {
            if (!cancelled) setPhase("ok");
            return;
          }
          if (typeof j.detail === "string") detail = j.detail;
          else detail = text || "Verifica non riuscita.";
        } catch {
          detail = text || "Verifica non riuscita.";
        }
        if (!cancelled) {
          setPhase("err");
          setMessage(detail);
        }
      } catch {
        if (!cancelled) {
          setPhase("err");
          setMessage("Errore di rete. Riprova tra qualche minuto.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold">Attivazione account</h1>

      {phase === "loading" && (
        <p className="mt-4 text-sm text-slate-400">Verifica in corso…</p>
      )}

      {phase === "ok" && (
        <div className="mt-6 space-y-4">
          <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            Account attivato. Ora puoi accedere alla dashboard.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Vai al login
          </Link>
        </div>
      )}

      {phase === "err" && (
        <div className="mt-6 space-y-4">
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {message}
          </p>
          <p className="text-sm text-slate-400">
            Se il link è scaduto, registra di nuovo un account o contatta il supporto.
          </p>
          <Link href="/register" className="text-emerald-400 underline">
            Torna alla registrazione
          </Link>
        </div>
      )}
    </main>
  );
}
