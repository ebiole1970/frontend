"use client";

import { MarketplaceCheckoutPanel } from "@/components/marketplace-checkout-panel";
import { fetchMarketplaceCatalog } from "@/lib/marketplace-api";
import type { MarketplaceBundle, MarketplaceToolFull } from "@/lib/marketplace-tools-fallback";
import { NavShortcuts } from "@/components/nav-shortcuts";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MarketplacePage() {
  const [tools, setTools] = useState<MarketplaceToolFull[]>([]);
  const [bundles, setBundles] = useState<MarketplaceBundle[]>([]);
  const [usingLocalCatalog, setUsingLocalCatalog] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const cat = await fetchMarketplaceCatalog();
      if (cancelled) return;
      setTools(cat.tools);
      setBundles(cat.bundles);
      setUsingLocalCatalog(cat.usingLocalCatalog);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-500/90">GetNeuralOps</p>
        <h1 className="text-2xl font-semibold text-slate-50">Catalogo Cyber — 12 strumenti</h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Ogni scheda mostra titolo, descrizione breve, prezzo e accesso al checkout. Apri il dettaglio per la
          guida completa: cosa fa il tool, attività svolte, risultato in dashboard e eventuale PDF via email.
        </p>
        <p className="text-xs text-slate-500">
          Abbonamenti e piani annuali (anche con Klarna dove abilitato in Stripe):{" "}
          <Link href="/subscription" className="text-emerald-500 hover:text-emerald-400">
            Pricing
          </Link>
          . Ogni scansione richiede accettazione termini e registra IP per audit (Art. 615-ter c.p.).
        </p>
      </header>

      <div className="flex justify-end">
        <NavShortcuts />
      </div>

      {usingLocalCatalog ? (
        <p className="max-w-2xl text-[13px] leading-relaxed text-slate-500">
          <span className="text-slate-400">Senza API collegata</span> il catalogo è comunque completo (stessi 12
          strumenti da copia locale). Per leggere i dati dal server: avvia uvicorn e in{" "}
          <code className="rounded bg-slate-900 px-1 py-0.5 text-slate-400">.env.local</code> usa la stessa porta
          (es. <code className="rounded bg-slate-900 px-1 py-0.5 text-slate-400">NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000</code> o{" "}
          <code className="rounded bg-slate-900 px-1 py-0.5 text-slate-400">:8001</code> se 8000 è occupata), poi
          riavvia <code className="rounded bg-slate-900 px-1 py-0.5 text-slate-400">npm run dev</code>.
        </p>
      ) : null}

      <section className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-400/90">
          Bundle consigliati da noi
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Due strumenti complementari a prezzo promozionale (stesso checkout del bundle 19,99€). Ideale per
          coprire rischi collegati in un solo acquisto.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {bundles.map((b) => (
            <article
              key={b.id}
              className="flex flex-col rounded-lg border border-slate-800 bg-slate-900/50 p-4"
            >
              <p className="text-sm font-semibold text-slate-100">{b.title}</p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{b.why}</p>
              <p className="mt-3 text-emerald-400">
                {b.price_eur} €{" "}
                <span className="text-[11px] font-normal text-slate-500">/ 2 strumenti</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {b.tool_ids.map((tid) => (
                  <Link
                    key={tid}
                    href={`/marketplace/${tid}`}
                    className="rounded border border-slate-600 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-800"
                  >
                    {tools.find((x) => x.id === tid)?.name ?? tid}
                  </Link>
                ))}
              </div>
              <Link
                href="#checkout-bundle"
                className="mt-4 inline-flex justify-center rounded-md bg-emerald-600 px-3 py-2 text-center text-xs font-semibold text-slate-950 hover:bg-emerald-500"
              >
                Acquista bundle {b.price_eur} €
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <article
            key={t.id}
            className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm transition hover:border-slate-700"
          >
            <div className="mb-3 overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-4">
              <img
                src={`/icons/tools/${t.id}.svg`}
                width={56}
                height={56}
                alt={`${t.name} icona`}
                className="h-14 w-14"
                loading="lazy"
              />
            </div>
            <div className="mb-3 min-w-0">
              <h2 className="text-sm font-semibold text-slate-100">{t.name}</h2>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">{t.focus}</p>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">{t.short_description}</p>
            <p className="mt-3 text-base font-semibold text-emerald-400">
              {t.price_eur_one_shot} €{" "}
              <span className="text-xs font-normal text-slate-500">/ analisi</span>
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              {t.has_pdf_option ? "Dashboard + PDF possibile" : "Esito principale in dashboard"}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={`/marketplace/${t.id}`}
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-center text-xs font-semibold text-slate-950 hover:bg-emerald-500"
              >
                Guida e checkout
              </Link>
              <Link
                href={`/dashboard?tool=${encodeURIComponent(t.id)}`}
                className="inline-flex items-center justify-center rounded-md border border-slate-600 px-3 py-2 text-center text-xs text-slate-200 hover:bg-slate-800"
              >
                Analizza in dashboard
              </Link>
            </div>
          </article>
        ))}
      </section>

      {!usingLocalCatalog && tools.length === 0 ? (
        <p className="text-sm text-slate-500">Caricamento catalogo…</p>
      ) : null}

      <section id="checkout-bundle" className="scroll-mt-8 space-y-4 border-t border-slate-800 pt-8">
        <h2 className="text-sm font-semibold text-slate-200">Checkout bundle (19,99 €)</h2>
        <p className="text-xs text-slate-500">
          Due utilizzi strumenti marketplace al prezzo promozionale. Dopo il pagamento potrai applicare le
          analisi dalla dashboard.
        </p>
        <div className="max-w-md">
          <MarketplaceCheckoutPanel
            mode="bundle"
            priceLabel="19,99 € — bundle 2 strumenti"
            primaryLabel="Paga 19,99 € e apri checkout Stripe"
          />
        </div>
      </section>

      <aside className="rounded-lg border border-dashed border-slate-700 p-4 text-xs text-slate-500">
        <strong className="text-slate-400">Consulenza su misura</strong> — Il pacchetto consulenza con BE FAST
        WEB S.R.L.S. (preventivo, SLA, deliverable) sarà gestito in un percorso dedicato; per ora puoi{" "}
        <Link href="/booking" className="text-emerald-600 hover:text-emerald-500">
          prenotare una call
        </Link>
        .
      </aside>

      <footer className="border-t border-slate-800 pt-6 space-y-4 text-xs text-slate-600">
        <NavShortcuts />
        <Link href="/" className="block text-emerald-600 hover:text-emerald-500">
          Torna alla home
        </Link>
      </footer>
    </main>
  );
}
