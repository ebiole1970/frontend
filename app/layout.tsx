import type { ReactNode } from "react";
import SiteFooter from "../components/site-footer";
import SiteChatbot from "../components/site-chatbot";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "GetNeuralOps — Cyber Risk & NIS2 Advisor",
  description:
    "GetNeuralOps: perimetro digitale, analisi cyber, readiness NIS2 e catalogo di 12 strumenti. Servizio BE FAST WEB S.R.L.S.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <SiteChatbot />
          </div>
        </Providers>
      </body>
    </html>
  );
}

