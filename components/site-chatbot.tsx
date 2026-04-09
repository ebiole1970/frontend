"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { answerFromFaq, CHATBOT_COMMERCIAL_DISCLAIMER } from "@/lib/chatbot-kb";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const WELCOME_MESSAGE =
  "Ciao, sono l'assistente GetNeuralOps. Posso aiutarti su tool, risultati, pagamenti, rimborsi, policy e funzionamento del portale.";

export default function SiteChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: WELCOME_MESSAGE }]);

  const canSend = useMemo(() => input.trim().length > 1, [input]);

  const onSend = () => {
    const question = input.trim();
    if (question.length <= 1) return;

    const reply = answerFromFaq(question);
    setMessages((prev) => [...prev, { role: "user", text: question }, { role: "assistant", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-[min(92vw,24rem)] rounded-2xl border border-slate-700 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-emerald-300">Assistente GetNeuralOps</p>
              <p className="text-xs text-slate-400">Informazioni su prodotti, policy e percorso d'acquisto</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-slate-700 p-1.5 text-slate-400 hover:text-slate-200"
              aria-label="Chiudi chatbot"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((message, idx) => (
              <div
                key={`${message.role}-${idx}`}
                className={
                  message.role === "assistant"
                    ? "mr-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-slate-200"
                    : "ml-8 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? onSend() : undefined)}
                placeholder="Es. Cosa fa il tool Email Spoofing?"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onSend}
                disabled={!canSend}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-3 text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Invia messaggio"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              {CHATBOT_COMMERCIAL_DISCLAIMER}
            </p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-300 shadow-lg shadow-emerald-500/20 hover:bg-emerald-500/25"
        >
          <MessageCircle className="h-4 w-4" />
          Chat prodotti
        </button>
      )}
    </div>
  );
}
