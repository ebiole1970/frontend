"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

type Mode = "one_shot" | "bundle";

type Props = {
  mode: Mode;
  /** Per one_shot: id tool marketplace */
  toolId?: string;
  priceLabel: string;
  primaryLabel: string;
  className?: string;
};

export function MarketplaceCheckoutPanel({
  mode,
  toolId,
  priceLabel,
  primaryLabel,
  className = "",
}: Props) {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (session?.user?.email) setEmail(session.user.email);
  }, [session?.user?.email]);

  const userId = session?.user?.id;

  async function go() {
    const em = email.trim();
    if (!em) {
      setStatus("Inserisci un’email valida per il checkout.");
      return;
    }
    setStatus("Apertura checkout sicuro…");
    const path =
      mode === "bundle" ? "/api/v1/stripe/checkout/bundle-15" : "/api/v1/stripe/checkout/one-shot-10";
    const body =
      mode === "bundle"
        ? { email: em, user_id: userId ?? null }
        : {
            email: em,
            user_id: userId ?? null,
            tool_id: toolId ?? "one_shot_10",
          };
    try {
      const resp = await fetch(`${apiBase}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await resp.json()) as { url?: string; detail?: unknown };
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      const msg =
        typeof data?.detail === "string"
          ? data.detail
          : "Checkout non disponibile (verifica Stripe e Price ID nel backend).";
      setStatus(msg);
    } catch {
      setStatus("Errore di rete. Riprova.");
    }
  }

  return (
    <div
      className={`rounded-xl border border-slate-700 bg-slate-950/60 p-4 ${className}`}
      id="checkout-marketplace"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-emerald-500/90">Checkout rapido</p>
      <p className="mt-1 text-lg font-semibold text-slate-50">{priceLabel}</p>
      <p className="mt-1 text-[11px] text-slate-500">
        Pagamento tramite Stripe (carta, PayPal se attivo; Klarna su abbonamenti dove abilitato nel
        Dashboard). Riceverai la conferma all’email indicata.
      </p>
      <label className="mt-3 block text-xs text-slate-400">Email per fattura e accesso</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        placeholder="nome@azienda.it"
        className="mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600"
      />
      <button
        type="button"
        onClick={() => void go()}
        className="mt-3 w-full rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        {primaryLabel}
      </button>
      {status ? <p className="mt-2 text-xs text-amber-200/90">{status}</p> : null}
    </div>
  );
}
