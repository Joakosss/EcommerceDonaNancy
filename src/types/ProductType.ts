import { CategoriaType } from "./CategoriaType";

export type ProductType = {
  id?: string;
  id_producto: string;
  nombre: string;
  descripcion: string;
  link_foto: string;
  precio: number;
  stock: number;
  id_categoria: string;
};
