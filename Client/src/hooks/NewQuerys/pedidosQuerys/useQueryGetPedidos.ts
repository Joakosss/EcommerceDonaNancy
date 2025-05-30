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
  access_token: string,
  filtros?: Record<string, string | number | boolean>
) => {
  return await axios.get<ComprasType[]>("http://127.0.0.1:8000/api/pedidos", {
    params: filtros,
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

function useQueryGetPedidos(
  filtros?: Record<string, string | number | boolean>
) {
  const { tokens, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  const misFiltros = PedidosObservables();
  return useQuery<ComprasType[]>({
    queryKey: ["pedidos", misFiltros],
    queryFn: async () => {
      if (!tokens || !tokens.access_token || !tokens.refresh_token) {
        logout();
        navigate("/");
        throw new Error(
          "Sesión cerrada inesperadamente. Por favor, inicie sesión nuevamente."
        );
      }
      try {
        const response = await axiosQuery(tokens.access_token, misFiltros);
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
              response.data.access_token,
              misFiltros
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

function PedidosObservables(): Record<string, string | number | boolean> {
  const { tokens } = useAuthStore();
  switch (tokens?.autorization) {
    case "1":
      //Administrador ve todo
      return {};
    case "2":
      //Vendedor - solo pedidos completados para entrega C:
      return { id_estado_entrega: "4" };
    case "3":
      //Bodeguero - solo pedidos pagados y pedidos en proceso
      return { id_estado_entrega: "1" };
    case "4":
      //Contador - solo pedidos pagados y pedidos en proceso
      return { id_estado_pedido: "0" };
    default:
      return {};
  }
}
