import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useAuthStore from "../../../store/useAuthStore";
import { UsuarioType } from "../../../types/UsuarioType";
import { useNavigate } from "react-router-dom";
/* 
    Funcion para traer los usuarios desde la BD, espera que lo llames y puedes pasarle los filtros asi:
    const {data} = useGetUsersQuery({id_perfil:"1"})
*/

function useQueryGetUsers(filtros?: Record<string, string | number | boolean>) {
  const { tokens, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  return useQuery<UsuarioType[]>({
    queryKey: ["usuarios", filtros],
    queryFn: async () => {
      try {
        const response = await axios.get<UsuarioType[]>(
          "http://127.0.0.1:8000/api/usuarios",
          {
            params: filtros,
            headers: { Authorization: `Bearer ${tokens?.access_token}` },
          }
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
            const retryResponse = await axios.get<UsuarioType[]>(
              "http://127.0.0.1:8000/api/usuarios",
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
          error.response?.data.detail || "La solicitud de usuarios falló"
        );
      }
    },
  });
}

export default useQueryGetUsers;
