import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <Suspense fallback={<p className="text-slate-400">Caricamento…</p>}>
        <LoginForm />
      </Suspense>
      <p className="mt-4 text-center text-sm text-slate-400">
        Non sei registrato?{" "}
        <Link href="/register" className="font-semibold text-emerald-400 hover:text-emerald-300">
          Registrati
        </Link>
      </p>
    </main>
  );
}
