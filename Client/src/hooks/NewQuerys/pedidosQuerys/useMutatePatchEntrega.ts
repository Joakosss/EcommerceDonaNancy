import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

type props = {
  id: string;
  newEntrega: unknown;
};

const axiosQuery = async (
  id: string,
  newEntrega: unknown,
  access_token: string
) => {
  return await axios.patch(
    `http://127.0.0.1:8000/api/pedidos/estado_entrega/${id}`,
    newEntrega,
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
};

function useMutatePatchEntrega() {
  const { tokens, logout, setAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ id, newEntrega }: props) => {
      if (!tokens || !tokens.access_token) {
        logout();
        return;
      }
      try {
        const response = await axiosQuery(id, newEntrega, tokens.access_token);
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
            const retryResponse = await axiosQuery(
              id,
              newEntrega,
              response.data.access_token
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

export default useMutatePatchEntrega;
