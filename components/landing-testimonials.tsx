import { Quote } from "lucide-react";

const ITEMS = [
  {
    tool: "Email Spoofing Check",
    quote:
      "In mezza giornata abbiamo capito perché le nostre mail finivano in spam e cosa chiedere al fornitore mail. Chiaro e operativo.",
    name: "Laura B.",
    role: "Responsabile IT",
    company: "Logistica Nord Ovest S.r.l.",
  },
  {
    tool: "NIS2 Quick Check",
    quote:
      "Portato in riunione il punteggio e i gap: il CDA ha finalmente un quadro numerico, non solo slide sulla norma.",
    name: "Marco V.",
    role: "Compliance",
    company: "Servizi Industriali Veneto S.p.A.",
  },
  {
    tool: "Brand Protector",
    quote:
      "Abbiamo trovato due domini typosquatting che non avevamo mappato. Utile per legal e marketing nello stesso report.",
    name: "Elena F.",
    role: "Marketing & brand",
    company: "Retail Food Partners S.r.l.",
  },
  {
    tool: "Shadow IT Hunter",
    quote:
      "Emergevano servizi esposti che non c’erano nell’inventario. Priorità sistemate in roadmap con il fornitore.",
    name: "Andrea P.",
    role: "CISO (PMI)",
    company: "Techmech Components S.r.l.",
  },
  {
    tool: "Executive Leak",
    quote:
      "Check mirato sui vertici: ci ha dato la giustificazione per MFA e formazione senza allarmismi inutili.",
    name: "Giulia R.",
    role: "HR & security awareness",
    company: "Finanza & Co. Advisory S.r.l.",
  },
  {
    tool: "Encryption Check",
    quote:
      "Certificati e TLS in un colpo solo: abbiamo chiuso due vulnerabilità di configurazione prima del rinnovo hosting.",
    name: "Paolo S.",
    role: "IT Operations",
    company: "Manufacturing Delta S.p.A.",
  },
];

export function LandingTestimonials() {
  return (
    <section id="social-proof" className="scroll-mt-24 border-b border-slate-800 bg-slate-950/60">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-50">TESTIMONIANZE</h2>
          <p className="mt-2 text-sm text-slate-400">
            Esperienze clienti sull&apos;uso pratico dei nostri strumenti in contesti reali di sicurezza e compliance.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((t) => (
            <blockquote
              key={t.company + t.tool}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-emerald-500/25"
            >
              <Quote className="h-8 w-8 text-emerald-500/40" aria-hidden />
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-500/80">
                {t.tool}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-500">
                <p className="font-medium text-slate-400">{t.name}</p>
                <p>
                  {t.role} · {t.company}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
