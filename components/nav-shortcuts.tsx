import Link from "next/link";

/** Doppia navigazione richiesta: sempre accessibili Home e Catalogo (route `/marketplace`). */
export function NavShortcuts({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      aria-label="Navigazione rapida sito"
    >
      <Link
        href="/"
        className="inline-flex items-center rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-emerald-500/50 hover:text-emerald-300"
      >
        ← Home
      </Link>
      <Link
        href="/marketplace"
        className="inline-flex items-center rounded-lg border border-emerald-600/50 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-950/70"
      >
        Catalogo
      </Link>
    </div>
  );
}
