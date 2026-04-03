/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState } from "react";

const PLANS = [
  { code: "one_shot", name: "One-shot Quick Check", price: "79 EUR", note: "Interrogazione singola" },
  { code: "starter", name: "Starter", price: "59 EUR/mese", note: "1 dominio + report mensile" },
  { code: "growth", name: "Growth", price: "149 EUR/mese", note: "fino a 5 domini + alert + help desk" },
  { code: "business", name: "Business", price: "349 EUR/mese", note: "fino a 20 domini + board premium" },
];

export default function SubscriptionPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  async function onCheckout(planCode: string) {
    setStatus("Creazione checkout in corso...");
    try {
      const resp = await fetch(`${apiBase}/api/v1/billing/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_code: planCode, email }),
      });
      const data = await resp.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setStatus("Checkout non disponibile.");
    } catch {
      setStatus("Errore durante il checkout.");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-50">
      <h1 className="text-2xl font-semibold">Pricing & Abbonamenti</h1>
      <p className="mt-2 text-sm text-slate-300">
        Scegli tra interrogazione one-shot o monitoraggio continuo con report mensile automatico.
      </p>
      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
        <label className="text-xs text-slate-300">Email per checkout Stripe</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="nome@azienda.it"
        />
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {PLANS.map((plan) => (
          <article key={plan.name} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-lg font-semibold">{plan.name}</p>
            <p className="mt-2 text-emerald-300">{plan.price}</p>
            <p className="mt-2 text-xs text-slate-400">{plan.note}</p>
            <button
              className="mt-4 rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950"
              onClick={() => onCheckout(plan.code)}
            >
              Attiva ora
            </button>
          </article>
        ))}
      </section>
      {status ? <p className="mt-4 text-xs text-slate-300">{status}</p> : null}
    </main>
  );
}

