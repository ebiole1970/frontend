"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import PreScanWarningModal from "../../components/pre-scan-warning-modal";
import GuidedTour from "../../components/guided-tour";

type PlanTier = "trial" | "starter" | "growth" | "business" | "enterprise";

type ScanResponse = {
  cyber_risk_score: number;
  nis2_readiness_score: number;
  estimated_sanction_eur: number;
  trial_masked: boolean;
  findings: {
    dns?: {
      spf_present?: boolean;
      dmarc_present?: boolean;
      dkim_hint_present?: boolean;
      mx_records?: string[];
      domain?: string;
    };
    infra?: {
      ips?: string[];
      open_ports?: Array<number | string>;
      critical_ports?: Array<number | string>;
      shodan_mocked?: boolean;
    };
    osint?: Record<string, unknown>;
    formula?: string;
  };
};

type ScanPolicy = {
  terms_version: string;
  privacy_version: string;
  authorization_notice: string;
  domain_verification_explanation: string;
  scan_validity_days: number;
  require_domain_verification: boolean;
  pre_scan_penal_warning: string;
  privacy_logging_notice: string;
  legal_entity_name: string;
};

type ChallengeInfo = {
  verification_id: string;
  domain: string;
  dns_txt_host: string;
  dns_txt_value: string;
  https_url: string;
  https_body_line: string;
  challenge_expires_at: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [toolFromMarketplace, setToolFromMarketplace] = useState<string | null>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const base = apiBase.replace(/\/$/, "");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tool");
    setToolFromMarketplace(t && t.trim() ? t.trim().slice(0, 64) : null);
  }, []);

  const [domain, setDomain] = useState("example.com");
  const [companyName, setCompanyName] = useState("La tua azienda Srl");
  const [annualRevenue, setAnnualRevenue] = useState<number>(1_000_000);
  const [nis2EssentialSubject, setNis2EssentialSubject] = useState(true);
  const [plan, setPlan] = useState<PlanTier>("trial");

  const [policy, setPolicy] = useState<ScanPolicy | null>(null);
  const [policyLoadError, setPolicyLoadError] = useState("");

  const [ackAuthorize, setAckAuthorize] = useState(false);

  const [challenge, setChallenge] = useState<ChallengeInfo | null>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [domainVerified, setDomainVerified] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("");

  const [running, setRunning] = useState(false);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [preScanOpen, setPreScanOpen] = useState(false);

  const [entitlement, setEntitlement] = useState<{
    tier?: string;
    scans_used_this_month?: number;
    scans_limit_per_month?: number | null;
    unlimited?: boolean;
    carnet_credits_available?: number;
  } | null>(null);
  const [carnetBalance, setCarnetBalance] = useState<{
    carnet_balance?: number;
    next_expires_at?: string | null;
    carnet_validity_days?: number;
  } | null>(null);

  const loadPolicy = useCallback(async () => {
    setPolicyLoadError("");
    try {
      const r = await fetch(`${base}/api/v1/scan/policy`);
      if (!r.ok) throw new Error(`Policy HTTP ${r.status}`);
      const j = (await r.json()) as ScanPolicy;
      setPolicy(j);
    } catch (e) {
      setPolicyLoadError(e instanceof Error ? e.message : "Impossibile caricare le policy.");
    }
  }, [base]);

  useEffect(() => {
    void loadPolicy();
  }, [loadPolicy]);

  useEffect(() => {
    const uid = session?.user?.id;
    const em = session?.user?.email;
    if (!uid && !em) {
      setEntitlement(null);
      setCarnetBalance(null);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const q = new URLSearchParams();
        if (em) q.set("email", em);
        if (uid) q.set("user_id", uid);
        const r = await fetch(`${base}/api/v1/stripe/entitlement?${q.toString()}`);
        if (r.ok && !cancelled) {
          const j = (await r.json()) as typeof entitlement;
          setEntitlement(j);
        }
      } catch {
        /* ignore */
      }
      try {
        if (!uid) {
          if (!cancelled) setCarnetBalance(null);
          return;
        }
        const r2 = await fetch(`${base}/api/v1/credits/balance?user_id=${encodeURIComponent(uid)}`);
        if (r2.ok && !cancelled) {
          const j2 = (await r2.json()) as typeof carnetBalance;
          setCarnetBalance(j2);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [base, session?.user?.id, session?.user?.email]);

  const sanctionPretty = useMemo(() => {
    if (!result?.estimated_sanction_eur) return "—";
    const v = result.estimated_sanction_eur;
    if (v >= 1_000_000) return `${Math.round(v / 1_000_000)}M EUR`;
    if (v >= 1_000) return `${Math.round(v / 1_000)}K EUR`;
    return `${v} EUR`;
  }, [result]);

  const requireDv = policy?.require_domain_verification !== false;

  async function requestDomainChallenge() {
    setChallengeLoading(true);
    setVerifyMsg("");
    setError("");
    try {
      const r = await fetch(`${base}/api/v1/scan/domain-challenge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain.trim() }),
      });
      const text = await r.text();
      if (!r.ok) {
        let msg = text || `HTTP ${r.status}`;
        try {
          const j = JSON.parse(text) as { detail?: string };
          if (typeof j.detail === "string") msg = j.detail;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }
      const j = JSON.parse(text) as ChallengeInfo;
      setChallenge(j);
      setVerificationId(j.verification_id);
      setDomainVerified(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore richiesta verifica.");
    } finally {
      setChallengeLoading(false);
    }
  }

  async function runVerifyDomain() {
    if (!verificationId) {
      setVerifyMsg("Genera prima la richiesta di verifica.");
      return;
    }
    setVerifyLoading(true);
    setVerifyMsg("");
    setError("");
    try {
      const r = await fetch(`${base}/api/v1/scan/verify-domain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verification_id: verificationId }),
      });
      const text = await r.text();
      let j: { detail?: string; ok?: boolean } = {};
      try {
        j = JSON.parse(text) as { detail?: string; ok?: boolean };
      } catch {
        throw new Error(text || `HTTP ${r.status}`);
      }
      if (!r.ok) {
        throw new Error(typeof j.detail === "string" ? j.detail : text || `HTTP ${r.status}`);
      }
      if (j.ok) {
        setDomainVerified(true);
        setVerifyMsg("Dominio verificato. Puoi avviare l’analisi.");
      }
    } catch (e) {
      setVerifyMsg(e instanceof Error ? e.message : "Verifica non riuscita.");
    } finally {
      setVerifyLoading(false);
    }
  }

  function openPreScanModal() {
    if (!policy) {
      setError("Policy non caricate.");
      return;
    }
    if (!ackAuthorize) {
      setError("Devi accettare la dichiarazione di autorizzazione.");
      return;
    }
    if (requireDv && !domainVerified) {
      setError("Completa la verifica del dominio (DNS o file HTTPS) prima dell’analisi.");
      return;
    }
    setError("");
    setPreScanOpen(true);
  }

  async function executeScanAfterWarning() {
    if (!policy) return;
    setPreScanOpen(false);
    setRunning(true);
    setError("");
    setResult(null);
    try {
      const body: Record<string, unknown> = {
        domain: domain.trim(),
        company_name: companyName,
        annual_revenue_eur: annualRevenue,
        nis2_essential_subject: nis2EssentialSubject,
        plan,
        acknowledge_authorized_scan: true,
        acknowledge_pre_scan_penal_warning: true,
        terms_version_accepted: policy.terms_version,
        privacy_version_accepted: policy.privacy_version,
      };
      if (requireDv && verificationId) {
        body.domain_verification_id = verificationId;
      }
      if (session?.user?.email) {
        body.requester_email = session.user.email;
      }
      if (session?.user?.id) {
        body.requester_user_id = session.user.id;
      }
      if (toolFromMarketplace) {
        body.tool_id = toolFromMarketplace;
      }

      const resp = await fetch(`${base}/api/v1/scan/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        let msg = `HTTP ${resp.status}`;
        try {
          const j = JSON.parse(text) as { detail?: string };
          if (typeof j.detail === "string") msg = j.detail;
        } catch {
          if (text) msg = text;
        }
        throw new Error(msg);
      }

      const data = (await resp.json()) as ScanResponse;
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante la scansione.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Dashboard CyberShield</h1>
        {status === "authenticated" && session?.user && (
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span>
              {session.user.email}
              {session.user.name ? ` · ${session.user.name}` : ""}
            </span>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-md border border-slate-600 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
            >
              Esci
            </button>
          </div>
        )}
      </div>
      <GuidedTour />

      {status === "authenticated" && (entitlement || carnetBalance) ? (
        <section className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 text-sm text-slate-200">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-emerald-400/90">
            Uso e crediti
          </h2>
          {entitlement ? (
            <p className="mt-2 text-xs text-slate-300">
              Piano: <strong className="text-slate-100">{entitlement.tier ?? "—"}</strong>
              {entitlement.unlimited ? (
                <> · scan: <strong className="text-slate-100">illimitati</strong> (fair use)</>
              ) : (
                <>
                  {" "}
                  · scan questo mese:{" "}
                  <strong className="text-slate-100">
                    {entitlement.scans_used_this_month ?? 0}
                    {entitlement.scans_limit_per_month != null
                      ? ` / ${entitlement.scans_limit_per_month}`
                      : ""}
                  </strong>
                </>
              )}
              {typeof entitlement.carnet_credits_available === "number" ? (
                <>
                  {" "}
                  · carnet disponibili:{" "}
                  <strong className="text-emerald-300">{entitlement.carnet_credits_available}</strong>
                </>
              ) : null}
            </p>
          ) : null}
          {carnetBalance ? (
            <p className="mt-2 text-xs text-slate-400">
              Saldo carnet (dettaglio):{" "}
              <strong className="text-slate-200">{carnetBalance.carnet_balance ?? 0}</strong> crediti
              {carnetBalance.next_expires_at ? (
                <>
                  {" "}
                  — prossima scadenza lotto:{" "}
                  {new Date(carnetBalance.next_expires_at).toLocaleDateString("it-IT")}
                </>
              ) : null}
              {carnetBalance.carnet_validity_days ? (
                <> · validità lotto: {carnetBalance.carnet_validity_days} giorni dall&apos;acquisto</>
              ) : null}
            </p>
          ) : null}
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            Se la quota mensile è finita, i consumi seguono quest&apos;ordine:{" "}
            <strong className="text-slate-400">acquisti singoli / bundle</strong>, poi{" "}
            <strong className="text-slate-400">carnet</strong>. Nessun toggle: il sistema usa il carnet se non hai altri
            crediti applicabili.
          </p>
          <p className="mt-2 text-[11px]">
            <Link href="/subscription" className="text-emerald-500 hover:text-emerald-400">
              Prezzi e carnet
            </Link>
            {" · "}
            <Link href="/legal/rimborsi" className="text-emerald-500 hover:text-emerald-400">
              Policy rimborsi
            </Link>
          </p>
        </section>
      ) : null}

      {toolFromMarketplace ? (
        <p className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-200/90">
          Selezione da catalogo:{" "}
          <code className="rounded bg-slate-900 px-1.5 py-0.5 text-emerald-300">{toolFromMarketplace}</code>{" "}
          — l&apos;audit registrerà questo tool insieme a IP e versioni policy.
        </p>
      ) : null}

      {policyLoadError ? (
        <p className="text-sm text-amber-400">{policyLoadError}</p>
      ) : null}

      {policy ? (
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300">
          <h2 className="text-sm font-semibold text-slate-200">Policy e responsabilità</h2>
          <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-slate-400">
            {policy.authorization_notice}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            {policy.privacy_logging_notice}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Versioni applicabili: Termini {policy.terms_version} · Privacy {policy.privacy_version}
          </p>
        </section>
      ) : null}

      <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <h2 className="text-sm font-semibold text-slate-200">Esegui Cyber Risk Check</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs text-slate-400">
            Dominio (apex, es. befastweb.it)
            <input
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setChallenge(null);
                setDomainVerified(false);
                setVerifyMsg("");
              }}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="azienda.it"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-slate-400">
            Azienda / Ragione sociale
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Ragione sociale"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-slate-400">
            Fatturato annuo (EUR)
            <input
              type="number"
              value={annualRevenue}
              onChange={(e) => setAnnualRevenue(Number(e.target.value))}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              min={0}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-slate-400">
            Piano
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as PlanTier)}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            >
              <option value="trial">trial</option>
              <option value="starter">starter</option>
              <option value="growth">growth</option>
              <option value="business">business</option>
              <option value="enterprise">enterprise</option>
            </select>
          </label>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            checked={nis2EssentialSubject}
            onChange={(e) => setNis2EssentialSubject(e.target.checked)}
          />
          Soggetto essenziale (policy NIS2)
        </label>

        {policy && requireDv ? (
          <div className="space-y-3 rounded-lg border border-slate-700/80 bg-slate-950/40 p-3">
            <h3 className="text-xs font-semibold text-slate-200">Verifica proprietà dominio</h3>
            <p className="text-xs text-slate-400">{policy.domain_verification_explanation}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void requestDomainChallenge()}
                disabled={challengeLoading}
                className="rounded-md border border-emerald-600/50 bg-emerald-950/40 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-900/40 disabled:opacity-50"
              >
                {challengeLoading ? "Invio…" : "1. Richiedi istruzioni verifica"}
              </button>
              <button
                type="button"
                onClick={() => void runVerifyDomain()}
                disabled={verifyLoading || !verificationId}
                className="rounded-md border border-slate-600 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 disabled:opacity-50"
              >
                {verifyLoading ? "Verifica…" : "2. Ho configurato DNS / file — verifica"}
              </button>
            </div>
            {challenge ? (
              <div className="space-y-2 font-mono text-[11px] text-slate-300">
                <p>
                  <span className="text-slate-500">TXT host:</span> {challenge.dns_txt_host}
                </p>
                <p className="break-all">
                  <span className="text-slate-500">TXT value:</span> {challenge.dns_txt_value}
                </p>
                <p className="break-all">
                  <span className="text-slate-500">HTTPS file:</span> {challenge.https_url}
                </p>
                <p className="break-all text-slate-400">Contenuto (una riga): {challenge.https_body_line}</p>
                <p className="text-slate-500">
                  Scadenza richiesta: {challenge.challenge_expires_at}
                </p>
              </div>
            ) : null}
            {domainVerified ? (
              <p className="text-xs text-emerald-300">{verifyMsg || "Dominio verificato."}</p>
            ) : verifyMsg ? (
              <p className="text-xs text-rose-300">{verifyMsg}</p>
            ) : null}
          </div>
        ) : policy && !requireDv ? (
          <p className="text-xs text-amber-400">
            Verifica dominio disattivata in ambiente di sviluppo (backend). Non usare in produzione senza
            protezioni.
          </p>
        ) : null}

        <label className="flex cursor-pointer items-start gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            checked={ackAuthorize}
            onChange={(e) => setAckAuthorize(e.target.checked)}
            className="mt-1 rounded border-slate-600"
          />
          <span>
            Dichiaro di essere autorizzato ad analizzare il dominio indicato e accetto Termini (
            {policy?.terms_version ?? "—"}) e Privacy ({policy?.privacy_version ?? "—"}) come sopra.
          </span>
        </label>

        <button
          type="button"
          onClick={() => openPreScanModal()}
          disabled={running || !policy}
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          {running ? "Analisi in corso..." : "Esegui analisi"}
        </button>

        {error ? <p className="text-xs text-rose-400">{error}</p> : null}
      </section>

      {policy ? (
        <PreScanWarningModal
          open={preScanOpen}
          body={policy.pre_scan_penal_warning}
          onCancel={() => setPreScanOpen(false)}
          onConfirm={() => void executeScanAfterWarning()}
        />
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <p className="text-xs text-slate-400">Cyber Risk Score</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">
            {result ? `${result.cyber_risk_score}/100` : "—"}
          </p>
        </article>
        <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <p className="text-xs text-slate-400">NIS2 Readiness</p>
          <p className="mt-2 text-3xl font-semibold text-amber-300">
            {result ? `${result.nis2_readiness_score}/100` : "—"}
          </p>
        </article>
        <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <p className="text-xs text-slate-400">Sanzione Stimata</p>
          <p className="mt-2 text-3xl font-semibold text-rose-300">{result ? sanctionPretty : "—"}</p>
        </article>
      </section>

      {result ? (
        <section className="grid gap-4 md:grid-cols-2">
          <article className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <h3 className="text-sm font-semibold text-slate-200">DNS</h3>
            <p className="text-xs text-slate-300">Dominio: {result.findings.dns?.domain || domain}</p>
            <p className="text-xs text-slate-300">
              SPF: {result.findings.dns?.spf_present ? "OK" : "MISSING"}
            </p>
            <p className="text-xs text-slate-300">
              DMARC: {result.findings.dns?.dmarc_present ? "OK" : "MISSING"}
            </p>
            <p className="text-xs text-slate-300">
              DKIM (hint): {result.findings.dns?.dkim_hint_present ? "PRESENT" : "MISSING"}
            </p>
          </article>

          <article className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <h3 className="text-sm font-semibold text-slate-200">Infrastruttura / Porte</h3>
            <p className="text-xs text-slate-300">
              Shodan: {result.findings.infra?.shodan_mocked ? "mock (API non configurata)" : "live"}
            </p>
            <p className="text-xs text-slate-300">
              Porte aperte: {String(result.findings.infra?.open_ports || []).slice(0, 120)}
            </p>
            <p className="text-xs text-slate-300">
              Porte critiche: {String(result.findings.infra?.critical_ports || []).slice(0, 120)}
            </p>
          </article>
        </section>
      ) : null}
    </main>
  );
}
