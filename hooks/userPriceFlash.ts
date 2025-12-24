import { useEffect, useRef, useState } from "react";

export type PriceDirection = "up" | "down" | null;

export function usePriceFlash(price: number) {
  const prevPriceRef = useRef<number | null>(null);
  const [direction, setDirection] = useState<PriceDirection>(null);

  useEffect(() => {
    if (prevPriceRef.current === null) {
      prevPriceRef.current = price;
      return;
    }

    if (price > prevPriceRef.current) {
      setDirection("up");
    } else if (price < prevPriceRef.current) {
      setDirection("down");
    }

    prevPriceRef.current = price;

    const timeout = setTimeout(() => {
      setDirection(null);
    }, 300);

    return () => clearTimeout(timeout);
  }, [price]);

  return direction;
}
