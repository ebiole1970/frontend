import {
  MARKETPLACE_BUNDLES_FALLBACK,
  MARKETPLACE_TOOLS_FALLBACK,
  normalizeToolFromApi,
  type MarketplaceBundle,
  type MarketplaceToolFull,
} from "@/lib/marketplace-tools-fallback";

const apiBase =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) || "http://127.0.0.1:8000";

function candidateApiBases(): string[] {
  const trimmed = apiBase.replace(/\/$/, "");
  return [...new Set([trimmed, "http://127.0.0.1:8000", "http://localhost:8000"])];
}

export type MarketplaceCatalogPayload = {
  tools: MarketplaceToolFull[];
  bundles: MarketplaceBundle[];
  usingLocalCatalog: boolean;
};

export async function fetchMarketplaceCatalog(): Promise<MarketplaceCatalogPayload> {
  for (const base of candidateApiBases()) {
    try {
      const r = await fetch(`${base}/api/v1/commerce/marketplace-tools`);
      if (!r.ok) continue;
      const j = (await r.json()) as {
        tools?: Partial<MarketplaceToolFull>[];
        bundles?: MarketplaceBundle[];
      };
      if (Array.isArray(j.tools) && j.tools.length > 0) {
        const tools = j.tools.map((t) => normalizeToolFromApi({ id: String(t.id), ...t }));
        const bundles =
          Array.isArray(j.bundles) && j.bundles.length > 0 ? j.bundles : MARKETPLACE_BUNDLES_FALLBACK;
        return { tools, bundles, usingLocalCatalog: false };
      }
    } catch {
      continue;
    }
  }
  return {
    tools: MARKETPLACE_TOOLS_FALLBACK,
    bundles: MARKETPLACE_BUNDLES_FALLBACK,
    usingLocalCatalog: true,
  };
}
