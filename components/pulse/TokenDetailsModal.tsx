"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Token } from "@/types/token";

interface TokenDetailsModalProps {
  token: Token;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TokenDetailsModal({
  token,
  open,
  onOpenChange,
}: TokenDetailsModalProps) {
  if (!token) return null;

  const isPositive = token.priceChange24h >= 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 w-[90vw] max-w-md
            -translate-x-1/2 -translate-y-1/2
            rounded-lg border border-[#1f1f24]
            bg-[#0b0b0f] p-5 text-white shadow-xl
          "
        >
          <Dialog.Title className="text-lg font-semibold">
            {token.name} ({token.symbol})
          </Dialog.Title>

          {/* Price */}
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xl font-bold">${token.price.toFixed(4)}</p>
            <p
              className={`text-sm ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {token.priceChange24h}%
            </p>
          </div>

          {/* Metadata */}
          <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-gray-400">Liquidity</span>
            <span>${token.liquidity.toLocaleString()}</span>

            <span className="text-gray-400">24h Volume</span>
            <span>${token.volume24h.toLocaleString()}</span>

            <span className="text-gray-400">Market Cap</span>
            <span>${token.marketCap.toLocaleString()}</span>

            <span className="text-gray-400">Holders</span>
            <span>{token.holders.toLocaleString()}</span>

            <span className="text-gray-400">Tx (24h)</span>
            <span>{token.transactions24h}</span>

            <span className="text-gray-400">Age</span>
            <span>{token.ageMinutes} min</span>

            <span className="text-gray-400">Chain</span>
            <span>{token.chain}</span>
          </div>

          {/* Contract */}
          <div className="mt-4 rounded-md bg-[#121218] p-2 text-xs text-gray-300">
            <p className="truncate">Contract: {token.contract}</p>
          </div>

          <Dialog.Close className="absolute right-3 top-3 text-gray-400 hover:text-white">
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
