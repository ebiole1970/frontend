"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiBase =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "http://127.0.0.1:8000";

const turnstileSiteKey =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) || "";

/** Fallback se l’API non risponde (allineare a `legal_texts.py`). */
const FALLBACK_LAWFUL_TEXT =
  "Dichiaro di aver letto i Termini di Servizio e accetto che l'utilizzo del software di analisi (servizio reso da BE FAST WEB S.R.L.S., P.IVA 12958700010, con sede in Via Asti 37, 10131 Torino) è consentito esclusivamente per domini di cui sono titolare o per i quali ho ricevuto esplicita autorizzazione scritta dal legittimo proprietario. Sono consapevole delle responsabilità penali derivanti dall'accesso abusivo a sistemi informatici ai sensi dell'Art. 615-ter c.p. e dichiaro che l'uso del servizio non è volto alla commissione di reati previsti dal D.Lgs. 231/2001.";

const FALLBACK_UNAUTHORIZED_PENAL_TEXT =
  "Sono consapevole che avviare analisi di sicurezza su domini per i quali non sono titolare o non dispongo di esplicita autorizzazione può integrare il reato di accesso abusivo a sistema informatico (Art. 615-ter c.p.) e ulteriori profili di responsabilità penale e civile. Assumo ogni responsabilità per un uso conforme alla legge, manlevando BE FAST WEB S.R.L.S. da ogni pretesa di terzi derivante da accessi non autorizzati effettuati tramite le mie credenziali.";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmActivation, setConfirmActivation] = useState(false);
  const [acknowledgeLawfulUse, setAcknowledgeLawfulUse] = useState(false);
  const [acknowledgeUnauthorizedPenal, setAcknowledgeUnauthorizedPenal] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [blockConsumerEmail, setBlockConsumerEmail] = useState<boolean | null>(null);
  const [lawfulUseText, setLawfulUseText] = useState<string>(FALLBACK_LAWFUL_TEXT);
  const [unauthorizedPenalText, setUnauthorizedPenalText] = useState<string>(FALLBACK_UNAUTHORIZED_PENAL_TEXT);

  useEffect(() => {
    const base = apiBase.replace(/\/$/, "");
    void fetch(`${base}/api/v1/auth/registration-policy`)
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (
          j: {
            block_consumer_email?: boolean;
            lawful_use_checkbox_text?: string;
            unauthorized_analysis_penal_checkbox_text?: string;
          } | null,
        ) => {
          if (j && typeof j.block_consumer_email === "boolean") {
            setBlockConsumerEmail(j.block_consumer_email);
          } else {
            setBlockConsumerEmail(false);
          }
          if (j && typeof j.lawful_use_checkbox_text === "string" && j.lawful_use_checkbox_text) {
            setLawfulUseText(j.lawful_use_checkbox_text);
          }
          if (
            j &&
            typeof j.unauthorized_analysis_penal_checkbox_text === "string" &&
            j.unauthorized_analysis_penal_checkbox_text
          ) {
            setUnauthorizedPenalText(j.unauthorized_analysis_penal_checkbox_text);
          }
        },
      )
      .catch(() => setBlockConsumerEmail(false));
  }, []);

  const needsTurnstile = Boolean(turnstileSiteKey);
  const canSubmit =
    confirmActivation &&
    acknowledgeLawfulUse &&
    acknowledgeUnauthorizedPenal &&
    (!needsTurnstile || (turnstileToken && turnstileToken.length > 0));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!confirmActivation) {
      setError("Devi confermare di voler attivare l'account.");
      return;
    }
    if (!acknowledgeLawfulUse) {
      setError("Devi accettare i Termini di servizio e la dichiarazione su uso lecito (Art. 615-ter c.p.).");
      return;
    }
    if (!acknowledgeUnauthorizedPenal) {
      setError(
        "Devi confermare di aver compreso la responsabilità penale per analisi di sicurezza non autorizzate.",
      );
      return;
    }
    if (needsTurnstile && !turnstileToken) {
      setError("Completa la verifica CAPTCHA.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiBase.replace(/\/$/, "")}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          name: name.trim() || undefined,
          confirm_activation: true,
          acknowledge_lawful_use_terms: true,
          acknowledge_unauthorized_analysis_penal: true,
          turnstile_token: turnstileToken || undefined,
        }),
      });
      const text = await res.text();
      if (!res.ok) {
        let msg = "Registrazione non riuscita.";
        try {
          const j = JSON.parse(text) as { detail?: unknown };
          const d = j.detail;
          if (typeof d === "string") msg = d;
          else if (Array.isArray(d))
            msg = d
              .map((item) =>
                typeof item === "object" && item && "msg" in item
                  ? String((item as { msg: string }).msg)
                  : String(item),
              )
              .join(", ");
        } catch {
          if (text) msg = text;
        }
        throw new Error(msg);
      }
      router.push("/login?registered=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold">Crea un account</h1>
      <p className="mt-1 text-sm text-slate-400">Minimo 8 caratteri per la password.</p>

      {blockConsumerEmail ? (
        <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
          È richiesto un indirizzo email <strong>sul dominio della tua organizzazione</strong> (es.{" "}
          <span className="font-mono text-xs">nome@azienda.it</span>). Gli indirizzi su Gmail, Outlook,
          Yahoo e altri provider generici non sono accettati.
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        {error && (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
        <label className="block text-xs text-slate-400">
          Nome (opzionale)
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            placeholder="Mario Rossi"
          />
        </label>
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
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
          />
        </label>

        {needsTurnstile && (
          <div className="flex justify-center pt-1">
            <Turnstile
              siteKey={turnstileSiteKey}
              onSuccess={(t) => setTurnstileToken(t)}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
            />
          </div>
        )}

        <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={acknowledgeLawfulUse}
            onChange={(e) => setAcknowledgeLawfulUse(e.target.checked)}
            className="mt-1 rounded border-slate-600"
          />
          <span className="text-xs leading-relaxed">
            {lawfulUseText}{" "}
            <Link href="/terms-of-service" className="text-emerald-400 underline">
              Termini di servizio
            </Link>
            .
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={acknowledgeUnauthorizedPenal}
            onChange={(e) => setAcknowledgeUnauthorizedPenal(e.target.checked)}
            className="mt-1 rounded border-slate-600"
          />
          <span className="text-xs leading-relaxed text-amber-100/90">{unauthorizedPenalText}</span>
        </label>

        <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={confirmActivation}
            onChange={(e) => setConfirmActivation(e.target.checked)}
            className="mt-1 rounded border-slate-600"
          />
          <span>
            Confermo di voler registrare e attivare il mio account CyberShield e di aver preso visione
            che l&apos;accesso sarà possibile dopo la conferma via email.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !canSubmit}
          className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Registrazione…" : "Registrati"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-400">
        Hai già un account?{" "}
        <Link href="/login" className="text-emerald-400 underline">
          Accedi
        </Link>
      </p>
    </main>
  );
}
