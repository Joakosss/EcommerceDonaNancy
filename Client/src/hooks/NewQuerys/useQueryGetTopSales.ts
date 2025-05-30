import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "../../types/ProductType";

function useQueryGetTopSales() {
  return useQuery({
    queryKey: ["topVentas"],
    queryFn: async () => {
      try {
        const response = await axios.get<ProductType[]>(
          "http://127.0.0.1:8000/api/productos/populares",
        );
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data.detail || "La solicitud de productos populares falló"
        );
      }
    },
  });
}

export default useQueryGetTopSales;
