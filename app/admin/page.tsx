"use client";

import { useCallback, useState } from "react";

type Summary = {
  tickets: Array<{
    id: number;
    email: string;
    subject: string;
    status: string;
    created_at: string | null;
  }>;
  subscriptions: Array<{
    id: number;
    email: string;
    plan_code: string;
    status: string;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    updated_at: string | null;
  }>;
  stripe_events_recent: Array<{
    id: number;
    stripe_event_id: string;
    event_type: string;
    created_at: string | null;
  }>;
};

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState("");
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const load = useCallback(async () => {
    setError("");
    try {
      const resp = await fetch(`${apiBase}/api/v1/admin/summary`, {
        headers: { "X-Admin-Key": key },
      });
      if (!resp.ok) {
        const j = await resp.json().catch(() => ({}));
        setError((j as { detail?: string }).detail || `Errore ${resp.status}`);
        setData(null);
        return;
      }
      setData(await resp.json());
    } catch {
      setError("Impossibile contattare il backend.");
      setData(null);
    }
  }, [apiBase, key]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-slate-100">
      <h1 className="text-2xl font-semibold tracking-tight">Admin — CyberShield</h1>
      <p className="mt-2 text-sm text-slate-400">
        Panoramica ticket, abbonamenti (da webhook Stripe) e ultimi eventi. Imposta{" "}
        <code className="rounded bg-slate-800 px-1">ADMIN_API_KEY</code> nel backend.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs text-slate-400">
          Chiave admin
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-72 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            placeholder="stessa chiave di .env"
            autoComplete="off"
          />
        </label>
        <button
          type="button"
          onClick={load}
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Carica dati
        </button>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}

      {data ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-400/90">
              Ticket help desk
            </h2>
            <ul className="mt-3 max-h-80 space-y-2 overflow-auto text-xs">
              {data.tickets.map((t) => (
                <li key={t.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-2">
                  <p className="font-medium text-slate-200">#{t.id} — {t.subject}</p>
                  <p className="text-slate-500">{t.email}</p>
                  <p className="text-slate-500">{t.status} · {t.created_at}</p>
                </li>
              ))}
              {!data.tickets.length ? <li className="text-slate-500">Nessun ticket.</li> : null}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-400/90">
              Abbonamenti (DB)
            </h2>
            <ul className="mt-3 max-h-80 space-y-2 overflow-auto text-xs">
              {data.subscriptions.map((s) => (
                <li key={s.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-2">
                  <p className="font-medium text-slate-200">{s.email}</p>
                  <p className="text-emerald-300/90">{s.plan_code} · {s.status}</p>
                  <p className="truncate text-slate-500" title={s.stripe_subscription_id || ""}>
                    {s.stripe_subscription_id || "—"}
                  </p>
                </li>
              ))}
              {!data.subscriptions.length ? (
                <li className="text-slate-500">Nessun record ancora (serve checkout + webhook).</li>
              ) : null}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-400/90">
              Eventi Stripe (log)
            </h2>
            <ul className="mt-3 max-h-80 space-y-2 overflow-auto text-xs">
              {data.stripe_events_recent.map((e) => (
                <li key={e.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-2">
                  <p className="font-mono text-[11px] text-slate-300">{e.event_type}</p>
                  <p className="text-slate-500">{e.created_at}</p>
                </li>
              ))}
              {!data.stripe_events_recent.length ? (
                <li className="text-slate-500">Nessun webhook ricevuto.</li>
              ) : null}
            </ul>
          </section>
        </div>
      ) : null}
    </main>
  );
}
