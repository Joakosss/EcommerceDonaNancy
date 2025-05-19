import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "../../../types/ProductType";

function useQueryGetProduct(
  filtros?: Record<string, string | number | boolean>
) {
  return useQuery({
    queryKey: ["productos", filtros],
    queryFn: async () => {
      try {
        const response = await axios.get<ProductType[]>(
          "http://127.0.0.1:8000/api/productos",
          {
            params: filtros,
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data.detail || "La solicitud de login falló"
        );
      }
    },
  });
}

export default useQueryGetProduct;
