import { useParams } from "react-router-dom";
import TrendingProducts from "../../../components/TrendingProducts";
import { useSearchProduct } from "../../../hooks/useSearchProduct";
import useShoppingCartStore from "../../../store/useShoppingCartStore";

type Props = {};

function ProductPage({}: Props) {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useSearchProduct(id!);
  const {add} = useShoppingCartStore()
  const handleAddProductCart = ()=>{
    add(product!)
  }

  return (
    <>
      <section className="py-8 bg-white md:py-16 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img className="w-full " src={product?.foto} alt="" />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                {product?.nombre}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  ${product?.precio}
                </p>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  onClick={()=>handleAddProductCart()}
                  title=""
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-primary-700 focus:z-10"
                  role="button"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Añadir al carro
                </button>
              </div>

              <hr className="my-6 md:my-8 border-gray-200" />

              <p className="mb-6 text-gray-500">{product?.descripcion}</p>
            </div>
          </div>
        </div>
      </section>
      <TrendingProducts />
    </>
  );
}

export default ProductPage;
