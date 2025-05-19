import { ProductType } from "../../../types/ProductType";
import ProductCard from "./ProductCard";

type Props = {
  products: ProductType[];
};

function ListProduct({ products }: Props) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id_categoria} product={product} />
      ))}
    </>
  );
}

export default ListProduct;
