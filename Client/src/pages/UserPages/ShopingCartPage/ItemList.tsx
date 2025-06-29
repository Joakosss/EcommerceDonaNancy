import { useNavigate } from "react-router-dom";
import useShoppingCartStore, {
  ProductCartType,
} from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import { generateSlug } from "../../../utilities/generateSlug";
import { useQueryClient } from "@tanstack/react-query";
import useExchange from "../../../store/useExchangeStore";
type ItemCompraProps = {
  product: ProductCartType;
};

function ItemList({ product }: ItemCompraProps) {
  const queryClient = useQueryClient();
  const { exchange } = useExchange();
  const DolarCache = queryClient.getQueryData<number>(["Dolar"]);

  const { destroy, decrease, increase } = useShoppingCartStore();
  const navigate = useNavigate();

  const handleDestroyItem = () => {
    destroy(product.product.id_producto!);
  };
  const handleNavigate = (id: string) => {
    const slugName = generateSlug(product.product.nombre);
    navigate(`/producto/${id}/${slugName}`);
  };

  return (
    <>
      <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
        <div className="flex gap-4">
          <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
            <img
              src={product.product.link_foto}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <a
                href=""
                onClick={() => handleNavigate(product.product.id_producto!)}
                className="min-h-[150px] text-lg font-semibold leading-tight text-gray-900 hover:underline "
              >
                {product.product.nombre}
              </a>
            </div>

            {/* Botones cantidad productos */}
            <div className="mt-auto flex items-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center w-5 h-5  bg-slate-800 outline-none rounded-full cursor-pointer"
                onClick={() => decrease(product.product.id_producto!)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 fill-white"
                  viewBox="0 0 124 124"
                >
                  <path
                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
              <span className="font-semibold text-sm leading-[18px]">
                {product.quantity}
              </span>
              <button
                type="button"
                className="flex items-center justify-center w-5 h-5 bg-slate-800 outline-none rounded-full cursor-pointer"
                onClick={() => increase(product.product.id_producto!)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 fill-white"
                  viewBox="0 0 42 42"
                >
                  <path
                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="ml-auto flex flex-col">
          {/* SVG Eliminar */}
          <div className="flex items-start gap-4 justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
              viewBox="0 0 24 24"
              onClick={() => handleDestroyItem()}
            >
              <path
                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                data-original="#000000"
              ></path>
              <path
                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                data-original="#000000"
              ></path>
            </svg>
          </div>
          {/* Precio */}
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-auto">
            {exchange === "CLP"
              ? `$${generateChileanPrice(product.product.precio)}`
              : `$${
                  Math.round((product.product.precio / DolarCache!) * 100) / 100
                } USD`}
          </h3>
        </div>
      </div>
    </>
  );
}

export default ItemList;
