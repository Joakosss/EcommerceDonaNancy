import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";

export const useGetMutation = <
  TData = unknown, // tipo de la respuesta
  TError = unknown, // tipo de error
  TVariables = object, // shape de tus filtros
  TContext = unknown
>(
  mutationKey: readonly unknown[],
  url: string,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation({
    mutationKey,
    mutationFn: async (filters: TVariables) => {
      try {
        const response = await axios.get<TData>(url, { params: filters });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  });
};
