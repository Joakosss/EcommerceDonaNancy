import { useParams } from "react-router-dom";
import TrendingProducts from "../../../components/TrendingProducts";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import MyButton from "../../../components/MyButton";
import { useGetQuery } from "../../../hooks/query/useGetQuery";
import { ProductType } from "../../../types/ProductType";
import { useQueryClient } from "@tanstack/react-query";
import useExchange from "../../../store/useExchangeStore";
type Props = {};

function ProductPage({}: Props) {
  const queryClient = useQueryClient();
  const DolarCache = queryClient.getQueryData<number>(["Dolar"]);
  const { exchange } = useExchange();

  const { id } = useParams();
  const { data, isLoading, isError } = useGetQuery<ProductType[]>(
    ["producto", id],
    "http://localhost:3000/productos",
    {
      params: { id: id }, // aplica filtro o no segun corresponda
    }
  );
  const product = data?.[0];
  const { add } = useShoppingCartStore();
  const handleAddProductCart = () => {
    add(product!);
  };

  return (
    <>
      {!isLoading && !isError && product ? (
        <>
          <section className="py-8 bg-white md:py-16 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                  <img className="w-full " src={product?.link_foto} alt="" />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                    {product?.nombre}
                  </h1>
                  <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                    <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                      {exchange === "CLP"
                        ? `$${generateChileanPrice(product!.precio)}`
                        : `$${
                            Math.round((product!.precio / DolarCache!) * 100) /
                            100
                          } USD`}
                    </p>
                  </div>

                  <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                    <MyButton
                      type="button"
                      variant="secondary"
                      onClick={() => handleAddProductCart()}
                      preBuildChildren="shopingCart"
                    ></MyButton>
                  </div>
                  <hr className="my-6 md:my-8 border-gray-200" />
                  <p className="mb-6 text-gray-500">{product?.descripcion}</p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Cargando */
        <>
          <section className="py-8 bg-white md:py-16 antialiased animate-pulse">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
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

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <div className="h-7 bg-gray-200 rounded-full w-full mb-4"></div>
                  <div className="h-7 bg-gray-200 rounded-full max-w-[200px] mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-lg max-w-[150px] mb-4"></div>
                  <hr className="my-6 md:my-8 border-gray-200" />
                  {/*  */}
                  <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-full max-w-[250px] mb-4"></div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <TrendingProducts />
    </>
  );
}

export default ProductPage;
