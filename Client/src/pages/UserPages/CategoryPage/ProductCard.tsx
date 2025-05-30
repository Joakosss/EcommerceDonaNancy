import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../../utilities/generateSlug";
import { ProductType } from "../../../types/ProductType";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import MyButton from "../../../components/MyButton";
import { useQueryClient } from "@tanstack/react-query";
import useExchange from "../../../store/useExchangeStore";

type ProductCardProps = {
  product: ProductType;
};

function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient();
  const DolarCache = queryClient.getQueryData<number>(["Dolar"]);
  const { exchange } = useExchange();

  const navigate = useNavigate();
  const { add } = useShoppingCartStore();
  const handleAddProductCart = () => {
    add(product!);
  };
  const handleNavigate = (id: string) => {
    const slugName = generateSlug(product.nombre);
    navigate(`/producto/${id}/${slugName}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {/* Imagen */}
      <div className="h-56 w-full">
        <a href="" onClick={() => handleNavigate(product.id_producto!)}>
          <img
            className="w-full h-full object-contain"
            src={product.link_foto}
            alt=""
          />
        </a>
      </div>
      <div className="pt-6">
        {/* Titulo */}
        <div className="h-[48px] max-h-[48px]">
          <a
            href=""
            onClick={() => handleNavigate(product.id_producto!)}
            className="line-clamp-2 text-lg font-semibold leading-tight text-gray-900 hover:underline"
          >
            {product.nombre}
          </a>
        </div>
        {/* Precio */}
        <div className="mt-1 flex flex-col  gap-2">
          <p className="text-xl font-medium leading-tight text-gray-900">
            {exchange === "CLP"
              ? `$${generateChileanPrice(product.precio)}`
              : `$${
                  Math.round((product.precio / DolarCache!) * 100) / 100
                } USD`}
          </p>
          <MyButton
            type="button"
            variant="secondary"
            onClick={() => handleAddProductCart()}
            preBuildChildren="shopingCart"
          ></MyButton>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
