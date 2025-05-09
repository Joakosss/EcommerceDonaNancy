import ProductCard from "./ProductCard";
import { useState } from "react";
import { ProductType } from "../../../types/ProductType";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useGetQuery } from "../../../hooks/query/useGetQuery";
type Props = {};

function CategoryPage({}: Props) {
  /* Hooks que trae los productos */
  const [filter, setFilter] = useState<string>("");
  const {
    isLoading,
    isError,
    data: productos,
  } = useGetQuery<ProductType>(
    ["productos", filter],
    "http://localhost:3000/productos",
    {
      params: filter ? { id_categoria: filter } : {}, // aplica filtro o no segun corresponda
    }
  );

  const handleFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <section className="bg-gray-50 py-8 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* <!-- Heading & Filters --> */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Productos
            </h1>
            <form className="max-w-sm">
              <select
                onChange={(e) => handleFilter(e.target.value)}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="" selected>
                  Filtrar
                </option>
                <option value="1">Ropa</option>
                <option value="2">Electrónicos</option>
                <option value="3">Muebles</option>
                <option value="4">Zapatos</option>
                <option value="5">Varios</option>
              </select>
            </form>
          </div>
        </main>

        {/* Aqui van los productos */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading || isError
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i}></ProductCardSkeleton>
              ))
            : productos!.map((producto: ProductType) => (
                <ProductCard key={producto.id} product={producto} />
              ))}
        </div>

        <div className="w-full text-center">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            Show more
          </button>
        </div>
      </div>
    </section>
  );
}

export default CategoryPage;
