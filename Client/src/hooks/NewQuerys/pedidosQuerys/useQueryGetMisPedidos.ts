import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ComprasType } from "../../../types/ComprasType";
/* 
    Funcion para traer los usuarios desde la BD, espera que lo llames y puedes pasarle los filtros asi:
    const {data} = useGetUsersQuery({id_perfil:"1"})
*/

const axiosQuery = async (
  accessToken: string,
  filtros?: Record<string, string | number | boolean>
) => {
  return await axios.get("http://localhost:8000/api/pedidos/mis-pedidos", {
    params: filtros,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

function useQueryGetMisPedidos(
  filtros?: Record<string, string | number | boolean>
) {
  const { tokens, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  return useQuery<[ComprasType]>({
    queryKey: ["misPedidos", filtros],
    queryFn: async () => {
      if (!tokens || !tokens.access_token || !tokens.refresh_token) {
        logout();
        navigate("/");
        throw new Error(
          "Sesión cerrada inesperadamente. Por favor, inicie sesión nuevamente."
        );
      }
      try {
        const response = await axiosQuery(tokens.access_token, filtros);
        return response.data;
      } catch (error: any) {
        const errorAxios = error as AxiosError;
        if (errorAxios.response?.status === 401) {
          /* Aqui se hace el refresh del token */
          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/api/auth/refresh",
              { refresh_token: tokens.refresh_token }
            );
            setAuth({
              access_token: response.data.access_token,
              refresh_token: tokens.refresh_token,
              autorization: tokens.autorization,
              id_usuario: tokens.id_usuario,
            });
            /* Se realiza la consulta nuevamente con el nuevo auth */
            const retryResponse = await axiosQuery(
              response.data.access_token,
              filtros
            );
            return retryResponse.data;
          } catch (error: any) {
            logout();
            navigate("/");
            throw new Error(error.response?.data.detail || "Sesión expirada");
          }
        }
        throw new Error(
          error.response?.data.detail || "La solicitud de pedidos falló"
        );
      }
    },
  });
}

export default useQueryGetMisPedidos;

