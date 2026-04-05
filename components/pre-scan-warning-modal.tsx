"use client";

type Props = {
  open: boolean;
  title?: string;
  body: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
};

export default function PreScanWarningModal({
  open,
  title = "Conferma prima dell’analisi",
  body,
  onConfirm,
  onCancel,
  confirmLabel = "Ho letto e confermo",
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Chiudi"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-amber-500/40 bg-slate-900 p-5 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-amber-200">{title}</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">{body}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
          >
            Annulla
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
