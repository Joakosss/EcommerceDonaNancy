import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
  } from "@tanstack/react-query";
  import axios, { AxiosRequestHeaders} from "axios";
  
  export const useDeleteMutation = <
  TData = unknown, 
  TError = unknown,
  TContext = unknown
  >(
    url: string,
    options?: UseMutationOptions<TData, TError, AxiosRequestHeaders, TContext>,
  ): UseMutationResult<TData, TError,AxiosRequestHeaders, TContext> => {
    return useMutation({
      mutationFn: async (headers:AxiosRequestHeaders) => {
        try {
          const response = await axios.delete(url,{headers});
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      ...options,
    });
  };
  