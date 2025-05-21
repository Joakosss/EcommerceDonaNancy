import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SucursalType } from "../types/SucursalType";

export function getSucursales() {
  return useQuery({
    queryKey: ["sucursales"],
    queryFn: async () => {
      try {
        const response = await axios.get<SucursalType[]>(
          "http://localhost:8000/api/sucursales"
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60 * 12, //eso es cada cuanto se hara refetch-> 12 horas puse para ahorrar consultas
    gcTime: 1000 * 60 * 60 * 24, //esto es el tiempo que estara en memoria si no lo utilizas
  });
}
