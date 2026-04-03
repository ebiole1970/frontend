"use client";

import { useMemo, useState } from "react";
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

export default function DashboardPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const [domain, setDomain] = useState("example.com");
  const [companyName, setCompanyName] = useState("Be Fastweb Srls");
  const [annualRevenue, setAnnualRevenue] = useState<number>(1_000_000);
  const [nis2EssentialSubject, setNis2EssentialSubject] = useState(true);
  const [plan, setPlan] = useState<PlanTier>("trial");

  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<ScanResponse | null>(null);

  const sanctionPretty = useMemo(() => {
    if (!result?.estimated_sanction_eur) return "—";
    const v = result.estimated_sanction_eur;
    if (v >= 1_000_000) return `${Math.round(v / 1_000_000)}M EUR`;
    if (v >= 1_000) return `${Math.round(v / 1_000)}K EUR`;
    return `${v} EUR`;
  }, [result]);

  async function runScan() {
    setRunning(true);
    setError("");
    setResult(null);
    try {
      const resp = await fetch(`${apiBase}/api/v1/scan/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          company_name: companyName,
          annual_revenue_eur: annualRevenue,
          nis2_essential_subject: nis2EssentialSubject,
          plan,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(`HTTP ${resp.status}${text ? `: ${text}` : ""}`);
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
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard CyberShield</h1>
      <GuidedTour />

      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-4">
        <h2 className="text-sm font-semibold text-slate-200">Esegui Cyber Risk Check</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs text-slate-400">
            Dominio
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
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
              placeholder="Be Fastweb Srls"
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

        <button
          type="button"
          onClick={runScan}
          disabled={running}
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          {running ? "Analisi in corso..." : "Esegui analisi"}
        </button>

        {error ? <p className="text-xs text-rose-400">{error}</p> : null}
      </section>

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
          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-2">
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

          <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-slate-200">Infrastruttura / Porte</h3>
            <p className="text-xs text-slate-300">
              Shodan: {result.findings.infra?.shodan_mocked ? "mock (API non configurata)" : "live"}
            </p>
            <p className="text-xs text-slate-300">Porte aperte: {String(result.findings.infra?.open_ports || []).slice(0, 120)}</p>
            <p className="text-xs text-slate-300">
              Porte critiche: {String(result.findings.infra?.critical_ports || []).slice(0, 120)}
            </p>
          </article>
        </section>
      ) : null}
    </main>
  );
}

