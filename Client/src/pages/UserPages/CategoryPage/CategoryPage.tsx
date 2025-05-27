import useQueryGetProduct from "../../../hooks/NewQuerys/productQuerys/useQueryGetProduct";
import { productCategoryTypesConstants } from "../../../constants/productCategoryTypesConstants";
import { Navigate, useParams } from "react-router-dom";
import OptionBar from "./OptionBar";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function CategoryPage() {
  const { category } = useParams();
  const categoryId = productCategoryTypesConstants.find(
    (cat) => cat.slug === category
  )?.id;

  const [isModeloFilter, setIsModeloFilter] = useState<string | "">("");
  const [isMarcaFilter, setIsMarcaFilter] = useState<string | "">("");

  /* Si categoria no existe redirecciona a error */
  if (!categoryId) return <Navigate to={"*"} />;

  useEffect(() => {
    setIsModeloFilter("");
  }, [category]);

  /* Hooks que trae los productos */
  const {
    data: productos,
    isLoading,
    isError,
  } = useQueryGetProduct({
    id_categoria: categoryId,
    id_modelo: isModeloFilter,
    id_marca: isMarcaFilter,
  });

  /* Si existe se ejecuta normalmente */
  return (
    <section className="bg-gray-50 py-8 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* <!-- Heading & Filters --> */}
        <main className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Productos
            </h1>
          </div>
        </main>

        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-1">
            <OptionBar
              key={"optionBar"}
              categoryId={categoryId}
              setIsMarcaFilter={setIsMarcaFilter}
              setIsModeloFilter={setIsModeloFilter}
            />
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4  col-start-2 col-end-7">
            {/* Si carga */}
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            {/* Si es error */}
            {isError && <div>Error :C</div>}
            {/* Si no es cargando ni es error y si hay productos */}
            {!isLoading &&
              !isError &&
              productos &&
              productos.map(
                (product) =>
                  product.stock > 0 && (
                    <ProductCard key={product.id_producto} product={product} />
                  )
              )}
            {/* Si todo va bien pero no hay productos */}
            {!isLoading && !isError && !productos && <p>No hay productos :C</p>}
          </div>
        </div>

        {/* Aqui van los productos */}
      </div>
    </section>
  );
}

export default CategoryPage;
