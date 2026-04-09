"use client";

import { MarketplaceCheckoutPanel } from "@/components/marketplace-checkout-panel";
import { fetchMarketplaceCatalog } from "@/lib/marketplace-api";
import {
  getMarketplaceToolById,
  type MarketplaceToolFull,
} from "@/lib/marketplace-tools-fallback";
import { LandingPurchaseJourney } from "@/components/landing-purchase-journey";
import { NavShortcuts } from "@/components/nav-shortcuts";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MarketplaceToolDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const [tool, setTool] = useState<MarketplaceToolFull | null>(() =>
    id ? getMarketplaceToolById(id) ?? null : null,
  );

  useEffect(() => {
    if (!id) return;
    const local = getMarketplaceToolById(id);
    if (local) setTool(local);
    void (async () => {
      const cat = await fetchMarketplaceCatalog();
      const t = cat.tools.find((x) => x.id === id);
      if (t) setTool(t);
    })();
  }, [id]);

  if (!id || !tool) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-slate-300">
        <p>Strumento non trovato.</p>
        <Link href="/marketplace" className="mt-4 inline-block text-emerald-500 hover:text-emerald-400">
          ← Torna al catalogo
        </Link>
      </main>
    );
  }

  const t = tool;

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <NavShortcuts />
      <nav className="text-xs text-slate-500">
        <Link href="/marketplace" className="text-emerald-600 hover:text-emerald-500">
          Catalogo
        </Link>
        <span className="mx-2 text-slate-600">/</span>
        <span className="text-slate-400">{t.name}</span>
      </nav>

      <header className="space-y-3">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-5">
          <img
            src={`/icons/tools/${t.id}.svg`}
            width={72}
            height={72}
            alt={`${t.name} icona`}
            className="h-16 w-16"
          />
        </div>
        <div className="flex flex-wrap items-start gap-4">
          <img
            src={`/icons/tools/${t.id}.svg`}
            width={56}
            height={56}
            alt=""
            className="h-14 w-14 shrink-0"
          />
          <div>
            <h1 className="text-2xl font-semibold text-slate-50">{t.name}</h1>
            <p className="text-xs uppercase tracking-wide text-slate-500">{t.focus}</p>
            <p className="mt-2 text-sm text-slate-300">{t.short_description}</p>
            <p className="mt-3 text-lg font-semibold text-emerald-400">
              {t.price_eur_one_shot} € <span className="text-sm font-normal text-slate-500">/ analisi singola</span>
            </p>
            <p className="mt-3">
              <a
                href="#mini-guida-visiva"
                className="text-sm font-medium text-emerald-500 hover:text-emerald-400 underline-offset-2 hover:underline"
              >
                Vedi la mini guida visiva (dopo l’acquisto)
              </a>
            </p>
          </div>
        </div>
      </header>

      <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
        <h2 className="text-sm font-semibold text-slate-200">Cosa fa</h2>
        <p className="text-sm leading-relaxed text-slate-300">{t.guide_what_it_does}</p>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Attività svolte</h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-400">
          {t.guide_activities.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-500/90">Risultato in dashboard</h3>
          <p className="mt-2 text-sm text-slate-300">{t.guide_immediate_result}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">PDF / email</h3>
          {t.guide_pdf_email ? (
            <p className="mt-2 text-sm text-slate-300">{t.guide_pdf_email}</p>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Per questo strumento l’esito principale è in dashboard; nessun PDF automatico promesso in fase
              di acquisto singolo.
            </p>
          )}
        </div>
      </section>

      <section
        className="rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-8 sm:px-6"
        aria-labelledby="mini-guida-heading"
      >
        <h2 id="mini-guida-heading" className="sr-only">
          Mini guida visiva dopo l&apos;acquisto
        </h2>
        <LandingPurchaseJourney
          toolName={t.name}
          resultVariant={t.id === "mail_auth" ? "mail" : "generic"}
          className="mt-0"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          <MarketplaceCheckoutPanel
            mode="one_shot"
            toolId={t.id}
            priceLabel={`${t.price_eur_one_shot} € — pagamento una tantum`}
            primaryLabel={`Paga ${t.price_eur_one_shot} € e vai al checkout`}
          />
          <p className="text-[11px] text-slate-600">
            Pagamenti gestiti da Stripe (inclusi carta e PayPal con il tuo account Stripe). Per abbonamenti
            annuali e Klarna: vedi{" "}
            <Link href="/subscription" className="text-emerald-600 hover:text-emerald-500">
              Pricing
            </Link>
            .
          </p>
        </div>
        <aside className="rounded-xl border border-dashed border-slate-700 p-4 lg:col-span-2">
          <p className="text-xs font-semibold text-slate-400">Consulenza dedicata</p>
          <p className="mt-2 text-xs text-slate-500">
            Il pacchetto consulenza personalizzato con BE FAST WEB S.R.L.S. lo trattiamo in un flusso dedicato
            (non incluso in questo checkout).
          </p>
          <Link
            href="/booking"
            className="mt-3 inline-block text-xs font-medium text-emerald-500 hover:text-emerald-400"
          >
            Prendi un appuntamento →
          </Link>
        </aside>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-slate-800 pt-6">
        <Link
          href={`/dashboard?tool=${encodeURIComponent(t.id)}`}
          className="rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
        >
          Vai alla dashboard con questo tool
        </Link>
        <Link href="/marketplace" className="text-sm text-emerald-600 hover:text-emerald-500">
          ← Altri strumenti
        </Link>
      </div>
    </main>
  );
}
