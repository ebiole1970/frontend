import Link from "next/link";
import { NavShortcuts } from "@/components/nav-shortcuts";

const PRIVACY_SNIPPET =
  "Per sicurezza e prevenzione di abusi, trattiamo log di accesso e indirizzi IP associati alle richieste di analisi, per il tempo necessario alla tutela legale; possono essere comunicati alle Autorità in caso di reati informatici.";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 px-4 py-8 text-xs text-slate-500">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <NavShortcuts />
          <p className="text-[11px] text-slate-600 sm:max-w-md">
            Su ogni pagina: torna alla home o apri il catalogo strumenti.
          </p>
        </div>
        <p className="leading-relaxed">{PRIVACY_SNIPPET}</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/marketplace" className="text-emerald-500/90 hover:text-emerald-400">
            Catalogo strumenti
          </Link>
          <Link href="/terms-of-service" className="text-emerald-500/90 hover:text-emerald-400">
            Termini di servizio
          </Link>
          <Link href="/privacy-policy" className="text-emerald-500/90 hover:text-emerald-400">
            Privacy e trattamento dati
          </Link>
          <Link href="/legal/rimborsi" className="text-emerald-500/90 hover:text-emerald-400">
            Rimborsi e crediti
          </Link>
        </nav>
        <p className="text-slate-600">
          © {new Date().getFullYear()} BE FAST WEB S.R.L.S. (P.IVA 12958700010) — CyberShield &amp; NIS2
          Advisor
        </p>
      </div>
    </footer>
  );
}
