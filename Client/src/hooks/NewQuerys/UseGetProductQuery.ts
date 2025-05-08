import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "../../types/ProductType";
import useAuthStore from "../../store/useAuthStore";




function useGetProductQuery() {
  const { tokens } = useAuthStore();
  const accesToken = tokens?.access_token;
  return useQuery({
    queryKey: ["productos"],
    queryFn: async () => {
      try {
        const response = await axios.get<ProductType>(
          "http://localhost:3000/productos",
          { headers: { Authorization: `Bearer ${accesToken}` } }
        );
      } catch (error) {
        throw error
      }
    },
  });
}

export default useGetProductQuery;
