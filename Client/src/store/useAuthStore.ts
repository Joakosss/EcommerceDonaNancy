import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TokenType = {
  access_token: string;
  autorization: string;
  refresh_token: string;
  id_usuario: string;
};

type StoreAuthType = {
  tokens: TokenType | null;
  setAuth: (tokens: TokenType) => void;
  logout: () => void;
  isAuthenticate: () => boolean;
};

const useAuthStore = create<StoreAuthType>()(
  persist(
    (set) => ({
      tokens: null,
      setAuth: (tokens) => {
        set({ tokens: tokens });
      },
      logout: () => {
        set({ tokens: null });
      },
      isAuthenticate: () => {
        const token = localStorage.getItem("Tokens-store");
        return !!token; /* El dobler !! es para que si hay algo ahi lo transforma en booleano  */
      },
    }),
    {
      name: "Tokens-store",
    }
  )
);

export default useAuthStore;
