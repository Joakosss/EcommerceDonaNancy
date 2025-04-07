import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type useProductsType = {
  url: string;
  limit?: number;
  filter?: {};
};

export const useProducts = ({ url, limit, filter }: useProductsType) => {
  return useQuery({
    queryKey: ["productos", filter],
    queryFn: async () => {
      const response = await axios.get(url, {
        params: { ...filter },
        // Guardamos el total de elementos en la cabecera
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
