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
          group grid grid-cols-[120px_1fr_96px] sm:grid-cols-[100px_1fr_80px] xs:grid-cols-[80px_1fr_60px]
          items-center
          px-2 sm:px-1 py-3 sm:py-2 xs:py-1.5
          text-[clamp(12px,1.2vw,14px)]
          border-b border-white/5
          cursor-pointer
          transition-colors
          hover:bg-[#121218]
          ${flashBg}
        `}
      >
        {/* LEFT — NAME (HoverCard) */}
        <HoverCard.Root openDelay={150}>
          <HoverCard.Trigger asChild>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <img
                src={token.avatar}
                alt={token.name}
                className="w-4 sm:w-3 xs:w-2 rounded-full"
              />
              <span className="flex items-center gap-1 font-medium text-white truncate text-[clamp(12px,1.2vw,14px)]">
                {token.name}
                {token.verified && (
                  <CheckCircle className="w-3 sm:w-2 xs:w-2 text-blue-400" />
                )}
              </span>
              <span className="text-xs text-gray-400">{token.symbol}</span>
            </div>
          </HoverCard.Trigger>

          <HoverCard.Content
            side="bottom"
            sideOffset={12}
            className="tradeTable-hover w-64 sm:w-48 xs:w-36 p-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={token.avatar}
                alt={token.name}
                className="w-12 sm:w-10 xs:w-8 rounded-full"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{token.name}</span>
                  {token.verified && (
                    <CheckCircle className="w-4 sm:w-3 xs:w-3 text-blue-400" />
                  )}
                </div>
                <span className="text-sm text-gray-400">{token.symbol}</span>
              </div>
            </div>

            <div className="my-2 h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-y-1 text-xs sm:text-[10px] xs:text-[9px]">
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

        {/* MIDDLE — DATA */}
        <div className="flex items-center gap-2 text-xs text-gray-300 mr-2 sm:gap-1 xs:gap-0">
          {/* Risk */}
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <span className={`cursor-help font-medium ${riskColor}`}>
                {token.riskScore}
              </span>
            </HoverCard.Trigger>
            <HoverCard.Content className="tradeTable-hover">Risk Score (0–100)</HoverCard.Content>
          </HoverCard.Root>

          {/* Bonding */}
          {token.bondingProgress !== undefined && (
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <div className="w-10 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-help">
                  <div
                    className="h-full bg-blue-400"
                    style={{ width: `${token.bondingProgress}%` }}
                  />
                </div>
              </HoverCard.Trigger>
              <HoverCard.Content className="tradeTable-hover">
                Bonding Progress: {token.bondingProgress}%
              </HoverCard.Content>
            </HoverCard.Root>
          )}

          {/* Liquidity */}
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <span className="cursor-help">${token.liquidity.toLocaleString()}</span>
            </HoverCard.Trigger>
            <HoverCard.Content className="tradeTable-hover">Liquidity</HoverCard.Content>
          </HoverCard.Root>

          {/* Volume */}
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <span className="cursor-help">${token.volume24h.toLocaleString()}</span>
            </HoverCard.Trigger>
            <HoverCard.Content className="tradeTable-hover">24h Volume</HoverCard.Content>
          </HoverCard.Root>

          {/* Holders */}
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <span className="cursor-help">{token.holders.toLocaleString()}</span>
            </HoverCard.Trigger>
            <HoverCard.Content className="tradeTable-hover">Holders</HoverCard.Content>
          </HoverCard.Root>
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
            } text-[clamp(12px,1.2vw,14px)]`}
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
