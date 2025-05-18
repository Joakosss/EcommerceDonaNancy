import { ProductType } from "../../../types/ProductType";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Props = {
  products: ProductType[];
};

function ListProduct({}: Props) {
  return (
    <>
      {/* Borrar */}
      <ProductCardSkeleton></ProductCardSkeleton>
      <ProductCardSkeleton></ProductCardSkeleton>
      <ProductCardSkeleton></ProductCardSkeleton>
      <ProductCardSkeleton></ProductCardSkeleton>
      <ProductCardSkeleton></ProductCardSkeleton>
      <ProductCardSkeleton></ProductCardSkeleton>
      {/* Borrar fin */}
      {/*       {isLoading || isError
        ? Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i}></ProductCardSkeleton>
          ))
          : productos!.map((producto: ProductType) => (
            <ProductCard key={producto.id} product={producto} />
            ))} */}
    </>
  );
}

export default ListProduct;
