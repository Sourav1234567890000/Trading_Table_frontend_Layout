import { Token } from "@/types/token";

const baseTokens: Token[] = [
  {
    id: "1",
    name: "Axiom",
    symbol: "AXM",
    price: 0.0234,
    priceChange24h: 4.21,
    volume24h: 120000,
    liquidity: 340000,
    marketCap: 2100000,
    holders: 124,
    transactions24h: 342,
    ageMinutes: 18,
    chain: "SOL",
    verified: true,
    riskScore: 18,
    bondingProgress: 72,
    status: "final",
    contract: "@xabc...123",
  },
];

export const mockTokens: Token[] = [
  ...baseTokens,

  ...Array.from({ length: 40 }, (_, i): Token => ({
  id: `auto-${i}`,
  name: `Token ${i + 1}`,
  symbol: `TK${i + 1}`,
  price: +(Math.random() * 2).toFixed(4),
  priceChange24h: +(Math.random() * 40 - 20).toFixed(2),
  volume24h: Math.floor(Math.random() * 500_000),
  liquidity: Math.floor(Math.random() * 1_000_000),
  marketCap: Math.floor(Math.random() * 5_000_000),
  holders: Math.floor(Math.random() * 3000),
  transactions24h: Math.floor(Math.random() * 2000),
  ageMinutes: Math.floor(Math.random() * 120),
  chain: "SOL",
  verified: Math.random() > 0.6,
  riskScore: Math.floor(Math.random() * 100),
  bondingProgress: Math.floor(Math.random() * 100),
  status: i % 3 === 0 ? "new" : i % 3 === 1 ? "final" : "migrated",
  contract: `@0x${Math.random().toString(16).slice(2, 8)}...`,
}))
];
