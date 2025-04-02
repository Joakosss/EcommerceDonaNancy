import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../../utilities/generateSlug";
import { ProductType } from "../../../types/ProductType";
import useShoppingCartStore from "../../../store/useShoppingCartStore";

type ProductCardProps = {
  product: ProductType
};

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const {add} = useShoppingCartStore()
  const handleAddProductCart = ()=>{
    add(product!)
  }

  const handleNavigate = (id: string) => {
    const slugName = generateSlug(product.nombre)
    navigate(`/producto/${id}/${slugName}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {/* Imagen */}
      <div className="h-56 w-full">
        <a href="" onClick={() => handleNavigate(product.id_producto)}>
          <img className="w-full h-full object-contain" src={product.foto} alt="" />
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
            ${product.precio}
          </p>

          <button
            type="button"
            className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-primary-700 focus:z-10"
            onClick={()=>handleAddProductCart()}
          >
            <svg
              className="-ms-2 me-2 h-5 w-5"
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
      </div>
    </div>
  );
}

export default ProductCard;
