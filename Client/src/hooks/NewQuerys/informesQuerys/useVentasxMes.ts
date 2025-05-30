import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";

const axiosQuery = async (accessToken: string) => {
  return await axios.get("http://localhost:8000/api/informes/ventas_por_mes", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

function useVentasxMes() {
  const { tokens, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["ventas_mes"],
    mutationFn: async () => {
      if (!tokens || !tokens.access_token || !tokens.refresh_token) {
        logout();
        navigate("/");
        throw new Error(
          "Sesión expirada. Por favor, inicie sesión nuevamente."
        );
      }
      try {
        const response = await axiosQuery(tokens.access_token);
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
            const retryResponse = await axiosQuery(response.data.access_token);
            return retryResponse.data;
          } catch (error: any) {
            navigate("/");
            logout();
            throw new Error(error.response?.data.detail || "Sesión expirada");
          }
        }
        throw new Error(
          error.response?.data.detail || "La solicitud de stock bajo falló"
        );
      }
    },
    onSuccess: (data) => {
      const wb = utils.book_new();
      const ws = utils.json_to_sheet(data);
      // Añadir la hoja al libro
      utils.book_append_sheet(wb, ws, "Ventas por mes");
      writeFile(wb, "reporte_ventas_mes.xlsx"); //descarga el excel con los datos 
    },
  });
}

export default useVentasxMes;
