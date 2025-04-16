import { PedidoType } from "./PedidoType";
import { ProductType } from "./ProductType";

export type PedidoProductoType = {
  cantidad: number;
  boleta: PedidoType;
  producto: ProductType;
};
