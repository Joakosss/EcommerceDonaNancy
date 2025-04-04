import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BoletaType } from "../types/BoletaType";
import { EntregaType } from "../types/EntregaType";

const useCreateBoleta = (boleta: BoletaType, entrega: EntregaType) => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post("http://localhost:3000/Boleta", {
          boleta,
          /* entrega, */
        });
        return response.data;
      } catch (error) {
        // Si ocurre un error, se puede manejar de una manera más controlada
        console.error("Error creando la boleta:", error);
        throw new Error("Error al crear la boleta");
      }
    },
  });
};

export default useCreateBoleta;
