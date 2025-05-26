import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "../../../types/ProductType";

function useQueryGetProductByID(id: string | number) {
  return useQuery({
    queryKey: ["productos", id],
    queryFn: async () => {
      try {
        const response = await axios.get<ProductType>(
          `http://127.0.0.1:8000/api/productos/${id}`
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(
            error.response.data.detail || "La solicitud de login falló"
          );
        }
        throw new Error("La solicitud de login falló");
      }
    },
  });
}

export default useQueryGetProductByID;
