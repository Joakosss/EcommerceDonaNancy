import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (user) => {
      return axios.post("http://localhost:3000/Usuarios", user);
    }
  });
};
