import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URLSearchParams } from "url";

function useMutatePostLogin() {
  return useMutation({
    mutationFn: async (loginData: URLSearchParams) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/login",
          loginData
        );
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
