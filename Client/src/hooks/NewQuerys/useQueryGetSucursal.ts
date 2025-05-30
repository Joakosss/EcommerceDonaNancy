import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SucursalType } from "../../types/SucursalType";

function useQueryGetSucursal() {
  return useQuery({
    queryKey: ["sucursales"],
    queryFn: async () => {
      try {
        const response = await axios.get<SucursalType[]>(
          "http://127.0.0.1:8000/api/sucursales",
        );
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data.detail || "La solicitud de sucursales falló"
        );
      }
    },
  });
}

export default useQueryGetSucursal;
