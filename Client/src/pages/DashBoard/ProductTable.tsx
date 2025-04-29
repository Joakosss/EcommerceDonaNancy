import { useState } from "react";
import Spinner from "../../components/Spinner";
import { ProductType } from "../../types/ProductType";
import { generateChileanPrice } from "../../utilities/generateChileanPrice";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from "../../components/Modal";
import { FaSearch } from "react-icons/fa";
import CreateProduct from "./Forms/Product/CreateProduct";
import { useGetQuery } from "../../hooks/query/useGetQuery";
import UpdateProduct from "./Forms/Product/UpdateProduct";
import DeleteProduct from "./Forms/Product/DeleteProduct";
import { productCategoryTypesConstants } from "../../constants/productCategoryTypesConstants";

function ProductTable() {
  const [isFilter, setIsFilter] = useState<string>("");
  const {
    // Trae los productos
    isLoading,
    isError,
    data: productos,
  } = useGetQuery<ProductType[]>(
    ["productos", isFilter],
    "http://localhost:3000/productos",
    {
      params: isFilter ? { id_categoria: isFilter } : {},
    }
  );

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isModalProduct, setIsModalProduct] = useState<ProductType | null>(
    null
  );
  const [isModalDeleteProduct, setIsModalDeleteProduct] = useState<
    string | null
  >(null);

  return (
    <div className="relative sm:rounded-lg border-2 border-primary/40">
      <div className="p-5">
        <h2 className="font-bold text-2xl text-primary ml-1">
          Nuestros Productos
        </h2>
        <div className="flex justify-between">
          <form className="flex items-center max-w-sm mx-auto">
            <label htmlFor="simple-search" className="sr-only">
              Buscar
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Buscar por nombre"
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border  hover:bg-primary/80 focus:ring-4 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Buscar</span>
            </button>
          </form>

          <div className="flex gap-8">
            <Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setIsFilter(e.target.value)
              }
              value={isFilter}
            />
            <button
              className="m-1 flex items-center justify-center flex-col"
              onClick={() => setIsModal(true)}
            >
              <FaCirclePlus
                size={30}
                className="text-primary hover:text-primary/90 cursor-pointer"
              />
              <p className="text-sm text-primary">Crear</p>
            </button>
          </div>
        </div>
      </div>

      {isLoading && <Spinner />}
      {isError && (
        <h2 className="font-bold text-xl text-primary ml-1 text-center">
          Error al cargar reintentar más tarde:C
        </h2>
      )}
      {!isLoading && !isError && productos && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  link foto
                </th>
                <th scope="col" className="px-6 py-3">
                  precio
                </th>
                <th scope="col" className="px-6 py-3">
                  stock
                </th>
                <th scope="col" className="px-6 py-3">
                  opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {productos?.map((producto: ProductType) => (
                <Tr
                  key={producto.id}
                  producto={producto}
                  setIsModalProduct={setIsModalProduct}
                  setIsModalDeleteProduct={setIsModalDeleteProduct}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Extras */}
      <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
        <CreateProduct onClose={() => setIsModal(false)} />
      </Modal>
      {isModalProduct !== null && (
        <Modal isOpen={true} onClose={() => setIsModalProduct(null)}>
          <UpdateProduct
            product={isModalProduct}
            onClose={() => setIsModalProduct(null)}
          />
        </Modal>
      )}
      {isModalDeleteProduct !== null && (
        <Modal isOpen={true} onClose={() => setIsModalDeleteProduct(null)}>
          <DeleteProduct
            idProduct={isModalDeleteProduct}
            onClose={() => setIsModalDeleteProduct(null)}
          />
        </Modal>
      )}
    </div>
  );
}

export default ProductTable;

function Tr({
  producto,
  setIsModalProduct,
  setIsModalDeleteProduct,
}: {
  producto: ProductType;
  setIsModalProduct: (arg: ProductType) => void;
  setIsModalDeleteProduct: (arg: string) => void;
}) {
  return (
    <tr className="bg-white border-b   border-gray-200 hover:bg-gray-50 ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        {producto.nombre}
      </th>
      <td className="px-6 py-4">{producto.link_foto}</td>
      <td className="px-6 py-4">${generateChileanPrice(producto.precio)}</td>
      <td className="px-6 py-4">{producto.stock}</td>
      <td className="px-6 py-4 flex flex-col">
        <button
          className="font-medium text-primary  hover:underline cursor-pointer"
          onClick={() => {
            setIsModalProduct(producto);
          }}
        >
          Editar
        </button>
        <button
          className="font-medium text-primary  hover:underline cursor-pointer"
          onClick={() => {
            setIsModalDeleteProduct(producto.id!);
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

function Select({ ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="mt-3" id="tipoUsuarioSelect">
      <select
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 cursor-pointer outline-none"
      >
        <option value="">Todos</option>
        {productCategoryTypesConstants.map((productCategory) => (
          <option key={productCategory.id} value={productCategory.id}>
            {productCategory.descripcion}
          </option>
        ))}
      </select>
    </div>
  );
}
