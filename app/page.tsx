import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/40">
              <span className="text-emerald-400 text-lg font-semibold">CS</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm tracking-wide">
                CyberShield &amp; NIS2 Advisor
              </span>
              <span className="text-xs text-slate-400">by Be Fastweb Srls - Fastweb Partner</span>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <a href="#nis2" className="hover:text-emerald-400 transition-colors">
              Direttiva NIS2
            </a>
            <a href="#funzionalita" className="hover:text-emerald-400 transition-colors">
              Piattaforma
            </a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">
              Abbonamenti
            </a>
            <Link href="/subscription" className="hover:text-emerald-400 transition-colors">
              Prezzi live
            </Link>
            <a
              href="/login"
              className="rounded-full border border-emerald-500/70 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              Area Riservata
            </a>
          </nav>
        </div>
      </header>

      <section id="funzionalita" className="flex-1 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid gap-12 lg:grid-cols-[1.25fr,1fr] items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Continuous Cyber Risk &amp; NIS2 Monitoring
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
              Misura il tuo Cyber Risk
              <br />
              prima che lo faccia il Regolatore.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl">
              <strong>CyberShield &amp; NIS2 Advisor</strong> è la piattaforma SaaS che unisce{" "}
              <span className="text-emerald-300">Hacker View</span>,{" "}
              <span className="text-emerald-300">Self-Assessment NIS2</span> e{" "}
              <span className="text-emerald-300">calcolo delle potenziali sanzioni</span>
              {" "}in un unico cruscotto, pronto per il tuo CDA.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/wizard"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
              >
                Avvia un Cyber Risk Check
              </Link>
              <Link
                href="/reports"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/40 px-5 py-2.5 font-semibold text-slate-100 hover:border-emerald-500/60 hover:text-emerald-300 transition-colors"
              >
                Area report
              </Link>
            </div>
            <div className="mt-8 grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="font-semibold text-slate-100">Hacker View</p>
                <p className="mt-1 text-slate-400">
                  Analisi dominio, DNS, footprint digitale e infrastruttura esposta.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="font-semibold text-slate-100">NIS2 Readiness Score</p>
                <p className="mt-1 text-slate-400">
                  Questionario guidato NIS2 con gap analysis e radar dei controlli.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="font-semibold text-slate-100">Report per il CDA</p>
                <p className="mt-1 text-slate-400">
                  PDF executive in brand Be Fastweb Srls per board e stakeholder.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 -z-10 bg-emerald-500/20 blur-3xl opacity-40" />
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-950/80 backdrop-blur p-5 shadow-2xl shadow-emerald-500/20">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Cyber Risk Score simulato</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                  Demo
                </span>
              </div>
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Cyber Risk Score</span>
                  <span className="font-semibold text-emerald-300">72 / 100</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2">
                    <p className="text-slate-400">NIS2 Readiness</p>
                    <p className="text-sm font-semibold text-emerald-300">Medium-High</p>
                    <p className="mt-1 text-[10px] text-amber-300">
                      Gap su gestione fornitori e logging sicurezza.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2">
                    <p className="text-slate-400">Potenziale sanzione</p>
                    <p className="text-sm font-semibold text-rose-300">Fino a 10M€</p>
                    <p className="mt-1 text-[10px] text-rose-400">
                      Stima su fatturato dichiarato e classe NIS2.
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  I dati reali saranno calcolati automaticamente una volta completato il percorso guidato.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="nis2" className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
              NIS2: dalla norma al rischio economico concreto.
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-2xl">
              La direttiva <strong>NIS2</strong> introduce obblighi stringenti per soggetti essenziali e
              importanti. CyberShield &amp; NIS2 Advisor traduce requisiti tecnici e organizzativi in un{" "}
              <span className="text-emerald-300">linguaggio comprensibile al board</span>, collegando i gap
              di sicurezza alle possibili sanzioni e impatti sul business.
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Calcolo automatico delle sanzioni potenziali (fino al 2% del fatturato).</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Radar chart dei controlli NIS2 per area (governance, detection, response…).</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Percorso guidato in 4 step tra Hacker View, OSINT e Self-Assessment.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Report PDF pronto per CDA, comitato rischi e auditor.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-xs text-slate-300">
            <p className="font-semibold text-slate-100">
              Casi d&apos;uso tipici
            </p>
            <ul className="mt-3 space-y-2">
              <li>• Prepara il CDA a una sessione dedicata alla NIS2.</li>
              <li>• Supporta il CISO nel prioritizzare investimenti di remediation.</li>
              <li>• Dimostra al regolatore un monitoraggio continuo del rischio.</li>
              <li>• Fornisce un unico cruscotto per IT, Risk Management e Legal.</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-950 px-4 py-12"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
                Abbonamenti pensati per la continuità.
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Attiva un{" "}
                <span className="text-emerald-300">Trial guidato</span> o integra subito la piattaforma nel
                tuo programma di Cyber Risk Management.
              </p>
            </div>
            <p className="text-xs text-slate-400">
              Pagamenti gestiti in sicurezza tramite Stripe.
            </p>
            <Link
              href="/subscription"
              className="inline-flex rounded-full border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              Attiva un piano →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Trial
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Valutazione iniziale</p>
              <p className="mt-2 text-xs text-slate-400">
                Accesso guidato con dati OSINT parzialmente oscurati e report demo.
              </p>
              <p className="mt-4 text-2xl font-semibold text-emerald-300">0 €</p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• 1 dominio analizzabile</li>
                <li>• NIS2 Self-Assessment base</li>
                <li>• Estratto report PDF</li>
              </ul>
            </div>

            <div className="relative rounded-2xl border border-emerald-500 bg-slate-950 p-5 text-sm text-slate-200 shadow-xl shadow-emerald-500/30">
              <div className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                Consigliato
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Pro
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Monitoraggio continuo</p>
              <p className="mt-2 text-xs text-slate-400">
                Per aziende che vogliono un cruscotto costante su esposizione esterna e NIS2.
              </p>
              <p className="mt-4 text-2xl font-semibold text-emerald-300">
                su preventivo
                <span className="ml-1 text-xs font-normal text-slate-400">/ mese</span>
              </p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• Più domini e IP range</li>
                <li>• Accesso completo a dati OSINT</li>
                <li>• Report PDF illimitati</li>
                <li>• Alert email su variazioni del Cyber Risk Score</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Enterprise
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Programma NIS2 dedicato</p>
              <p className="mt-2 text-xs text-slate-400">
                Per gruppi complessi, multi-giurisdizione, con governance e reporting integrati.
              </p>
              <p className="mt-4 text-2xl font-semibold text-emerald-300">tailor-made</p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• Integrazione con SIEM / GRC</li>
                <li>• Supporto consulenziale di Be Fastweb Srls</li>
                <li>• Reportistica personalizzata per Regolatore</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-slate-400">
            <p className="font-semibold text-slate-200">
              CyberShield &amp; NIS2 Advisor
            </p>
            <p>Soluzione Be Fastweb Srls per il Cyber Risk Management NIS2-ready.</p>
          </div>

          <form className="flex flex-col gap-2 text-xs text-slate-300 md:text-right">
            <label htmlFor="newsletter" className="text-slate-400">
              Iscriviti alla newsletter NIS2 per ricevere aggiornamenti normativi e casi d&apos;uso.
            </label>
            <div className="flex gap-2">
              <input
                id="newsletter"
                type="email"
                required
                placeholder="email@azienda.it"
                className="w-48 md:w-64 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                Iscriviti
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              Nessun spam. Solo insight pratici su NIS2, cyber risk e casi reali.
            </p>
          </form>
        </div>
      </footer>
    </main>
  );
}

