import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../types/ProductType";
import axios from "axios";

type useProductsType = {
  limit?: number;
};

export const useProducts = ({ limit }: useProductsType = {}) => {
  return useQuery<ProductType[]>({
    queryKey: ["productos"],
    queryFn: async (): Promise<ProductType[]> => {
      const response = await axios.get("http://localhost:3000/productos", {
        params: { limit },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
