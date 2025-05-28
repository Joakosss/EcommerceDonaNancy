import { useState } from "react";
import Spinner from "../../../components/Spinner";
import { ProductType } from "../../../types/ProductType";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import Modal from "../../../components/Modal";
import { FaDownload, FaSearch } from "react-icons/fa";
import CreateProduct from "../Forms/Product/CreateProduct";
import UpdateProduct from "../Forms/Product/UpdateProduct";
import DeleteProduct from "../Forms/Product/DeleteProduct";
import { productCategoryTypesConstants } from "../../../constants/productCategoryTypesConstants";
import useQueryGetPedidos from "../../../hooks/NewQuerys/pedidosQuerys/useQueryGetPedidos";
import { PedidoType } from "../../../types/PedidoType";
import { ComprasType } from "../../../types/ComprasType";
import { estadoEntregaActual } from "../../../utilities/estadoEntregaActual";
import { estadoPedidoActual } from "../../../utilities/estadoPedidoActual";
import { tipoEntregaActual } from "../../../utilities/tipoEntregaActual";
import { tipoPagoActual } from "../../../utilities/tipoPagoActual";

type ModalState =
  | { type: "create" }
  | { type: "update"; data: PedidoType }
  | { type: "delete"; data: string }
  | { type: null };

function OrdersTable() {
  const { data: pedidos, isError, isLoading } = useQueryGetPedidos();
  const [isFilter, setIsFilter] = useState<string>("");
  console.log(pedidos);
  const [modal, setModal] = useState<ModalState>({ type: null });

  return (
    <div className="relative sm:rounded-lg border-2 border-primary/40">
      <div className="p-5">
        <h2 className="font-bold text-2xl text-primary ml-1">Pedidos</h2>
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
          </div>
        </div>
      </div>

      {isLoading && <Spinner />}
      {isError && (
        <h2 className="font-bold text-xl text-primary ml-1 text-center">
          Error al cargar reintentar más tarde:C
        </h2>
      )}
      {!isLoading && !isError && pedidos && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Estado compra
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Fecha compra
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Forma envío
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Forma pago
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  comprobante
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pedidos?.map((pedido) => (
                <Tr
                  key={pedido.id_pedido}
                  pedido={pedido}
                  UpdateModal={() => setModal({ type: "update", data: pedido })}
                  deleteModal={() =>
                    setModal({ type: "delete", data: pedido.id_pedido })
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

export default OrdersTable;

function Tr({
  pedido,
  UpdateModal,
  deleteModal,
}: {
  pedido: ComprasType;
  UpdateModal: (arg: ProductType) => void;
  deleteModal: (arg: string) => void;
}) {
  return (
    <tr className="bg-white border-b   border-gray-200 hover:bg-gray-50 ">
      <td className="px-6 py-4 text-center">
        {pedido.id_estado_pedido === "3"
          ? estadoEntregaActual(pedido.entrega?.id_estado_entrega || "")
              ?.descripcion || "No hay"
          : estadoPedidoActual(pedido.id_estado_pedido)?.descripcion ||
            "No hay"}
      </td>
      {/* Aqui iria el estado de la compra */}
      <th
        scope="row"
        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap "
      >
        {pedido.fecha.toString()}
      </th>
      <td className="px-6 py-4 text-center">${generateChileanPrice(pedido.total)}</td>
      <td className="px-6 py-4 text-center">{pedido.id_usuario}</td>
      <td className="px-6 py-4 text-center">
        {tipoEntregaActual(pedido.entrega?.id_tipo_entrega || "")?.descripcion || "No hay"}
      </td>
      <td className="px-6 py-4 text-center">
        {tipoPagoActual(pedido.id_forma_pago)?.descripcion || "No hay"}
      </td>
      <td className="px-6 py-4 text-center">
        {pedido.comprobante_pago ? (
          <a
            href={`http://localhost:4000${pedido.comprobante_pago}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full"
          >
            <FaDownload className="text-gray-600" />
          </a>
        ) : (
          "Sin comprobante"
        )}
      </td>
      <td className="px-6 py-4 text-center flex flex-col">
        <button
          className="font-medium text-primary  hover:underline cursor-pointer"
          onClick={() => {
            /* UpdateModal(pedido); */
          }}
        >
          Editar
        </button>
        <button
          className="font-medium text-primary  hover:underline cursor-pointer"
          onClick={() => {
            deleteModal(pedido.id_pedido!);
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
