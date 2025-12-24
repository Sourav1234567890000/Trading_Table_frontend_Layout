"use client";

import TokenColumn from "@/components/pulse/TokenColumn";
import { mockTokens } from "@/data/mockToken";
import { Token } from "@/types/token";
import { useMockPriceUpdates } from "@/hooks/useMockPriceUpdates";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function PulsePage() {
  const isLoading = false;

  // Real-time token updates
  const liveTokens = useMockPriceUpdates(mockTokens);

  const newTokens = liveTokens.filter((t: Token) => t.status === "new");
  const finalTokens = liveTokens.filter((t: Token) => t.status === "final");
  const migratedTokens = liveTokens.filter(
    (t: Token) => t.status === "migrated"
  );

  return (
    <main className="min-h-screen bg-[#07070a] p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-lg font-semibold text-white">
          Token Discovery
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ErrorBoundary>
            <TokenColumn
              title="New Pairs"
              tokens={newTokens}
              isLoading={isLoading}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <TokenColumn
              title="Final Stretch"
              tokens={finalTokens}
              isLoading={isLoading}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <TokenColumn
              title="Migrated"
              tokens={migratedTokens}
              isLoading={isLoading}
            />
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
}
