import { Suspense } from "react";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <Suspense fallback={<p className="text-slate-400">Caricamento…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
