"use client";

import { useState } from "react";
import TokenColumn from "@/components/pulse/TokenColumn";
import { mockTokens } from "@/data/mockToken";
import { Token } from "@/types/token";
import { useMockPriceUpdates } from "@/hooks/useMockPriceUpdates";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Header from "@/components/common/Header";

export default function PulsePage() {
  const isLoading = false;
  const liveTokens = useMockPriceUpdates(mockTokens);

  const newTokens = liveTokens.filter((t: Token) => t.status === "new");
  const finalTokens = liveTokens.filter((t: Token) => t.status === "final");
  const migratedTokens = liveTokens.filter((t: Token) => t.status === "migrated");

  const [activeTab, setActiveTab] = useState<"new" | "final" | "migrated">("new");

  return (
    <main className="min-h-screen bg-[#07070a] p-4">
      <div className="mx-auto max-w-7xl">
        <Header />
        <h1 className="mb-4 text-lg font-semibold text-white">Token Discovery</h1>

        {/* MOBILE TABS */}
        <div className="flex sm:hidden mb-4 border-b border-white/10">
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "new" ? "text-white border-b-2 border-blue-400" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("new")}
          >
            New Pairs
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "final" ? "text-white border-b-2 border-blue-400" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("final")}
          >
            Final Stretch
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "migrated" ? "text-white border-b-2 border-blue-400" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("migrated")}
          >
            Migrated
          </button>
        </div>

        {/* MOBILE: Show only the active tab */}
        <div className="sm:hidden">
          {activeTab === "new" && (
            <ErrorBoundary>
              <TokenColumn title="New Pairs" tokens={newTokens} isLoading={isLoading} />
            </ErrorBoundary>
          )}
          {activeTab === "final" && (
            <ErrorBoundary>
              <TokenColumn title="Final Stretch" tokens={finalTokens} isLoading={isLoading} />
            </ErrorBoundary>
          )}
          {activeTab === "migrated" && (
            <ErrorBoundary>
              <TokenColumn title="Migrated" tokens={migratedTokens} isLoading={isLoading} />
            </ErrorBoundary>
          )}
        </div>

        {/* DESKTOP: Show all columns side by side */}
        <div className="hidden sm:flex sm:gap-4">
          <div className="flex-1">
            <ErrorBoundary>
              <TokenColumn title="New Pairs" tokens={newTokens} isLoading={isLoading} />
            </ErrorBoundary>
          </div>
          <div className="flex-1">
            <ErrorBoundary>
              <TokenColumn title="Final Stretch" tokens={finalTokens} isLoading={isLoading} />
            </ErrorBoundary>
          </div>
          <div className="flex-1">
            <ErrorBoundary>
              <TokenColumn title="Migrated" tokens={migratedTokens} isLoading={isLoading} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </main>
  );
}
