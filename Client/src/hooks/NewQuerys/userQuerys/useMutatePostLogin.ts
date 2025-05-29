import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URLSearchParams } from "url";
import useAuthStore from "../../../store/useAuthStore";

function useMutatePostLogin() {
  const { setAccess } = useAuthStore()
  return useMutation({
    mutationFn: async (loginData: URLSearchParams) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/login",
          loginData
        );
        if (response.data.cambiar_contrasenia) { setAccess(true) }
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data.detail || "La solicitud de login falló"
        );
      }
    }
  });
}

export default useMutatePostLogin;
