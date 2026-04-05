/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { NavShortcuts } from "@/components/nav-shortcuts";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

type TiersPayload = {
  free?: { scans_per_month?: number; features?: string[] };
  standard_monthly?: { price_monthly_eur?: number; features?: string[] };
  professional_monthly?: { price_monthly_eur?: number; features?: string[] };
  standard_annual?: { credit_back_note?: string };
  professional_annual?: { credit_back_note?: string };
};

type CarnetPackagesPayload = {
  carnet_validity_days_note?: string;
  packages?: Array<{ code: string; credits: number; stripe_env: string }>;
};

export default function SubscriptionPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [tiers, setTiers] = useState<TiersPayload | null>(null);
  const [carnetPkgs, setCarnetPkgs] = useState<CarnetPackagesPayload | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`${apiBase}/api/v1/stripe/tiers`);
        if (!r.ok) return;
        const j = (await r.json()) as TiersPayload;
        if (!cancelled) setTiers(j);
      } catch {
        /* fallback copy statico */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const r = await fetch(`${apiBase}/api/v1/credits/packages`);
        if (!r.ok) return;
        const j = (await r.json()) as CarnetPackagesPayload;
        if (!cancelled) setCarnetPkgs(j);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  const userId = session?.user?.id;

  async function postCheckout(path: string, body: Record<string, unknown>) {
    setStatus("Creazione checkout in corso...");
    try {
      const resp = await fetch(`${apiBase}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await resp.json()) as { url?: string; mock?: boolean; detail?: unknown };
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      const msg =
        typeof data?.detail === "string"
          ? data.detail
          : "Checkout non disponibile (verifica STRIPE_SECRET e Price ID nel backend).";
      setStatus(msg);
    } catch {
      setStatus("Errore di rete durante il checkout.");
    }
  }

  function onOneShot10() {
    if (!email.trim()) {
      setStatus("Inserisci un’email valida per il checkout.");
      return;
    }
    void postCheckout("/api/v1/stripe/checkout/one-shot-10", {
      email: email.trim(),
      user_id: userId ?? null,
      tool_id: "one_shot_10",
    });
  }

  function onBundle15() {
    if (!email.trim()) {
      setStatus("Inserisci un’email valida per il checkout.");
      return;
    }
    void postCheckout("/api/v1/stripe/checkout/bundle-15", {
      email: email.trim(),
      user_id: userId ?? null,
    });
  }

  function onCarnet(code: string) {
    if (!email.trim()) {
      setStatus("Inserisci un’email valida per il checkout.");
      return;
    }
    void postCheckout("/api/v1/stripe/checkout/carnet", {
      email: email.trim(),
      user_id: userId ?? null,
      carnet_code: code,
    });
  }

  function onSubscription(planCode: string, applyCreditBack: boolean) {
    if (!email.trim()) {
      setStatus("Inserisci un’email valida per il checkout.");
      return;
    }
    void postCheckout("/api/v1/stripe/checkout/subscription", {
      email: email.trim(),
      user_id: userId ?? null,
      plan_code: planCode,
      apply_credit_back: applyCreditBack,
    });
  }

  function onLegacyCheckout(planCode: string) {
    if (!email.trim()) {
      setStatus("Inserisci un’email valida per il checkout.");
      return;
    }
    setStatus("Creazione checkout in corso...");
    void (async () => {
      try {
        const resp = await fetch(`${apiBase}/api/v1/billing/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan_code: planCode, email: email.trim() }),
        });
        const data = (await resp.json()) as { url?: string };
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
        setStatus("Checkout legacy non disponibile.");
      } catch {
        setStatus("Errore durante il checkout.");
      }
    })();
  }

  const stdPrice = tiers?.standard_monthly?.price_monthly_eur ?? 19;
  const proPrice = tiers?.professional_monthly?.price_monthly_eur ?? 49;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-50">
      <NavShortcuts className="mb-6" />
      <h1 className="text-2xl font-semibold">Pricing &amp; abbonamenti</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-300">
        GetNeuralOps — CyberShield &amp; NIS2 Advisor. I pagamenti passano da <strong className="text-slate-200">Stripe</strong>{" "}
        con <strong className="text-slate-200">PayPal</strong> e <strong className="text-slate-200">Klarna</strong>{" "}
        (es. <strong className="text-emerald-300">3 rate senza interessi</strong> dove Klarna le propone in base a importo e idoneità). Se hai un account, accedi prima: il checkout associa correttamente gli acquisti al tuo profilo (credit-back su piano annuale).
      </p>
      <p className="mt-2 text-xs text-slate-500">
        <Link href="/legal/rimborsi" className="text-emerald-500 hover:text-emerald-400 underline-offset-2 hover:underline">
          Politica di rimborso e crediti carnet
        </Link>
      </p>

      <div className="mt-5 max-w-2xl rounded-xl border border-emerald-500/35 bg-emerald-950/30 px-4 py-4 shadow-lg shadow-emerald-950/20">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/90">
          Consulenza professionale
        </p>
        <p className="mt-2 text-sm text-slate-200">
          I servizi di <strong>consulenza cyber security</strong> e le prestazioni professionali erogate da{" "}
          <strong>BE FAST WEB S.R.L.S.</strong> possono ora essere{" "}
          <strong>rateizzate tramite Klarna</strong>, rendendo progetti e interventi specialistici accessibili a{" "}
          <strong>ogni budget aziendale</strong> — oltre al pagamento protetto con <strong>PayPal</strong> quando scegli
          quella opzione al checkout.
        </p>
        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
          Le opzioni effettive (importi minimi, numero di rate, idoneità) le mostra il gateway al momento del pagamento.
          Per progetti consulenziali su misura, dopo l’acquisto o da{" "}
          <Link href="/booking" className="text-emerald-500 hover:text-emerald-400 underline-offset-2 hover:underline">
            prenotazione
          </Link>{" "}
          coordiniamo fatturazione e piano rate dove applicabile.
        </p>
      </div>

      {sessionStatus === "unauthenticated" ? (
        <p className="mt-3 text-sm text-amber-200/90">
          <Link href="/login" className="underline hover:text-amber-100">
            Accedi
          </Link>{" "}
          per inviare automaticamente email e ID utente a Stripe.
        </p>
      ) : null}

      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
        <label className="text-xs text-slate-300">Email per checkout Stripe</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="nome@azienda.it"
          autoComplete="email"
        />
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-500/90">
          Pay-per-use (catalogo)
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-lg font-semibold">Singolo report</p>
            <p className="mt-2 text-emerald-300">10 EUR</p>
            <p className="mt-2 text-xs text-slate-400">Una scansione completa (Price Stripe dedicato).</p>
            <button
              type="button"
              className="mt-4 rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950"
              onClick={() => onOneShot10()}
            >
              Paga 10€
            </button>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-lg font-semibold">Bundle 2 tool</p>
            <p className="mt-2 text-emerald-300">15 EUR</p>
            <p className="mt-2 text-xs text-slate-400">Due strumenti a prezzo promozionale (un Price Stripe).</p>
            <button
              type="button"
              className="mt-4 rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950"
              onClick={() => onBundle15()}
            >
              Paga 15€
            </button>
          </article>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-500/90">
          Carnet crediti (prepagato)
        </h2>
        <p className="mt-2 max-w-2xl text-xs text-slate-400">
          {carnetPkgs?.carnet_validity_days_note ??
            "Pacchetti di crediti spendibili sui report del catalogo. Validità tipica 180 giorni dall’acquisto del lotto (vedi policy). Dopo esaurimento quota abbonamento, consumo: prima acquisti singoli/bundle, poi carnet."}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {(carnetPkgs?.packages ?? [
            { code: "carnet_5", credits: 5, stripe_env: "STRIPE_PRICE_CARNET_5_EUR" },
            { code: "carnet_10", credits: 10, stripe_env: "STRIPE_PRICE_CARNET_10_EUR" },
            { code: "carnet_25", credits: 25, stripe_env: "STRIPE_PRICE_CARNET_25_EUR" },
          ]).map((p) => (
            <article
              key={p.code}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <p className="text-lg font-semibold">{p.credits} crediti</p>
              <p className="mt-1 text-xs text-slate-500">
                Codice <code className="text-slate-400">{p.code}</code>
              </p>
              <p className="mt-2 text-xs text-slate-500">Price env: {p.stripe_env}</p>
              <button
                type="button"
                className="mt-4 w-full rounded-md bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-600"
                onClick={() => onCarnet(p.code)}
              >
                Acquista carnet
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-500/90">
          Abbonamenti (mensile / annuale)
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Piano annuale: credito automatico per acquisti tool negli ultimi 30 giorni (se abilitato in Stripe).
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-lg font-semibold">Standard</p>
            <p className="mt-2 text-emerald-300">{stdPrice} EUR/mese</p>
            <ul className="mt-2 list-inside list-disc text-xs text-slate-400">
              {(tiers?.standard_monthly?.features ?? ["5 scan/mese", "Alert email"]).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950"
                onClick={() => onSubscription("standard_monthly", false)}
              >
                Mensile
              </button>
              <button
                type="button"
                className="rounded-md border border-emerald-700 px-3 py-2 text-xs font-semibold text-emerald-200"
                onClick={() => onSubscription("standard_annual", true)}
              >
                Annuale + credit-back
              </button>
            </div>
          </article>
          <article className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-5 ring-1 ring-emerald-800/30">
            <p className="text-lg font-semibold">Professional</p>
            <p className="mt-1 text-xs text-emerald-400/80">Consigliato</p>
            <p className="mt-2 text-emerald-300">{proPrice} EUR/mese</p>
            <ul className="mt-2 list-inside list-disc text-xs text-slate-300">
              {(tiers?.professional_monthly?.features ?? [
                "Scan illimitati (fair use)",
                "NIS2 Advisor",
                "Report PDF (dove attivo)",
                "20% prima consulenza BE FAST WEB",
              ]).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950"
                onClick={() => onSubscription("professional_monthly", false)}
              >
                Mensile
              </button>
              <button
                type="button"
                className="rounded-md border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-100"
                onClick={() => onSubscription("professional_annual", true)}
              >
                Annuale + credit-back
              </button>
            </div>
          </article>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Piano <strong className="text-slate-400">Free</strong> (1 scan/mese): senza pagamento, dopo{" "}
          <Link href="/register" className="text-emerald-500 hover:text-emerald-400">
            registrazione
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 border-t border-slate-800 pt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Piani legacy (Stripe)</h2>
        <p className="mt-2 text-xs text-slate-500">
          Codici storici <code className="text-slate-400">one_shot</code>,{" "}
          <code className="text-slate-400">starter</code>, … — solo se i Price ID sono ancora configurati.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { code: "one_shot", name: "Legacy one-shot", price: "da env" },
            { code: "starter", name: "Starter", price: "59 EUR/mese (es.)" },
            { code: "growth", name: "Growth", price: "149 EUR/mese (es.)" },
            { code: "business", name: "Business", price: "349 EUR/mese (es.)" },
          ].map((p) => (
            <article
              key={p.code}
              className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-4"
            >
              <p className="text-sm font-medium text-slate-200">{p.name}</p>
              <p className="text-xs text-slate-500">{p.price}</p>
              <button
                type="button"
                className="mt-3 rounded border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                onClick={() => onLegacyCheckout(p.code)}
              >
                Checkout legacy
              </button>
            </article>
          ))}
        </div>
      </section>

      {status ? <p className="mt-6 text-xs text-slate-300">{status}</p> : null}

      <p className="mt-8 text-xs text-slate-600">
        <Link href="/marketplace" className="text-emerald-600 hover:text-emerald-500">
          Catalogo strumenti
        </Link>
        {" · "}
        <Link href="/" className="text-emerald-600 hover:text-emerald-500">
          Home
        </Link>
      </p>
    </main>
  );
}
