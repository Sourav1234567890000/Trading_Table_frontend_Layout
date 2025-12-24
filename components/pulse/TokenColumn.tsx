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

export default function TokenColumn({
  title,
  tokens,
  isLoading,
}: TokenColumnProps) {
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
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  return (
    <div className="bg-[#0b0b0f] rounded-lg border border-[#1f1f24]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1f1f24]">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <p className="text-xs text-gray-400">{tokens.length} tokens</p>

        {/* Sort Controls */}
        <div className="mt-2 flex gap-3 text-xs text-gray-400">
          <button
            onClick={() => toggleSort("price")}
            className={`hover:text-white ${
              sortKey === "price" ? "text-white" : ""
            }`}
          >
            Price {sortKey === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>

          <button
            onClick={() => toggleSort("change")}
            className={`hover:text-white ${
              sortKey === "change" ? "text-white" : ""
            }`}
          >
            24h % {sortKey === "change" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      {/* List */}
      <Tooltip.Provider delayDuration={200}>
        <div className="overflow-y-auto max-h-[500px] divide-y divide-[#1f1f24]">
          {isLoading
            ? Array.from({ length: placeholderCount }).map((_, i) => (
                <TokenSkeleton key={i} />
              ))
            : sortedTokens.map((token) => (
                <TokenRow key={token.id} token={token} />
              ))}
        </div>
      </Tooltip.Provider>
    </div>
  );
}
