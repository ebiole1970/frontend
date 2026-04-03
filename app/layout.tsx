import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "CyberShield & NIS2 Advisor",
  description:
    "Piattaforma SaaS per la valutazione del rischio cyber esterno e della conformità NIS2.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}

