import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { PedidoType } from "../../../types/PedidoType";
/* 
    Funcion para traer los usuarios desde la BD, espera que lo llames y puedes pasarle los filtros asi:
    const {data} = useGetUsersQuery({id_perfil:"1"})
*/

function useQueryGetPedidos(filtros?: Record<string, string | number | boolean>) {
  const { tokens, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  return useQuery<PedidoType[]>({
    queryKey: ["pedidos", filtros],
    queryFn: async () => {
      try {
        const response = await axios.get<PedidoType[]>(
          "http://127.0.0.1:8000/api/pedidos",
          {
            params: filtros,
            headers: { Authorization: `Bearer ${tokens?.access_token}` },
          }
        );
        console.log(response)
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
            const retryResponse = await axios.get<PedidoType[]>(
              "http://127.0.0.1:8000/api/pedidos",
              {
                params: filtros,
                headers: {
                  Authorization: `Bearer ${response.data.access_token}`,
                },
              }
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

export default useQueryGetPedidos;
