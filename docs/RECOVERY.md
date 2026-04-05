# Ripristino locale (crash / nuovo PC)

1. `git pull` in questo repo.
2. Copia `.env.example` → `.env.local` e compila (mai committare `.env.local`).
3. `npm install` poi `npm run dev` (porta **3001** se usi quella negli script).
4. **`NEXT_PUBLIC_API_BASE_URL`** = URL del backend (es. `http://127.0.0.1:8001`).
5. Stato progetto completo e checklist: vedi **`backend/docs/PROJECT_STATE.md`** nel repo backend (o `PROJECT_STATE.md` nella cartella root CyberShield).
