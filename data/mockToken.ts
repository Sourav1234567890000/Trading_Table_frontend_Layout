import { Token } from "@/types/token";

const CHAINS = ["SOL", "ETH", "BASE"] as const;
// type Chain = (typeof CHAINS)[number];

const baseTokens: Token[] = [
  {
    id: "1",
    name: "Axiom",
    symbol: "AXM",
    contract: "@xabc...123",

    // Pricing
    price: 0.0234,
    priceChange24h: 4.21,

    // Market data
    volume24h: 120_000,
    liquidity: 340_000,
    marketCap: 2_100_000,

    // Extra metadata
    holders: 124,
    transactions24h: 342,
    ageMinutes: 18,
    chain: "SOL",
    verified: true,
    riskScore: 18,
    bondingProgress: 72,

    status: "final",
  },
];

const generatedTokens: Token[] = Array.from(
  { length: 40 },
  (_, i): Token => ({
    id: `auto-${i}`,
    name: `Token ${i + 1}`,
    symbol: `TK${i + 1}`,
    contract: `@0x${Math.random().toString(16).slice(2, 8)}...`,

    // Pricing
    price: +(Math.random() * 2).toFixed(4),
    priceChange24h: +(Math.random() * 40 - 20).toFixed(2),

    // Market data
    volume24h: Math.floor(Math.random() * 500_000),
    liquidity: Math.floor(Math.random() * 1_000_000),
    marketCap: Math.floor(Math.random() * 5_000_000),

    // Extra metadata
    holders: Math.floor(Math.random() * 3_000),
    transactions24h: Math.floor(Math.random() * 2_000),
    ageMinutes: Math.floor(Math.random() * 180),
    chain: CHAINS[Math.floor(Math.random() * CHAINS.length)],
    verified: Math.random() > 0.6,
    riskScore: Math.floor(Math.random() * 100),
    bondingProgress: Math.floor(Math.random() * 100),

    status: i % 3 === 0 ? "new" : i % 3 === 1 ? "final" : "migrated",
  })
);

export const mockTokens: Token[] = [...baseTokens, ...generatedTokens];
