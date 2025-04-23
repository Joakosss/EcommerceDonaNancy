import { useState } from "react";
import Spinner from "../../components/Spinner";
import { useProducts } from "../../hooks/useProducts";
import { ProductType } from "../../types/ProductType";
import { generateChileanPrice } from "../../utilities/generateChileanPrice";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from "../../components/Modal";
function ProductTable() {
  const {
    isLoading,
    isError,
    data: productos,
  } = useProducts({
    url: "http://localhost:3000/productos",
    /* filter: { id_categoria: filter }, */
  });

  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <div className="relative overflow-x-auto  sm:rounded-lg border-2 border-primary/10 min-h-100">
      <div className="pb-4  ">
        <h2 className="font-bold text-xl text-primary ml-1">
          Nuestros Productos
        </h2>
        <div className="relative mt-1 start-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm text-gray-900 border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary "
            placeholder="Buscar"
          />
        </div>
        <button
          className="m-1 flex items-center justify-center flex-col"
          onClick={() => setIsModal(true)}
        >
          <FaCirclePlus
            size={30}
            className="text-primary hover:text-primary/90 cursor-pointer"
          />
          <p className="text-sm">Crear</p>
        </button>
      </div>

      {isLoading && <Spinner />}
      {isError && (
        <h2 className="font-bold text-xl text-primary ml-1 text-center">
          Error al cargar reintentar más tarde:C
        </h2>
      )}
      {!isLoading && !isError && productos && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
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
              <Tr key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      )}
      {/* Extras */}
      <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
        <CreateProduct></CreateProduct>
      </Modal>
    </div>
  );
}

export default ProductTable;

function Tr({ producto }: { producto: ProductType }) {
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
      <td className="px-6 py-4">
        <button className="font-medium text-primary  hover:underline">
          Editar
        </button>
      </td>
    </tr>
  );
}

function CreateProduct() {
  return <div>Hola Putonas</div>;
}
