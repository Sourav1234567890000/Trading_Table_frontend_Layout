export type TokenStatus = "new" | "final" | "migrated";

export interface Token {
  id: string;

  // Core identity
  name: string;
  symbol: string;
  contract: string;

  avatar: string; 

  // Pricing
  price: number;
  priceChange24h: number;

  // Market data
  volume24h: number;
  liquidity: number;
  marketCap: number;

  // Extra metadata (tradeTable-like)
  holders: number;
  transactions24h: number;
  ageMinutes: number; // how new the token is
  chain: "SOL" | "ETH" | "BASE";
  verified: boolean;
  riskScore: number; // 0–100
  bondingProgress?: number; // only for Final Stretch

  status: TokenStatus;
}
