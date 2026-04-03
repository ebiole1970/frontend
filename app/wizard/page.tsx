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
        Esegui il percorso completo per ottenere score, gap e report professionale.
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

      <button className="mt-6 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950">
        Avvia Analisi Completa
      </button>
    </main>
  );
}

