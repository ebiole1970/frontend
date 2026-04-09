import Link from "next/link";

const STEPS = [
  "Step 1 - Analisi Dominio (DNS, SPF, DMARC, DKIM)",
  "Step 2 - Digital Footprint (Leak email, Dark Web mentions)",
  "Step 3 - Infrastruttura (porte IP / esposizione servizi)",
  "Step 4 - NIS2 Self-Assessment (10 domande pesate)",
];

export default function WizardPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Percorso Guidato Cyber Risk</h1>
      <p className="mt-2 text-sm text-slate-300">
        Esegui il percorso completo per ottenere score, gap e report professionale con indicazioni operative.
      </p>
      <p className="mt-2 text-sm text-slate-400">
        Prezzo di accesso iniziale: <strong className="text-emerald-300">€ 0,99</strong>. Dopo la valutazione puoi
        scegliere piano Pro o percorso Enterprise.
      </p>

      <div className="mt-6 space-y-3">
        {STEPS.map((step, idx) => (
          <div key={step} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <p className="text-sm font-medium">
              {idx + 1}. {step}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/analisi-completa"
          className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Avvia Analisi Completa
        </Link>
        <p className="text-xs text-slate-500">(ti porta al percorso guidato con opzioni, prezzi e step)</p>
      </div>
    </main>
  );
}

