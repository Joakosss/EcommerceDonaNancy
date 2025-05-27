import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

type usePayProps = {
  formData: FormData;
};

const paymentRequest = async (formData: FormData, accessToken: string) => {
  return await axios.post(
    "http://localhost:4000/transferencias/compraComprobante",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const usePayTransf = () => {
  const { tokens, logout, setAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ formData }: usePayProps) => {
      if (!tokens?.access_token || !tokens?.refresh_token) {
        logout();
        navigate("/");
        throw new Error("No hay tokens de autenticación");
      }
      try {
        const response = await paymentRequest(formData, tokens?.access_token);
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
            const retryResponse = await paymentRequest(
              formData,
              response.data.access_token
            );
            return retryResponse.data;
          } catch (error: unknown) {
            logout();
            navigate("/");
            if (axios.isAxiosError(error)) {
              throw new Error(error.response?.data.detail || "Sesión expirada");
            }
            throw new Error("Sesión expirada");
          }
        }
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.detail || "La solicitud de pago falló");
        }
        throw new Error("La solicitud de pago falló");
      }
    },
  });
};

export default usePayTransf;
