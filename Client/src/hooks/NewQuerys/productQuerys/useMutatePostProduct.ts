import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../types/ProductType";

const axiosQuery = async (producto: ProductType, accessToken: string) => {
  return await axios.post(`http://127.0.0.1:8000/api/productos/`, producto, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

function useMutatePostProduct() {
  const { tokens, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (producto: ProductType) => {
      if (!tokens || !tokens.access_token) return logout();

      try {
        const response = await axiosQuery(producto, tokens.access_token);
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
              producto,
              response.data.access_token
            );
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

export default useMutatePostProduct;
