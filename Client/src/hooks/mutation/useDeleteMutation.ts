import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
  } from "@tanstack/react-query";
  import axios from "axios";
  
  export const useDeleteMutation = <
  TData = unknown,
  TError = unknown,
  TContext = unknown
  >(
    url: string,
    options?: UseMutationOptions<TData, TError,void, TContext>
  ): UseMutationResult<TData, TError,void, TContext> => {
    return useMutation({
      mutationFn: async () => {
        try {
          const response = await axios.delete(url);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      ...options,
    });
  };
  