import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import { ProductType } from "../../../types/ProductType";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from "../../../components/Modal";
import { FaSearch } from "react-icons/fa";
import CreateProduct from "../Forms/Product/CreateProduct";
import UpdateProduct from "../Forms/Product/UpdateProduct";
import DeleteProduct from "../Forms/Product/DeleteProduct";
import useQueryGetProduct from "../../../hooks/NewQuerys/productQuerys/useQueryGetProduct";
import { marcasConstants } from "../../../constants/marcasConstants";
import { modelosConstants } from "../../../constants/modelosConstants";
import { productCategoryTypesConstants } from "../../../constants/productCategoryTypesConstants";
import useAuthStore from "../../../store/useAuthStore";

type ModalState =
  | { type: "create" }
  | { type: "update"; data: ProductType }
  | { type: "delete"; data: string }
  | { type: null };

function ProductTable() {
  const { tokens } = useAuthStore();
  const [isModeloFilter, setIsModeloFilter] = useState<string | "">("");
  const [isMarcaFilter, setIsMarcaFilter] = useState<string | "">("");
  const [isCategoriaFilter, setIsCategoriaFilter] = useState<string | "">("");
  const [isPreNameFilter, setIsPreNameFilter] = useState<string>("");
  const [isNameFilter, setIsNameFilter] = useState<string>("");
  const {
    data: productos,
    isLoading,
    isError,
  } = useQueryGetProduct({
    id_categoria: isCategoriaFilter,
    id_modelo: isModeloFilter,
    id_marca: isMarcaFilter,
    nombre: isNameFilter,
  });

  const [modal, setModal] = useState<ModalState>({ type: null });

  /* UseEffect para no mandar consultas cada vez que modificamos el input */
  useEffect(() => {
    const handler = setTimeout(() => {
      setIsNameFilter(isPreNameFilter);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  });

  return (
    <div className="relative sm:rounded-lg border-2 border-primary/40">
      <div className="p-5">
        <h2 className="font-bold text-2xl text-primary ml-1">
          Nuestros Productos
        </h2>
        <div className="flex justify-between">
          <div className="flex items-center max-w-sm mx-auto">
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
                onChange={(e) => setIsPreNameFilter(e.target.value)}
                value={isPreNameFilter}
              />
            </div>
            <button
              type="button"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border  hover:bg-primary/80 focus:ring-4 cursor-pointer"
              onClick={
                isPreNameFilter !== "" && isPreNameFilter !== isNameFilter
                  ? () => {
                      setIsNameFilter(isPreNameFilter);
                    }
                  : () => {}
              }
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
          </div>

          <div className="flex gap-2">
            <Select
              mensaje="Filtrar categoria"
              data={productCategoryTypesConstants}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setIsCategoriaFilter(e.target.value)
              }
              value={isCategoriaFilter}
            />
            <Select
              mensaje="Filtrar modelos"
              data={modelosConstants}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setIsModeloFilter(e.target.value)
              }
              value={isModeloFilter}
            />
            <Select
              mensaje="Filtrar marcas"
              data={marcasConstants}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setIsMarcaFilter(e.target.value)
              }
              value={isMarcaFilter}
            />
            {tokens?.autorization &&
              !["2", "4"].includes(tokens.autorization) && (
                <button
                  className="m-1 flex items-center justify-center flex-col"
                  onClick={() => setModal({ type: "create" })}
                >
                  <FaCirclePlus
                    size={30}
                    className="text-primary hover:text-primary/90 cursor-pointer"
                  />
                  <p className="text-sm text-primary">Crear</p>
                </button>
              )}
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
                {tokens?.autorization &&
                  !["2", "4"].includes(tokens.autorization) && (
                    <th scope="col" className="px-6 py-3">
                      opciones
                    </th>
                  )}
              </tr>
            </thead>
            <tbody>
              {productos?.map((producto: ProductType) => (
                <Tr
                  key={producto.id_producto}
                  producto={producto}
                  UpdateModal={() =>
                    setModal({ type: "update", data: producto })
                  }
                  deleteModal={() =>
                    setModal({ type: "delete", data: producto.id_producto! })
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* modales */}
      <Modal
        key={"modal"}
        isOpen={modal.type !== null}
        onClose={() => setModal({ type: null })}
      >
        {modal.type === "create" && (
          <CreateProduct onClose={() => setModal({ type: null })} />
        )}
        {modal.type === "update" && (
          <UpdateProduct
            product={modal.data}
            onClose={() => setModal({ type: null })}
          />
        )}
        {modal.type === "delete" && (
          <DeleteProduct
            idProduct={modal.data}
            onClose={() => setModal({ type: null })}
          />
        )}
      </Modal>
    </div>
  );
}

export default ProductTable;

function Tr({
  producto,
  UpdateModal,
  deleteModal,
}: {
  producto: ProductType;
  UpdateModal: (arg: ProductType) => void;
  deleteModal: (arg: string) => void;
}) {
  const { tokens } = useAuthStore();
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
      {tokens?.autorization && !["2", "4"].includes(tokens.autorization) && (
        <td className="px-6 py-4 flex flex-col">
          <button
            className="font-medium text-primary  hover:underline cursor-pointer"
            onClick={() => {
              UpdateModal(producto);
            }}
          >
            Editar
          </button>
          <button
            className="font-medium text-primary  hover:underline cursor-pointer"
            onClick={() => {
              deleteModal(producto.id_producto!);
            }}
          >
            Eliminar
          </button>
        </td>
      )}
    </tr>
  );
}

type OptionItem = {
  id: string | number;
  descripcion: string;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  data: OptionItem[];
  mensaje: string;
}

function Select({ mensaje, data, ...props }: SelectProps) {
  return (
    <div className="mt-3" id="tipoUsuarioSelect">
      <select
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 cursor-pointer outline-none"
      >
        <option value="">{mensaje}</option>
        {data.map((object) => (
          <option key={object.id} value={object.id}>
            {object.descripcion}
          </option>
        ))}
      </select>
    </div>
  );
}
