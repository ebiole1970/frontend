"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function HelpdeskPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("Invio ticket in corso...");
    try {
      const resp = await fetch(`${apiBase}/api/v1/helpdesk/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });
      const data = await resp.json();
      if (data?.id) {
        setStatus(`Ticket creato con ID ${data.id}.`);
        setSubject("");
        setMessage("");
        return;
      }
      setStatus("Impossibile creare ticket.");
    } catch {
      setStatus("Errore durante invio ticket.");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Help Desk Cyber</h1>
      <p className="mt-2 text-sm text-slate-300">
        Area domande e risposte per clienti abbonati: supporto operativo su alert, esposizioni e priorita remediation.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="Email di contatto"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="Oggetto della richiesta"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          rows={5}
          placeholder="Descrivi la domanda o il problema"
        />
        <button type="submit" className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
          Invia ticket
        </button>
        {status ? <p className="text-xs text-slate-300">{status}</p> : null}
      </form>
    </main>
  );
}

