"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { NavShortcuts } from "@/components/nav-shortcuts";

type Question = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
};

const PRO_QUESTIONS: Question[] = [
  { id: "company", label: "Ragione sociale / organizzazione", required: true },
  { id: "sector", label: "Settore e attivita principale", required: true },
  { id: "employees", label: "Numero dipendenti (stima)" },
  { id: "it_stack", label: "Infrastruttura IT attuale (sintesi)", required: true },
  { id: "top_risk", label: "Rischio prioritario percepito (es. phishing, ransomware, leak)", required: true },
  { id: "cloud_use", label: "Uso cloud (nessuno / base / avanzato)" },
  { id: "current_tools", label: "Strumenti di sicurezza gia presenti" },
  { id: "goal_90d", label: "Obiettivo da raggiungere nei prossimi 90 giorni", required: true },
];

const ENTERPRISE_QUESTIONS: Question[] = [
  { id: "org_context", label: "Descrizione organizzazione (pubblico/privato, gruppo o autonoma)", required: true },
  { id: "legal_scope", label: "Ragione sociale dei soggetti inclusi nell'assessment", required: true },
  { id: "nis2_status", label: "Stato registrazione/qualifica NIS2 (se presente)" },
  { id: "revenue", label: "Fatturato annuo indicativo" },
  { id: "employees", label: "Numero dipendenti", required: true },
  { id: "ateco", label: "Settore, codici ATECO e attivita principali", required: true },
  { id: "infrastructure", label: "Descrizione infrastruttura IT (on-prem, cloud, sedi)" , required: true},
  { id: "network_geo", label: "Distribuzione geografica e rete (WAN/MAN, ingressi Internet)" },
  { id: "it_team", label: "Persone dedicate ai sistemi IT" },
  { id: "security_roles", label: "Figure presenti: CIO/CISO/DPO/Privacy/Compliance/Procurement/HR" },
  { id: "standards", label: "Modelli/certificazioni (es. ISO 27001, ISO 9001)" },
  { id: "dark_web_assets", label: "Dark web assessment: numero asset (domini, IP pubblici, VIP, BIN)" },
  { id: "compromise_scope", label: "Compromise assessment: client/server/subnet/AD/DC/EDR-XDR" },
  { id: "vuln_scope", label: "Vulnerability assessment: lista o numero IP pubblici" },
  { id: "stakeholders", label: "Gap analysis: numero stakeholder e operativi da intervistare" },
  { id: "fornitori_tlc", label: "Fornitori attuali: connettivita, backup, firewall, centralino, email, e-commerce" },
  { id: "business_needs", label: "Obiettivi business e vincoli (tempi, budget, compliance)", required: true },
];

export default function AssessmentPage() {
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
  const [mode, setMode] = useState<"pro" | "enterprise">("pro");

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    setMode(qs.get("plan") === "enterprise" ? "enterprise" : "pro");
  }, []);

  const questions = useMemo(() => (mode === "enterprise" ? ENTERPRISE_QUESTIONS : PRO_QUESTIONS), [mode]);
  const [email, setEmail] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  const title = mode === "enterprise" ? "Questionario Enterprise" : "Questionario Pro";

  function setField(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("Invio in corso...");

    const missingRequired = questions.some((q) => q.required && !(values[q.id] || "").trim());
    if (!email.trim() || missingRequired) {
      setStatus("Compila email e tutti i campi obbligatori.");
      return;
    }

    const lines = questions.map((q) => `- ${q.label}: ${values[q.id] || "(non compilato)"}`);
    const payload = {
      email: email.trim(),
      subject: `Questionario ${mode.toUpperCase()} compilato`,
      message: `Piano: ${mode}\n\n${lines.join("\n")}`,
    };

    try {
      const resp = await fetch(`${apiBase}/api/v1/helpdesk/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await resp.json()) as { id?: number };
      if (data?.id) {
        setStatus(`Questionario inviato correttamente. Ticket ID ${data.id}.`);
        return;
      }
      setStatus("Invio non completato. Riprova tra poco.");
    } catch {
      setStatus("Errore di rete durante l'invio.");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <NavShortcuts className="mb-6" />
      <h1 className="text-2xl font-semibold text-slate-50">{title}</h1>
      <p className="mt-2 text-sm text-slate-300">
        {mode === "enterprise"
          ? "Compila il profilo completo per un assessment specialistico e una proposta progettuale su misura."
          : "Compila il profilo rapido per ricevere il percorso Pro piu adatto alle tue priorita operative."}
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Vuoi cambiare percorso?{" "}
        <Link
          href={mode === "enterprise" ? "/assessment?plan=pro" : "/assessment?plan=enterprise"}
          className="text-emerald-400 hover:text-emerald-300"
        >
          Passa a {mode === "enterprise" ? "Pro" : "Enterprise"}
        </Link>
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
        <div>
          <label className="text-sm text-slate-300">Email di contatto *</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            placeholder="nome@azienda.it"
          />
        </div>

        {questions.map((q) => (
          <div key={q.id}>
            <label className="text-sm text-slate-300">
              {q.label}
              {q.required ? " *" : ""}
            </label>
            <textarea
              value={values[q.id] || ""}
              onChange={(e) => setField(q.id, e.target.value)}
              rows={3}
              placeholder={q.placeholder || "Inserisci la risposta"}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            />
          </div>
        ))}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Invia questionario
          </button>
          <Link
            href="/helpdesk"
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
          >
            Apri assistenza
          </Link>
        </div>

        {status ? <p className="text-sm text-slate-300">{status}</p> : null}
      </form>
    </main>
  );
}
