"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const registered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      if (res.code === "email_not_verified") {
        setError(
          "Account non ancora attivato. Controlla la tua email e clicca sul link di conferma prima di accedere.",
        );
        return;
      }
      setError("Email o password non corretti.");
      return;
    }
    if (res?.url) {
      router.push(res.url);
      router.refresh();
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Accedi</h1>
      <p className="mt-1 text-sm text-slate-400">
        GetNeuralOps — CyberShield &amp; NIS2 Advisor
      </p>

      {registered && (
        <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Registrazione ricevuta. Ti abbiamo inviato un&apos;email: apri il link per attivare l&apos;account,
          poi potrai accedere da qui.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        {error && (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
        <label className="block text-xs text-slate-400">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            placeholder="nome@azienda.it"
          />
        </label>
        <label className="block text-xs text-slate-400">
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Accesso…" : "Accedi"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-400">
        Non hai un account?{" "}
        <Link href="/register" className="text-emerald-400 underline">
          Registrati
        </Link>
      </p>
      <p className="mt-2 text-center text-sm">
        <Link href="/" className="text-slate-500 hover:text-slate-300">
          ← Torna alla home
        </Link>
      </p>
    </>
  );
}
