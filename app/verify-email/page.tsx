import { Suspense } from "react";

import { VerifyEmailClient } from "./verify-client";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-md px-4 py-16">
          <p className="text-sm text-slate-400">Caricamento…</p>
        </main>
      }
    >
      <VerifyEmailClient />
    </Suspense>
  );
}
