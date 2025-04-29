import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
  } from "@tanstack/react-query";
  import axios from "axios";
  
  /**
   * Custom hook para hacer un POST con axios y React Query.
   * @param {string} url - URL de la API.
   * @param {object} options - Opciones de configuración para el hook (onSuccess, onError, etc.).
   * @param {any} TBody - objetos que le pasaremos en el body
   * @param {any} TContext - onsucces onerror
   */
  
  export const usePatchMutation = <
    TData = unknown,
    TError = unknown,
    TVariables = any,
    TContext = unknown
  >(
    url: string,
    options?: UseMutationOptions<TData, TError, TVariables, TContext>
  ): UseMutationResult<TData, TError, TVariables, TContext> => {
    return useMutation({
      mutationFn: async (body: TVariables) => {
        try {
          const response = await axios.patch(url, body);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      ...options,
    });
  };
  