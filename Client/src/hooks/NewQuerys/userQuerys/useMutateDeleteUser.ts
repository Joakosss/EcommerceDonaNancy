import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../../../store/useAuthStore";

function useMutateDeleteUser() {
  const { tokens, setAuth, logout } = useAuthStore();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/usuarios/${id}`,
          {
            headers: { Authorization: `Bearer ${tokens?.access_token}` },
          }
        );
        return response.data;
      } catch (error: any) {
        if (error.response.status == 401) {
          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/api/auth/refesh",
              { refresh_token: tokens?.refresh_token }
            );
            setAuth({
              access_token: response.data,
              refresh_token: tokens!.refresh_token,
              autorization: tokens!.autorization,
            });
            /* Se realiza la consulta nuevamente con el nuevo auth */
            const retryResponse = await axios.delete(
              "http://127.0.0.1:8000/api/usuarios",
              {
                params: { id_usuario: id },
                headers: { Authorization: `Bearer ${response.data}` },
              }
            );
            return retryResponse.data;
          } catch (error: any) {
            logout();
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

export default useMutateDeleteUser;
