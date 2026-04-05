import NextAuth from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const backend = (
  process.env.AUTH_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const res = await fetch(`${backend}/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const text = await res.text();
        if (!res.ok) {
          if (res.status === 403) {
            try {
              const j = JSON.parse(text) as { detail?: string };
              if (j?.detail === "ACCOUNT_NOT_VERIFIED") {
                const e = new CredentialsSignin();
                e.code = "email_not_verified";
                throw e;
              }
            } catch (err) {
              if (err instanceof CredentialsSignin) throw err;
            }
          }
          return null;
        }
        const user = JSON.parse(text) as {
          id: string;
          email: string;
          name: string | null;
        };
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (path.startsWith("/dashboard") || path.startsWith("/reports")) {
        return !!auth?.user;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
