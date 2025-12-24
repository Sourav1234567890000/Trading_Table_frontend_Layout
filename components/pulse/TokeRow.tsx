"use client";

import { useState } from "react";
import { Token } from "@/types/token";
import * as HoverCard from "@radix-ui/react-hover-card";
import TokenDetailsModal from "./TokenDetailsModal";
import { usePriceFlash } from "@/hooks/userPriceFlash";
import { CheckCircle } from "lucide-react";

interface TokenRowProps {
  token: Token;
}

export default function TokenRow({ token }: TokenRowProps) {
  const [open, setOpen] = useState(false);
  const priceDirection = usePriceFlash(token.price);
  const isPositive = token.priceChange24h >= 0;

  const riskColor =
    token.riskScore <= 25
      ? "text-green-400"
      : token.riskScore <= 60
      ? "text-yellow-400"
      : "text-red-400";

  const flashBg =
    priceDirection === "up"
      ? "bg-green-500/5"
      : priceDirection === "down"
      ? "bg-red-500/5"
      : "";

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`
          group grid grid-cols-[120px_1fr_7.5ch] sm:grid-cols-[120px_1fr_96px]
          items-center
          px-2 py-2
          text-sm
          border-b border-white/5
          cursor-pointer
          transition-colors
          hover:bg-[#121218]
          ${flashBg}
        `}
      >
        {/* LEFT — AVATAR + NAME + SYMBOL */}
        <HoverCard.Root openDelay={150}>
          <HoverCard.Trigger asChild>
            <div className="flex flex-col items-center gap-1 cursor-pointer sm:items-start truncate">
              <img
                src={token.avatar}
                alt={token.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="flex items-center gap-1 font-medium text-white truncate">
                {token.name}
                {token.verified && <CheckCircle className="w-3 h-3 text-blue-400" />}
              </span>
              <span className="text-xs text-gray-400 truncate">{token.symbol}</span>
            </div>
          </HoverCard.Trigger>

          <HoverCard.Content
            side="bottom"
            sideOffset={12}
            className="axiom-hover w-64 p-4"
          >
            <div className="flex items-center gap-3">
              <img src={token.avatar} alt={token.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{token.name}</span>
                  {token.verified && <CheckCircle className="w-4 h-4 text-blue-400" />}
                </div>
                <span className="text-sm text-gray-400">{token.symbol}</span>
              </div>
            </div>

            <div className="my-3 h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-y-2 text-xs">
              <span className="text-gray-400">Risk</span>
              <span className={riskColor}>{token.riskScore}/100</span>

              <span className="text-gray-400">Liquidity</span>
              <span>${token.liquidity.toLocaleString()}</span>

              <span className="text-gray-400">24h Volume</span>
              <span>${token.volume24h.toLocaleString()}</span>

              <span className="text-gray-400">Holders</span>
              <span>{token.holders.toLocaleString()}</span>
            </div>
          </HoverCard.Content>
        </HoverCard.Root>

        {/* MIDDLE — METADATA (DESKTOP ONLY) */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300 mr-2 flex-wrap">
          {/* Risk */}
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <span className={`cursor-help font-medium ${riskColor}`}>{token.riskScore}</span>
            </HoverCard.Trigger>
            <HoverCard.Content className="axiom-hover">Risk Score (0–100)</HoverCard.Content>
          </HoverCard.Root>

          {/* Bonding */}
          {token.bondingProgress !== undefined && (
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <div className="w-10 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-help">
                  <div className="h-full bg-blue-400" style={{ width: `${token.bondingProgress}%` }} />
                </div>
              </HoverCard.Trigger>
              <HoverCard.Content className="axiom-hover">Bonding Progress: {token.bondingProgress}%</HoverCard.Content>
            </HoverCard.Root>
          )}

          {/* Liquidity */}
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <span className="cursor-help">${token.liquidity.toLocaleString()}</span>
            </HoverCard.Trigger>
            <HoverCard.Content className="axiom-hover">Liquidity</HoverCard.Content>
          </HoverCard.Root>

          {/* Volume */}
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <span className="cursor-help">${token.volume24h.toLocaleString()}</span>
            </HoverCard.Trigger>
            <HoverCard.Content className="axiom-hover">24h Volume</HoverCard.Content>
          </HoverCard.Root>

          {/* Holders */}
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <span className="cursor-help">{token.holders.toLocaleString()}</span>
            </HoverCard.Trigger>
            <HoverCard.Content className="axiom-hover">Holders</HoverCard.Content>
          </HoverCard.Root>
        </div>

        {/* MOBILE METADATA */}
        <div className="flex flex-col sm:hidden mt-1 text-xs text-gray-300 gap-1">
          <span className={`cursor-help font-medium ${riskColor}`}>Risk: {token.riskScore}</span>
          {token.bondingProgress !== undefined && <span>Bonding: {token.bondingProgress}%</span>}
          <span>Liquidity: ${token.liquidity.toLocaleString()}</span>
          <span>24h Vol: ${token.volume24h.toLocaleString()}</span>
          <span>Holders: {token.holders.toLocaleString()}</span>
        </div>

        {/* RIGHT — PRICE */}
        <div className="flex flex-col items-end w-[7.5ch] shrink-0 tabular-nums text-right">
          <span
            className={`font-semibold ${
              priceDirection === "up"
                ? "text-green-400"
                : priceDirection === "down"
                ? "text-red-400"
                : "text-white"
            }`}
          >
            ${token.price.toFixed(4)}
          </span>
          <span className={`text-xs ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? "+" : ""}
            {token.priceChange24h}%
          </span>
        </div>
      </div>

      {/* MODAL */}
      {open && <TokenDetailsModal token={token} open={open} onOpenChange={setOpen} />}
    </>
  );
}
