import Link from "next/link";

const FULL_PATH_STEPS = [
  "Raccolta contesto aziendale e obiettivi operativi",
  "Analisi esterna del perimetro digitale e punti di esposizione",
  "Valutazione NIS2 guidata con priorita di remediation",
  "Consegna risultati e orientamento al percorso successivo",
];

export default function AnalisiCompletaPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Percorso guidato</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-50">Analisi completa GetNeuralOps</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          Questa pagina ti guida nella scelta del percorso completo: capisci cosa include, come si svolge, cosa ottieni
          e quale opzione scegliere tra valutazione guidata, piano continuativo e approccio enterprise.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/assessment?plan=pro"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Inizia con questionario Pro
          </Link>
          <Link
            href="/assessment?plan=enterprise"
            className="rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20"
          >
            Valuta percorso Enterprise
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xl font-semibold text-slate-100">Come funziona in pratica</h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-300">
          {FULL_PATH_STEPS.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-300">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-400">Valutazione iniziale</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-100">Snapshot Consapevolezza (0,99€)</h3>
          <p className="mt-2 text-sm text-slate-400">
            Analisi rapida del tuo perimetro digitale: esposizione del dominio, vulnerabilità email (SPF/DMARC)
            e check password esposte nel Dark Web. Il costo include il credito per richiedere il tuo Progetto di
            Cybersecurity personalizzato.
          </p>
          <p className="mt-4 text-2xl font-semibold text-emerald-300">EUR 0,99</p>
          <Link href="/subscription" className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300">
            Acquista Snapshot 0,99€
          </Link>
        </article>

        <article className="rounded-2xl border border-emerald-500/60 bg-slate-950 p-5">
          <p className="text-xs uppercase tracking-wide text-emerald-300">Percorso Pro</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-100">Monitoraggio continuativo</h3>
          <p className="mt-2 text-sm text-slate-400">
            Per chi vuole una vista costante su esposizione cyber, readiness NIS2 e azioni prioritarie.
          </p>
          <p className="mt-4 text-2xl font-semibold text-emerald-300">EUR 49,99 / mese</p>
          <Link
            href="/assessment?plan=pro"
            className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            Avvia questionario Pro
          </Link>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-xs uppercase tracking-wide text-emerald-300">Enterprise</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-100">Percorso su misura</h3>
          <p className="mt-2 text-sm text-slate-400">
            Per organizzazioni complesse che richiedono assessment esteso e sessione consulenziale dedicata.
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Riceverai un Progetto Gratuito redatto dai nostri esperti, pronto per essere validato o usato per
            ottenere i migliori preventivi sul mercato con dati certi e puntuali.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-300">Proposta personalizzata</p>
          <Link
            href="/assessment?plan=enterprise"
            className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            Avvia questionario Enterprise
          </Link>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xl font-semibold text-slate-100">Preferisci un solo strumento?</h2>
        <p className="mt-2 text-sm text-slate-400">
          Se non vuoi il percorso completo, puoi acquistare un singolo tool dal catalogo.
        </p>
        <div className="mt-4">
          <Link
            href="/marketplace"
            className="inline-flex rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20"
          >
            Vai al marketplace strumenti
          </Link>
        </div>
      </section>
    </main>
  );
}

