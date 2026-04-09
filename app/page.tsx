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
            <img
              src="/brand/getneuralops-logo.svg"
              alt="Logo GetNeuralOps"
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 rounded-2xl"
            />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-semibold text-base tracking-wide truncate">GetNeuralOps</span>
              <span className="text-sm text-slate-400 truncate">Cyber Risk &amp; NIS2 Advisor</span>
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
              Strumenti
            </a>
            <a href="#social-proof" className="hover:text-emerald-400 transition-colors">
              Esperienze
            </a>
            <Link href="/analisi-completa" className="font-medium text-emerald-400 hover:text-emerald-300">
              Analisi completa
            </Link>
            <Link href="/subscription" className="hover:text-emerald-400 transition-colors">
              Prezzi
            </Link>
            <Link href="/helpdesk" className="hover:text-emerald-400 transition-colors">
              Assistenza
            </Link>
            <a
              href="/login"
              className="rounded-full border border-emerald-500/70 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
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
          Pagamenti sicuri: <span className="font-semibold text-emerald-300">Carta di credito</span>,{" "}
          <span className="font-semibold text-emerald-300">PayPal</span> e, dove abilitato,{" "}
          <span className="font-semibold text-emerald-300">Klarna</span>
        </div>
      </div>

      {/* Hero — consapevolezza, chiarezza, lead */}
      <section id="chi-siamo" className="scroll-mt-24 border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr,1fr] items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                GetNeuralOps — piattaforma di sicurezza per chi decide
              </p>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight text-slate-50 leading-tight">
                Cybersecurity: Non sai da dove iniziare?{" "}
                <span className="text-emerald-400">Inizia dalla verità.</span>
              </h1>
              <p className="mt-4 text-base text-slate-300 max-w-xl leading-relaxed">
                Ottieni un’analisi neutrale dei tuoi rischi reali. Smetti di sprecare tempo con consulenze poco
                chiare e scopri subito cosa serve davvero alla tua azienda.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/analisi-completa"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-colors"
                >
                  Analizza il mio rischio ora
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <span className="px-1 text-sm text-slate-400">oppure</span>
                <Link
                  href="/marketplace"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-colors"
                >
                  Esplora gli strumenti
                </Link>
              </div>
              <div className="mt-8">
                <NavShortcuts />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 bg-gradient-to-br from-emerald-500/25 via-slate-800/20 to-transparent blur-3xl opacity-70" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Link href="/marketplace" className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4 overflow-hidden block hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    Perimetro
                  </div>
                  <div className="mt-3 h-24 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900/80 ring-1 ring-slate-700/50 flex items-center justify-center">
                    <Shield className="h-12 w-12 text-emerald-300/90" aria-hidden />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">DNS, esposizione, servizi dimenticati</p>
                </Link>
                <Link href="/analisi-completa" className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4 overflow-hidden block hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Target className="h-4 w-4 text-amber-400" />
                    Priorità
                  </div>
                  <div className="mt-3 h-24 rounded-lg bg-gradient-to-br from-emerald-950/80 to-slate-900 ring-1 ring-emerald-500/20 flex items-center justify-center">
                    <Target className="h-12 w-12 text-amber-300/90" aria-hidden />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Score, gap, cosa sistemare prima</p>
                </Link>
              </div>
              <p className="mt-4 text-center text-sm text-slate-500">
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
              Roadmap di consapevolezza
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Prima di strumenti e “soluzioni”, chiarisci cosa vuoi scoprire.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Layers,
                title: "Le tue password aziendali sono in vendita nel Dark Web?",
                text: "Collegato a Executive Leak Check: individua esposizioni e priorità prima che diventino incidenti.",
              },
              {
                icon: Shield,
                title: "Il tuo dominio è protetto o i criminali possono inviare mail a tuo nome?",
                text: "Collegato a Mail Auth: verifica se la tua posta è protetta da spoofing (SPF/DKIM/DMARC).",
              },
              {
                icon: FileCheck,
                title: "Quali porte della tua rete sono visibili a un hacker in questo momento?",
                text: "Collegato a Ransomware Surface: capisci dove sei più esposto e cosa ridurre subito.",
              },
              {
                icon: Radar,
                title: "La tua azienda è realmente pronta per le sanzioni della normativa NIS2?",
                text: "Collegato a NIS2 Advisor: snapshot di gap e impatti per decidere cosa fare per primo.",
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
          <div className="mt-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <h3 className="text-xl font-bold text-emerald-400">Non sai da dove iniziare?</h3>
            <p className="mt-2 text-slate-300">Acquista lo Snapshot da 0,99€ per i primi dati certi, oppure richiedi il nostro Progetto Gratuito.</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/analisi-completa" className="rounded-lg bg-emerald-500 px-6 py-3 font-bold text-slate-950 hover:bg-emerald-400">Inizia dallo Snapshot (0,99€)</a>
              <a href="/assessment?plan=enterprise" className="rounded-lg border border-emerald-500 px-6 py-3 font-semibold text-emerald-500 hover:bg-emerald-500/10">Richiedi Progetto Gratuito</a>
            </div>
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
              economico e reputazionale</strong>. GetNeuralOps ti aiuta con autovalutazione,
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
              className="mt-4 inline-flex items-center gap-1 rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20"
            >
              Scopri il percorso guidato <ArrowRight className="h-4 w-4" />
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
          <div className="mt-8 flex flex-col items-center gap-2 text-center">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-500"
            >
              Vai al catalogo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-slate-500">
              (<Link href="/subscription" className="hover:text-emerald-400">Vedi prezzi e abbonamenti</Link>)
            </p>
          </div>
        </div>
      </section>

      <LandingTestimonials />

      {/* Pricing abbreviato */}
      <section id="pricing" className="scroll-mt-24 border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-950 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">Continuità e piani</h2>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                Pay-per-use nel catalogo, oppure abbonamenti con quote e funzioni estese — importi aggiornati sulla
                pagina prezzi.
              </p>
            </div>
            <Link
              href="/analisi-completa"
              className="inline-flex w-fit rounded-full border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              Scopri il percorso guidato completo
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Per iniziare</p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Valutazione</p>
              <p className="mt-2 text-xs text-slate-400">
                Accesso iniziale al portale con orientamento operativo, verifica base del bisogno e prima priorità consigliata.
              </p>
              <p className="mt-4 text-2xl font-semibold text-emerald-300">€ 0,99</p>
              <ul className="mt-3 space-y-2 text-xs text-slate-500">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  Report rapido sull&apos;esposizione pubblica del tuo dominio.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  Verifica immediata di 2 vulnerabilità critiche (es. configurazione mail e certificati).
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  Snapshot del rischio per capire se hai bisogno di un intervento urgente.
                </li>
              </ul>
            </div>
            <div className="relative rounded-2xl border border-emerald-500/60 bg-slate-950 p-5 text-sm text-slate-200 shadow-lg shadow-emerald-500/15">
              <div className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                Popolare
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Pro</p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Monitoraggio</p>
              <p className="mt-2 text-xs text-slate-400">
                Controllo continuativo, priorità aggiornate, suggerimenti di remediation e supporto per pianificare attività tecniche.
              </p>
              <p className="mt-4 text-2xl font-semibold text-emerald-300">€ 49,99 / mese</p>
              <p className="mt-2 text-xs text-slate-500">Compila il questionario Pro per ricevere un percorso consigliato.</p>
              <Link
                href="/assessment?plan=pro"
                className="mt-4 inline-flex rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Questionario Pro
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Enterprise</p>
              <p className="mt-2 text-lg font-semibold text-slate-50">Su misura</p>
              <p className="mt-2 text-xs text-slate-400">
                Assessment completo per contesti complessi, multi-sede e multi-fornitore, con roadmap specialistica e progetto dedicato.
              </p>
              <p className="mt-4 text-xs text-slate-500">Questionario esteso + analisi specialistica per proposta progettuale completa.</p>
              <Link
                href="/assessment?plan=enterprise"
                className="mt-4 inline-flex rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20"
              >
                Richiedi la tua consulenza
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="border-b border-slate-800 bg-slate-950 px-4 py-12">
        <div className="mx-auto max-w-6xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">Resta aggiornato</h2>
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

      <section id="assistenza" className="border-b border-slate-800 bg-slate-950/80 px-4 py-12">
        <div className="mx-auto max-w-6xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">Assistenza clienti</h2>
            <p className="mt-1 text-base text-slate-300">
              Se il chatbot non basta, apri un ticket e il team ti risponde su priorita tecniche, risultati e
              prossimi passi.
            </p>
          </div>
          <Link
            href="/helpdesk"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Apri assistenza
          </Link>
        </div>
      </section>
    </main>
  );
}
