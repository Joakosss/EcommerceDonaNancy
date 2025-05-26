import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

type props = {
  id: string;
  newUser: any;
};

function useMutatePatchUser() {
  const { tokens, logout, setAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ id, newUser }: props) => {
      try {
        const response = await axios.patch(
          `http://127.0.0.1:8000/api/usuarios/${id}`,
          newUser,
          { headers: { Authorization: `Bearer ${tokens?.access_token}` } }
        );
        return response.data;
      } catch (error: any) {
        const errorAxios = error as AxiosError;
        if (errorAxios.response?.status === 401) {
          /* Aqui se hace el refresh del token */
          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/api/auth/refresh",
              { refresh_token: tokens?.refresh_token }
            );
            setAuth({
              access_token: response.data.access_token,
              refresh_token: tokens!.refresh_token,
              autorization: tokens!.autorization,
              id_usuario: tokens!.id_usuario,
            });
            /* Se realiza la consulta nuevamente con el nuevo auth */
            const retryResponse = await axios.patch(
              `http://127.0.0.1:8000/api/usuarios/${id}`,
              newUser,
              { headers: { Authorization: `Bearer ${tokens?.access_token}` } }
            );
            return retryResponse.data;
          } catch (error: any) {
            logout();
            navigate("/");
            throw new Error(error.response?.data.detail || "Sesión expirada");
          }
        }
        throw new Error(error.response?.data.detail || "La modificació falló");
      }
    },
  });
}

export default useMutatePatchUser;
