import { TOOL_DETAILS_FALLBACK } from "@/lib/marketplace-tool-details-fallback";

/** Campi base sempre presenti (card compatte). */
export type MarketplaceToolBase = {
  id: string;
  name: string;
  focus: string;
  hook: string;
  consulting_goal: string;
};

export type MarketplaceToolFull = MarketplaceToolBase & {
  short_description: string;
  price_eur_one_shot: number;
  bundle_price_eur: number;
  guide_what_it_does: string;
  guide_activities: string[];
  guide_immediate_result: string;
  guide_pdf_email: string | null;
  has_pdf_option: boolean;
};

export type MarketplaceBundle = {
  id: string;
  title: string;
  tool_ids: string[];
  price_eur: number;
  checkout_kind: "bundle_15";
  why: string;
};

const ONE_SHOT_EUR = 10;
const BUNDLE_EUR = 15;

const _BASE: MarketplaceToolBase[] = [
  {
    id: "dark_exec",
    name: "Executive Leak",
    focus: "Credential & breach exposure vertici",
    hook: "Le password personali dei tuoi dirigenti sono in vendita? Proteggi il vertice aziendale.",
    consulting_goal: "Bonifica profili VIP",
  },
  {
    id: "shadow_it",
    name: "Shadow IT Hunter",
    focus: "Superficie d'attacco nascosta",
    hook: "Ci sono server attivi a tua insaputa? Trova le porte d'accesso dimenticate.",
    consulting_goal: "Censimento asset IT",
  },
  {
    id: "nis2_gap",
    name: "NIS2 Quick Check",
    focus: "Conformità direttiva NIS2",
    hook: "Sei pronto per la nuova direttiva? Calcola il tuo grado di conformità in pochi minuti.",
    consulting_goal: "Assessment NIS2",
  },
  {
    id: "phish_sim",
    name: "Phishing Test",
    focus: "Resilienza utenti",
    hook: "I tuoi dipendenti sanno riconoscere una truffa? Scoprilo con un test controllato.",
    consulting_goal: "Formazione e awareness",
  },
  {
    id: "data_leak",
    name: "Cloud Bucket Hunter",
    focus: "Esposizione cloud pubblica",
    hook: "I tuoi dati su AWS/Azure sono pubblici? Evita il data breach prima che accada.",
    consulting_goal: "Cloud security audit",
  },
  {
    id: "mail_auth",
    name: "Email Spoofing Check",
    focus: "SPF, DKIM, DMARC",
    hook: "Qualcuno può inviare mail a tuo nome? Verifica SPF, DKIM e DMARC ora.",
    consulting_goal: "Configurazione mail e DNS",
  },
  {
    id: "domain_typo",
    name: "Brand Protector",
    focus: "Typosquatting & brand abuse",
    hook: "Esistono siti sosia che truffano i tuoi clienti? Monitora il typosquatting.",
    consulting_goal: "Protezione del brand",
  },
  {
    id: "ip_reput",
    name: "Blacklist Scanner",
    focus: "Reputazione IP / deliverability",
    hook: "Il tuo IP è segnalato come pericoloso? Evita che le tue mail finiscano in spam.",
    consulting_goal: "Connettività e reputazione",
  },
  {
    id: "ransom_surf",
    name: "Ransomware Surface",
    focus: "Superficie ransomware",
    hook: "I tuoi servizi sono vulnerabili ai bug più usati dai cyber-criminali?",
    consulting_goal: "Vulnerability assessment",
  },
  {
    id: "ssl_audit",
    name: "Encryption Check",
    focus: "TLS / certificati",
    hook: "I tuoi dati viaggiano sicuri? Verifica la robustezza dei certificati SSL.",
    consulting_goal: "Adeguamento crittografia",
  },
  {
    id: "social_im",
    name: "VIP Impersonator",
    focus: "Impersonation social",
    hook: "Esistono profili fake dei tuoi manager sui social? Blocca il furto d'identità.",
    consulting_goal: "Digital reputation",
  },
  {
    id: "web_bh",
    name: "Web Behavior Scan",
    focus: "Script e comportamento sito",
    hook: "Il tuo sito nasconde codice maligno o script di tracciamento non autorizzati?",
    consulting_goal: "Malware removal & hardening",
  },
];

function mergeBase(b: MarketplaceToolBase): MarketplaceToolFull {
  const d = TOOL_DETAILS_FALLBACK[b.id];
  const pdf = d?.guide_pdf_email ?? null;
  return {
    ...b,
    short_description: d?.short_description ?? b.hook.slice(0, 160),
    price_eur_one_shot: ONE_SHOT_EUR,
    bundle_price_eur: BUNDLE_EUR,
    guide_what_it_does: d?.guide_what_it_does ?? "",
    guide_activities: d?.guide_activities ?? [],
    guide_immediate_result: d?.guide_immediate_result ?? "",
    guide_pdf_email: pdf,
    has_pdf_option: Boolean(pdf),
  };
}

export const MARKETPLACE_TOOLS_FALLBACK: MarketplaceToolFull[] = _BASE.map(mergeBase);

export const MARKETPLACE_BUNDLES_FALLBACK: MarketplaceBundle[] = [
  {
    id: "mail_brand",
    title: "Posta sicura + brand",
    tool_ids: ["mail_auth", "domain_typo"],
    price_eur: BUNDLE_EUR,
    checkout_kind: "bundle_15",
    why: "Spesso insieme: SPF/DKIM/DMARC e domini simili al brand vanno coordinati per bloccare phishing e spoofing verso clienti e fornitori.",
  },
  {
    id: "compliance_surface",
    title: "NIS2 + crittografia",
    tool_ids: ["nis2_gap", "ssl_audit"],
    price_eur: BUNDLE_EUR,
    checkout_kind: "bundle_15",
    why: "Per chi deve dimostrare diligenza: gap di processo (NIS2) e stato TLS/certificati in un’unica passata economica.",
  },
  {
    id: "attack_surface",
    title: "Superficie nascosta + ransomware",
    tool_ids: ["shadow_it", "ransom_surf"],
    price_eur: BUNDLE_EUR,
    checkout_kind: "bundle_15",
    why: "Due viste complementari: cosa espongi senza saperlo e dove sei più esposto a pattern ransomware.",
  },
];

const _byId = new Map(MARKETPLACE_TOOLS_FALLBACK.map((t) => [t.id, t]));

export function getMarketplaceToolById(id: string): MarketplaceToolFull | undefined {
  return _byId.get(id);
}

/** Unisce risposta API con fallback per campi mancanti (backend vecchi). */
export function normalizeToolFromApi(
  raw: Partial<MarketplaceToolFull> & { id: string },
): MarketplaceToolFull {
  const baseRow = _BASE.find((b) => b.id === raw.id);
  const fb = _byId.get(raw.id) ?? (baseRow ? mergeBase(baseRow) : undefined);
  if (!fb) {
    throw new Error(`Unknown marketplace tool id: ${raw.id}`);
  }
  return {
    ...fb,
    ...raw,
    guide_activities:
      Array.isArray(raw.guide_activities) && raw.guide_activities.length > 0
        ? raw.guide_activities
        : fb.guide_activities,
    guide_pdf_email:
      raw.guide_pdf_email === undefined ? fb.guide_pdf_email : raw.guide_pdf_email,
    has_pdf_option:
      typeof raw.has_pdf_option === "boolean" ? raw.has_pdf_option : fb.has_pdf_option,
  };
}
