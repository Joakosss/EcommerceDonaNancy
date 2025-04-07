import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useCreateBoleta = () => {
  return useMutation({
    mutationFn: async (boleta:{}) => {
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
