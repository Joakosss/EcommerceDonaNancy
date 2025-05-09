import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExchangeStore {
  exchange: "CLP" | "USD";
  setExchange: () => void;
}

const useExchange = create<ExchangeStore>()(
  persist(
    (set) => ({
      exchange: "CLP",
      setExchange: () =>
        set((state) => ({
          exchange: state.exchange === "CLP" ? "USD" : "CLP",
        })),
    }),
    {
      name: "Exchange-Store",
    }
  )
);

export default useExchange;
