import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../../utilities/generateSlug";
import { ProductType } from "../../../types/ProductType";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import MyButton from "../../../components/MyButton";
type ProductCardProps = {
  product: ProductType;
};

function ProductCard({ product }: ProductCardProps) {
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
        <a href="" onClick={() => handleNavigate(product.id_producto)}>
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
            onClick={() => handleNavigate(product.id_producto)}
            className="min-h-[150px] text-lg font-semibold leading-tight text-gray-900 hover:underline "
          >
            {product.nombre}
          </a>
        </div>
        {/* Precio */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-bold leading-tight text-gray-900">
            ${generateChileanPrice(product.precio)}
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