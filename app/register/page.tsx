export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold">Registrazione</h1>
      <form className="mt-6 space-y-3 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="Ragione sociale"
        />
        <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Email" />
        <input
          type="password"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="Password"
        />
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" />
          Confermo autorizzazione scan su asset aziendali di cui ho disponibilita.
        </label>
        <button className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
          Crea account
        </button>
      </form>
    </main>
  );
}

