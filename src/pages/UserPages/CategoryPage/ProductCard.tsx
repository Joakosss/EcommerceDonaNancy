import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  id: number;
  title: string;
  imgLink: string;
  price: number;
};

function ProductCard({ title, imgLink, price, id }: ProductCardProps) {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {/* Imagen */}
      <div className="h-56 w-full">
        <a href="" onClick={() => handleNavigate(id)}>
          <img className="w-full h-full object-contain" src={imgLink} alt="" />
        </a>
      </div>
      <div className="pt-6">
        {/* Titulo */}
        <div className="h-[48px] max-h-[48px]">
          <a
            href=""
            onClick={() => handleNavigate(id)}
            className="min-h-[150px] text-lg font-semibold leading-tight text-gray-900 hover:underline "
          >
            {title}
          </a>
        </div>
        {/* Precio */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-bold leading-tight text-gray-900">
            ${price}
          </p>

          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus:ring-4  focus:ring-primary-300 "
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
