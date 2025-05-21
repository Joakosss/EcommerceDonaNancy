import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { EntregaType } from "../types/EntregaType";
import { PedidoType } from "../types/PedidoType";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

type usePayProps = {
  products: { id_producto: string; cantidad: number }[];
  entrega: EntregaType;
  pedido: PedidoType;
};

const paymentRequest = async (
  products: { id_producto: string; cantidad: number }[],
  entrega: EntregaType,
  pedido: PedidoType,
  accessToken: string
) => {
  return await axios.post(
    "http://localhost:4000/webpay/create",
    {
      products,
      entrega,
      pedido,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

const usePay = () => {
  const { tokens, logout, setAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ products, entrega, pedido }: usePayProps) => {
      if (!tokens?.access_token || !tokens?.refresh_token) {
        logout();
        navigate("/");
        throw new Error("No hay tokens de autenticación");
      }
      try {
        const response = await paymentRequest(
          products,
          entrega,
          pedido,
          tokens?.access_token
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
            const retryResponse = await paymentRequest(
              products,
              entrega,
              pedido,
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
          error.response?.data.detail || "La solicitud de pago falló"
        );
      }
    },
  });
};

export default usePay;
