"use client";

import { useMemo, useState } from "react";
import { Token } from "../../types/token";
import * as Tooltip from "@radix-ui/react-tooltip";
import TokenRow from "./TokeRow";
import TokenSkeleton from "./TokenSkeleton";
import { SortKey, SortOrder } from "@/types/sort";

interface TokenColumnProps {
  title: string;
  tokens: Token[];
  isLoading: boolean;
}

export default function TokenColumn({ title, tokens, isLoading }: TokenColumnProps) {
  const placeholderCount = tokens.length || 5;

  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedTokens = useMemo(() => {
    return [...tokens].sort((a, b) => {
      const valueA = sortKey === "price" ? a.price : a.priceChange24h;
      const valueB = sortKey === "price" ? b.price : b.priceChange24h;
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
  }, [tokens, sortKey, sortOrder]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  return (
    <div className="bg-[#0b0b0f] rounded-lg border border-[#1f1f24] w-full sm:w-auto">
      {/* Header */}
      <div className="px-3 py-3 sm:py-2 xs:py-1 border-b border-[#1f1f24]">
        <div className="flex items-center justify-between">
          <h2 className="text-[clamp(12px,1.5vw,16px)] font-semibold text-white">{title}</h2>
          <span className="text-xs text-gray-500">{tokens.length}</span>
        </div>

        <div className="mt-1 flex gap-4 text-[11px] sm:text-[10px] xs:text-[9px] text-gray-500">
          <button
            onClick={() => toggleSort("price")}
            className={`hover:text-white ${sortKey === "price" ? "text-white" : ""}`}
          >
            Price {sortKey === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>

          <button
            onClick={() => toggleSort("change")}
            className={`hover:text-white ${sortKey === "change" ? "text-white" : ""}`}
          >
            24h % {sortKey === "change" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      <Tooltip.Provider delayDuration={200}>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto divide-y divide-white/5">
          {isLoading
            ? Array.from({ length: placeholderCount }).map((_, i) => <TokenSkeleton key={i} />)
            : sortedTokens.map(token => <TokenRow key={token.id} token={token} />)}
        </div>
      </Tooltip.Provider>
    </div>
  );
}
