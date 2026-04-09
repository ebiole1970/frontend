import type { ReactNode } from "react";

export type LandingPurchaseJourneyProps = {
  /** Nome dello strumento (pagina prodotto); se assente, esempio generico sulla home. */
  toolName?: string;
  /** Anteprima passo 3: stile “mail” solo per tool SPF/DKIM; altrimenti metriche generiche. */
  resultVariant?: "mail" | "generic";
  /** Nasconde titolo + sottotitolo (es. se ripetuti altrove). */
  hideHeading?: boolean;
  className?: string;
};

/**
 * Sequenza visiva “dopo l’acquisto”: UI simulate con dati di esempio (nessun dato reale).
 */
export function LandingPurchaseJourney({
  toolName,
  resultVariant = "mail",
  hideHeading = false,
  className = "",
}: LandingPurchaseJourneyProps) {
  const instrumentLabel = toolName?.trim() || "es. Email Spoofing Check";

  return (
    <div className={`space-y-8 ${className}`} id="mini-guida-visiva">
      {!hideHeading ? (
        <div>
          <h3 className="text-xl font-semibold text-slate-100">Cosa vedi dopo l’acquisto — mini guida visiva</h3>
          <p className="mt-1 text-base text-slate-400 max-w-3xl">
            Esempi illustrativi dell’interfaccia: dominio e metriche sono inventati, mostrano solo il tipo di
            schermate e informazioni che riceverai
            {toolName ? ` con uno strumento come «${toolName}».` : "."}
          </p>
        </div>
      ) : null}

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <JourneyPanel
          step={1}
          title="Inserisci il dominio"
          caption="Dopo il checkout, dalla dashboard indichi il dominio da analizzare (solo se ne hai titolarità o autorizzazione)."
        >
          <div className="rounded-lg border border-slate-700 bg-slate-950/80 p-3 font-mono text-xs sm:text-sm text-slate-300">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">Dominio target</p>
            <p className="mt-1 text-emerald-400/90">contoso-esempio.it</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
                Strumento: {instrumentLabel}
              </span>
            </div>
            <div className="mt-4 flex h-8 items-center justify-center rounded border border-dashed border-slate-600 text-[11px] text-slate-500">
              Verifica dominio (DNS / file)
            </div>
          </div>
        </JourneyPanel>

        <JourneyPanel
          step={2}
          title="Verifica e pre-scan"
          caption="Confermi i termini e il perimetro: l’app registra la richiesta per audit."
        >
          <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span>Stato</span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-amber-300">In coda</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-500">Pre-scan: policy, consensi, IP richiedente</p>
          </div>
        </JourneyPanel>

        <JourneyPanel
          step={3}
          title="Risultati in dashboard"
          caption={
            resultVariant === "mail"
              ? "Punteggi, alert e dettagli tecnici sintetici (esempio SPF, DKIM, DMARC per strumenti mail)."
              : "Indicatori sintetici, priorità e note operative (contenuto dipende dallo strumento scelto)."
          }
        >
          {resultVariant === "mail" ? (
            <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>SPF</span>
                <span className="text-emerald-400">OK</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>DKIM</span>
                <span className="text-amber-300">Attenzione</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>DMARC</span>
                <span className="text-slate-400">p=none</span>
              </div>
              <div className="mt-2 border-t border-slate-800 pt-2 text-[11px] text-slate-500">
                Priorità: allineare DKIM con il provider mail
              </div>
            </div>
          ) : (
            <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Stato analisi</span>
                <span className="text-emerald-400">Completata</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Priorità</span>
                <span className="text-amber-300">Media</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Elementi evidenziati</span>
                <span className="text-slate-400">7</span>
              </div>
              <div className="mt-2 border-t border-slate-800 pt-2 text-[11px] text-slate-500">
                Prossimo passo: rivedere le voci in evidenza e assegnare owner
              </div>
            </div>
          )}
        </JourneyPanel>

        <JourneyPanel
          step={4}
          title="Prossimi passi"
          caption="Export o sintesi per il team; da qui puoi aprire un ticket o prenotare consulenza."
        >
          <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-xs sm:text-sm">
            <button
              className="w-full rounded border border-emerald-500/40 bg-emerald-500/10 py-2 text-emerald-300"
              type="button"
              disabled
            >
              Scarica sintesi PDF
            </button>
            <button className="w-full rounded border border-slate-600 py-2 text-slate-400" type="button" disabled>
              Richiedi consulenza
            </button>
            <p className="text-center text-[11px] text-slate-600">Pulsanti reali attivi dopo login</p>
          </div>
        </JourneyPanel>
      </div>
    </div>
  );
}

function JourneyPanel({
  step,
  title,
  caption,
  children,
}: {
  step: number;
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 rounded-t-lg border border-b-0 border-slate-700 bg-slate-800/90 px-2 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/90" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
        <span className="ml-auto text-[11px] text-slate-500">anteprima</span>
      </div>
      <div className="flex-1 rounded-b-lg border border-slate-700 bg-slate-900/95 p-3">
        <p className="text-[11px] font-semibold text-emerald-400/90">Passo {step}</p>
        <p className="mt-1 text-sm font-medium text-slate-100">{title}</p>
        <p className="mt-1 text-sm leading-snug text-slate-400">{caption}</p>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
