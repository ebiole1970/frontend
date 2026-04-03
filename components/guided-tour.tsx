"use client";

import { useState } from "react";

const STEPS = [
  "Benvenuto: qui trovi il tuo Cyber Risk Score.",
  "Avvia il Wizard per dominio, OSINT, infrastruttura e NIS2.",
  "Vai su Subscription per attivare monitoraggio mensile e alert.",
];

export default function GuidedTour() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm">
      <p className="font-semibold text-emerald-300">Guided Tour</p>
      <p className="mt-2 text-slate-200">{STEPS[index]}</p>
      <div className="mt-3 flex gap-2">
        <button
          className="rounded-md bg-slate-900 px-3 py-1 text-xs"
          onClick={() => setIndex((v) => Math.max(0, v - 1))}
        >
          Indietro
        </button>
        <button
          className="rounded-md bg-emerald-500 px-3 py-1 text-xs text-slate-950"
          onClick={() => {
            if (index < STEPS.length - 1) setIndex(index + 1);
            else setOpen(false);
          }}
        >
          {index < STEPS.length - 1 ? "Avanti" : "Chiudi"}
        </button>
      </div>
    </div>
  );
}

