"use client";

import { useState } from "react";
import { Token } from "@/types/token";
import * as HoverCard from "@radix-ui/react-hover-card";
import TokenDetailsModal from "./TokenDetailsModal";
import { usePriceFlash } from "@/hooks/userPriceFlash";

interface TokenRowProps {
  token: Token;
}

export default function TokenRow({ token }: TokenRowProps) {
  const [open, setOpen] = useState(false);
  const isPositive = token.priceChange24h >= 0;

  const priceDirection = usePriceFlash(token.price);

  return (
    <>
      <HoverCard.Root openDelay={200} closeDelay={100}>
        <HoverCard.Trigger asChild>
          <div
            onClick={() => setOpen(true)}
            className={`
              px-4 py-2 flex justify-between items-center cursor-pointer
              transition-colors duration-300
              hover:bg-[#121218]
              ${
                priceDirection === "up"
                  ? "bg-green-500/5"
                  : priceDirection === "down"
                  ? "bg-red-500/5"
                  : ""
              }
            `}
          >
            <div>
              <p className="text-sm font-medium text-white">{token.name}</p>
              <p className="text-xs text-gray-400">{token.symbol}</p>
            </div>

            <div className="text-right">
              {/* PRICE WITH FLASH */}
              <p
                className={`
                  text-sm font-medium transition-colors duration-300
                  ${
                    priceDirection === "up"
                      ? "text-green-400"
                      : priceDirection === "down"
                      ? "text-red-400"
                      : "text-white"
                  }
                `}
              >
                ${token.price.toFixed(4)}
              </p>

              {/* 24H CHANGE */}
              <p
                className={`text-xs ${
                  isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {isPositive ? "+" : ""}
                {token.priceChange24h}%
              </p>
            </div>
          </div>
        </HoverCard.Trigger>

        <HoverCard.Content
          side="right"
          sideOffset={8}
          className="w-48 rounded-md border border-[#1f1f24]
                     bg-[#1e1e2a] p-3 text-xs text-white shadow-lg"
        >
          <p>Liquidity: ${token.liquidity}</p>
          <p>24h Volume: ${token.volume24h}</p>
        </HoverCard.Content>
      </HoverCard.Root>

      {open && (
        <TokenDetailsModal
          token={token}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}
