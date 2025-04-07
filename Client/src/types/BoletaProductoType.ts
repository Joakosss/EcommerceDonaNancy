import { BoletaType } from "./BoletaType";
import { ProductType } from "./ProductType";

export type BoletaProductoType = {
  cantidad: number;
  boleta: BoletaType;
  producto: ProductType;
};
