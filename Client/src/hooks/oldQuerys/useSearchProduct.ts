import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../../types/ProductType";
import axios from "axios";

export const useSearchProduct = (id:string)=>{
    return useQuery<ProductType>({
        queryKey: ["producto",id],
        queryFn: async (): Promise<ProductType> => {
          const response = await axios.get(`http://localhost:3000/productos?id_producto=${id}`);
          return response.data[0];
        },
      });
}