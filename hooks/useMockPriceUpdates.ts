import { useEffect, useState } from "react";
import { Token } from "@/types/token";

export function useMockPriceUpdates(initialTokens: Token[]) {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prevTokens =>
        prevTokens.map(token => {
          const randomChange = (Math.random() - 0.5) * 2; // -1 to +1%
          const newPrice = +(token.price * (1 + randomChange / 100)).toFixed(4);
          const priceChange24h = +(token.priceChange24h + randomChange).toFixed(2);
          return { ...token, price: newPrice, priceChange24h };
        })
      );
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return tokens;
}
