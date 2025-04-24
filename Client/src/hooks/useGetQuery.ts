import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

/**
 * Custom hook para hacer una petición GET con axios y React Query.
 * @template TData - Tipo de los datos que devuelve la petición.
 * @template TError - Tipo del error esperado.
 * @template TQueryKey - Tipo de la clave del query.
 *
 * @param {Array} queryKey - Clave única para el query (usada por React Query para caching).
 * @param {string} url - URL de la API.
 * @param {AxiosRequestConfig} [axiosConfig] - Configuración opcional de Axios (headers, params, etc.).
 * @param {UseQueryOptions} [options] - Opciones de React Query como onSuccess, onError, etc.
 *
 * @returns {UseQueryResult} - Resultado del hook de consulta.
 */
export function useGetQuery<
  TData = unknown,
  TError = unknown,
  TQueryKey extends readonly unknown[] = any[]
>(
  queryKey: TQueryKey,
  url: string,
  axiosConfig?: AxiosRequestConfig,
  options?: UseQueryOptions<TData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get<TData>(url, axiosConfig);
      return response.data;
    },
    ...options,
  });
}
