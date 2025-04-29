import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

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
      try {
        const response = await axios.get<TData>(url, axiosConfig);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  });
}
