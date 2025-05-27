import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const axiosQuery = async (id: string, access_token: string) => {
  return await axios.delete(`http://127.0.0.1:8000/api/productos/${id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

function useMutateDeleteProduct() {
  const { tokens, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!tokens || !tokens.access_token) {
        logout();
        return;
      }
      try {
        const response = await axiosQuery(id, tokens.access_token);
        return response.data;
      } catch (error: unknown) {
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
            const retryResponse = await axiosQuery(id, tokens.access_token);
            return retryResponse.data;
          } catch (error: any) {
            logout();
            navigate("/");
            throw new Error(error.response?.data.detail || "Sesión expirada");
          }
        }
        throw new Error(
          error.response?.data.detail || "La solicitud de Eliminación falló"
        );
      }
    },
  });
}

export default useMutateDeleteProduct;
