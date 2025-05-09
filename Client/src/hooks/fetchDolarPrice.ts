import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function fetchDolarPrice() {
  return useQuery({
    queryKey: ["Dolar"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://mindicador.cl/api/dolar");
        return response.data.serie[0].valor;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60 * 12,  //eso es cada cuanto se hara refetch-> 12 horas puse para ahorrar consultas
    gcTime: 1000 * 60 * 60 * 24 //esto es el tiempo que estara en memoria si no lo utilizas
  });
}
