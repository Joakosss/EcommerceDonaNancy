import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "../types/ProductType";
import { generateChileanPrice } from "../utilities/generateChileanPrice";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../utilities/generateSlug";
import cartC from "../images/CartC.svg";

export default function Example() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["TrendingProducts"],
    queryFn: async (): Promise<ProductType[]> => {
      const response = await axios.get(
        "http://localhost:3000/PedidosPopulares"
      );
      return response.data;
    },
  });

  const navigate = useNavigate();

  const handleNavigate = (product: ProductType) => {
    const slugName = generateSlug(product.nombre);
    navigate(`/producto/${product.id}/${slugName}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Productos Populares
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          {isError &&
            Array.from({ length: 4 }).map((_, i) => <ErrorSkeleton key={i} />)}
          {!isLoading &&
            !isError &&
            products &&
            products.map((product) => (
              <div key={product.id} className="group relative">
                <img
                  alt={product.nombre}
                  src={product.link_foto}
                  loading="lazy"
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  decoding="async"
                />
                <div className="mt-4 h-[48px] max-h-[48px]">
                  <h3 className="text-sm text-gray-700">
                    <a href="" onClick={() => handleNavigate(product)}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.nombre}
                    </a>
                  </h3>
                </div>
                <p className="text-xl font-medium text-gray-900">
                  ${generateChileanPrice(product.precio)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
      {/* Imagen */}
      <div className="h-56 w-full">
        <svg
          className="w-full h-full text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>

      {/* Titulo */}
      <div className="pt-6 h-[48px] max-h-[48px]">
        <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>
      </div>

      {/* Precio */}
      <div className="mt-4 w-full">
        <div className="h-5 bg-gray-200 rounded-full max-w-[150px]"></div>
      </div>
    </div>
  );
};

const ErrorSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {/* Imagen */}
      <div className="h-56 w-full">
        <img
          src={cartC}
          alt="Imagen de error"
          className="w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Titulo */}
      <div className="pt-6 h-[48px] max-h-[48px] text-center">
        <p className="text-xl font-medium text-[#1c4364]">Error al cargar :C</p>
      </div>
    </div>
  );
};
