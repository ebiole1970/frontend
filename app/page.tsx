import {
  ArrowRight,
  FileCheck,
  Layers,
  Radar,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { LandingPurchaseJourney } from "@/components/landing-purchase-journey";
import { LandingTestimonials } from "@/components/landing-testimonials";
import { NavShortcuts } from "@/components/nav-shortcuts";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/40">
              <span className="text-emerald-400 text-lg font-semibold">G</span>
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-semibold text-sm tracking-wide truncate">GetNeuralOps</span>
              <span className="text-xs text-slate-400 truncate">CyberShield &amp; NIS2 Advisor</span>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-300">
            <a href="#chi-siamo" className="hover:text-emerald-400 transition-colors">
              Chi siamo
            </a>
            <a href="#cyber" className="hover:text-emerald-400 transition-colors">
              Cyber
            </a>
            <a href="#nis2" className="hover:text-emerald-400 transition-colors">
              NIS2
            </a>
            <a href="#catalogo" className="hover:text-emerald-400 transition-colors">
              Catalogo
            </a>
            <a href="#social-proof" className="hover:text-emerald-400 transition-colors">
              Esperienze
            </a>
            <Link href="/marketplace" className="font-medium text-emerald-400 hover:text-emerald-300">
              12 strumenti
            </Link>
            <Link href="/subscription" className="hover:text-emerald-400 transition-colors">
              Prezzi
            </Link>
            <a
              href="/login"
              className="rounded-full border border-emerald-500/70 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              Accedi
            </a>
          </nav>
        </div>
      </header>

      <div
        role="region"
        aria-label="Metodi di pagamento"
        className="border-b border-emerald-800/50 bg-gradient-to-r from-slate-900 via-emerald-950/50 to-slate-900"
      >
        <div className="mx-auto max-w-6xl px-4 py-2.5 text-center text-[13px] sm:text-sm leading-snug text-slate-200">
          Pagamenti sicuri: carta,{" "}
          <span className="font-semibold text-emerald-300">PayPal</span> e, dove abilitato,{" "}
          <span className="font-semibold text-emerald-300">Klarna</span>
          <span className="text-slate-500"> — al checkout Stripe.</span>
        </div>
      </div>

      {/* Hero — problema → soluzione, identità */}
      <section id="chi-siamo" className="scroll-mt-24 border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr,1fr] items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                GetNeuralOps — piattaforma di sicurezza per chi decide
              </p>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight text-slate-50 leading-tight">
                Vediamo il tuo perimetro digitale
                <span className="text-emerald-400"> come un attaccante</span>, poi ti diciamo cosa fare.
              </h1>
              <p className="mt-4 text-base text-slate-300 max-w-xl leading-relaxed">
                Siamo il team dietro <strong className="text-slate-100">GetNeuralOps</strong> (servizio erogato da{" "}
                <strong className="text-slate-200">BE FAST WEB S.R.L.S.</strong>): unificiamo{" "}
                <span className="text-emerald-300">analisi cyber esterne</span>,{" "}
                <span className="text-emerald-300">readiness NIS2</span> e{" "}
                <span className="text-emerald-300">report chiari per il board</span> — senza promettere magie
                tecniche, con strumenti misurabili e consulenza quando serve.
              </p>
              <p className="mt-3 text-sm text-slate-500 max-w-xl">
                <strong className="text-slate-400">Perché siamo diversi:</strong> un solo posto per capire esposizione,
                compliance e priorità; 12 moduli specializzati nel catalogo; percorso guidato dalla scansione al
                report.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/wizard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-colors"
                >
                  Inizia dal Cyber Risk Check
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/marketplace"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                >
                  Esplora il catalogo (12 strumenti)
                </Link>
              </div>
              <div className="mt-8">
                <NavShortcuts />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 bg-gradient-to-br from-emerald-500/25 via-slate-800/20 to-transparent blur-3xl opacity-70" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4 overflow-hidden">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    Perimetro
                  </div>
                  <div className="mt-3 h-24 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900/80 ring-1 ring-slate-700/50" />
                  <p className="mt-2 text-[11px] text-slate-500">DNS, esposizione, servizi dimenticati</p>
                </div>
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4 overflow-hidden sm:mt-8">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Target className="h-4 w-4 text-amber-400" />
                    Priorità
                  </div>
                  <div className="mt-3 h-24 rounded-lg bg-gradient-to-br from-emerald-950/80 to-slate-900 ring-1 ring-emerald-500/20" />
                  <p className="mt-2 text-[11px] text-slate-500">Score, gap, cosa sistemare prima</p>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] text-slate-600">
                Illustrazioni stilizzate — in app vedi dati reali sul tuo dominio autorizzato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Cyber */}
      <section id="cyber" className="scroll-mt-24 border-b border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-slate-50 flex items-center gap-2">
              <Radar className="h-7 w-7 text-emerald-400 shrink-0" aria-hidden />
              Cyber: cosa offriamo
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Non solo un numero: una vista d&apos;insieme su come il tuo dominio e i tuoi servizi appaiono da
              fuori — con moduli dedicati (mail, brand, cloud, ransomware, web…). Ideale se non hai un SOC interno
              ma ti servono <strong className="text-slate-200">evidenze e priorità</strong>.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Layers,
                title: "12 moduli nel catalogo",
                text: "Scegli l’area (es. spoofing mail, typosquatting, leak) e lancia l’analisi dalla dashboard.",
              },
              {
                icon: Shield,
                title: "Uso lecito e tracciato",
                text: "Solo domini che controlli o per cui hai autorizzazione; audit e log come da policy.",
              },
              {
                icon: FileCheck,
                title: "Dal risultato al report",
                text: "Esito in dashboard; dove previsto anche materiali per stakeholder e consulenza.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-emerald-500/30"
              >
                <Icon className="h-8 w-8 text-emerald-400/90" aria-hidden />
                <h3 className="mt-3 font-semibold text-slate-100">{title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sezione NIS2 (più corta in hero, approfondita qui) */}
      <section id="nis2" className="scroll-mt-24 border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-14 grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">
          <div>
            <h2 className="text-2xl font-semibold text-slate-50">NIS2: dalla norma alle metriche per il board</h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              La direttiva NIS2 non è solo un elenco di obblighi: è <strong className="text-slate-200">rischio
              economico e reputazionale</strong>. CyberShield &amp; NIS2 Advisor ti aiuta con autovalutazione,
              indicatori e stime — in linguaggio comprensibile a management e CDA, integrabile con consulenza
              dedicata.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                Stime di sanzione e gap di controlli in base a quanto implementato nel prodotto.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                Percorso guidato tra analisi tecniche e self-assessment.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-emerald-950/20 to-slate-900/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/90">In sintesi</p>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Cyber e NIS2 convivono: prima capisci l&apos;esposizione, poi allinei governance e prove di
              diligenza — senza confondere il tool con un audit legale completo.
            </p>
            <Link
              href="/wizard"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Apri il percorso guidato <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Catalogo + percorso tipo demo (screenshot finti) */}
      <section id="catalogo" className="scroll-mt-24 border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold text-slate-50">Catalogo e percorso d’acquisto</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Dopo il pagamento (singolo strumento o bundle), dalla dashboard inserisci il dominio autorizzato e segui
            il flusso: sotto trovi una <strong className="text-slate-300">sequenza visiva in quattro schermate</strong>{" "}
            (dati e aziende inventati) per capire cosa vedrai passo dopo passo.
          </p>
          <LandingPurchaseJourney className="mt-12" resultVariant="mail" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-500"
            >
              Vai al catalogo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/subscription"
              className="text-sm font-medium text-slate-400 hover:text-emerald-400"
            >
              Vedi prezzi e abbonamenti →
            </Link>
          </div>
        </div>
      </section>

      <LandingTestimonials />

      {/* Pricing abbreviato */}
      <section id="pricing" className="scroll-mt-24 border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-950 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">Continuità e piani</h2>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                Pay-per-use nel catalogo, oppure abbonamenti con quote e funzioni estese — importi aggiornati sulla
                pagina prezzi.
              </p>
            </div>
            <Link
              href="/subscription"
              className="inline-flex rounded-full border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors self-start"
            >
              Apri la pagina prezzi →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Per iniziare</p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Valutazione</p>
              <p className="mt-2 text-xs text-slate-400">Accesso guidato e report demo dove previsto.</p>
              <p className="mt-4 text-2xl font-semibold text-emerald-300">0 €</p>
            </div>
            <div className="relative rounded-2xl border border-emerald-500/60 bg-slate-950 p-5 text-sm text-slate-200 shadow-lg shadow-emerald-500/15">
              <div className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                Popolare
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Pro</p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Monitoraggio</p>
              <p className="mt-2 text-xs text-slate-400">Cruscotto continuo e funzioni avanzate.</p>
              <p className="mt-4 text-lg font-semibold text-emerald-300">Vedi prezzi live</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Enterprise</p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Su misura</p>
              <p className="mt-2 text-xs text-slate-400">Gruppi complessi e integrazioni.</p>
              <p className="mt-4 text-2xl font-semibold text-emerald-300">tailor-made</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="border-b border-slate-800 bg-slate-950 px-4 py-12">
        <div className="mx-auto max-w-6xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Resta aggiornato</h2>
            <p className="mt-1 text-sm text-slate-400">
              Newsletter su cyber risk, NIS2 e casi d&apos;uso — niente spam.
            </p>
          </div>
          <form className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <input
              type="email"
              required
              placeholder="email@azienda.it"
              className="w-full sm:w-64 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Iscriviti
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
