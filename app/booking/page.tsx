import { NavShortcuts } from "@/components/nav-shortcuts";

export default function BookingPage() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com/your-handle/consulenza-cyber";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <NavShortcuts className="mb-8" />
      <h1 className="text-2xl font-semibold">Prenota una consulenza con GetNeuralOps</h1>
      <p className="mt-2 text-sm text-slate-300">
        Sessione strategica per definire remediation, priorità e piano operativo sul tuo perimetro cyber e NIS2.
      </p>
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <a className="text-emerald-300 underline" href={calendlyUrl} target="_blank">
          Apri Calendly e prenota
        </a>
      </div>
    </main>
  );
}

