import { useState } from "react";
import Spinner from "../../../components/Spinner";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import Modal from "../../../components/Modal";
import { FaDownload } from "react-icons/fa";
import CreateProduct from "../Forms/Product/CreateProduct"; //modificar
import DeleteProduct from "../Forms/Product/DeleteProduct"; //modificar
import useQueryGetPedidos from "../../../hooks/NewQuerys/pedidosQuerys/useQueryGetPedidos";
import { PedidoType } from "../../../types/PedidoType";
import { ComprasType } from "../../../types/ComprasType";
import { estadoEntregaActual } from "../../../utilities/estadoEntregaActual";
import { estadoPedidoActual } from "../../../utilities/estadoPedidoActual";
import { tipoEntregaActual } from "../../../utilities/tipoEntregaActual";
import { tipoPagoActual } from "../../../utilities/tipoPagoActual";
import VendedorUpdate from "../Forms/Orders/VendedorUpdate";
import useAuthStore from "../../../store/useAuthStore";
import ContadorUpdate from "../Forms/Orders/ContadorUpdate";
import BodegueroUpdate from "../Forms/Orders/BodegueroUpdate";
import { generatePdfBodeguero } from "../../../utilities/pdf/generatePdfBodeguero";

type ModalState =
  | { type: "create" }
  | { type: "update"; data: PedidoType }
  | { type: "delete"; data: string }
  | { type: null };

function OrdersTable() {
  const { tokens } = useAuthStore();
  const [modal, setModal] = useState<ModalState>({ type: null });
  const { data: pedidos, isError, isLoading } = useQueryGetPedidos();

  return (
    <div className="relative sm:rounded-lg border-2 border-primary/40">
      <div className="p-5">
        <h2 className="font-bold text-2xl text-primary ml-1">Pedidos</h2>
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
                  Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Forma envío
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Forma pago
                </th>
                {tokens?.autorization &&
                  ["3", "0"].includes(tokens.autorization) && (
                    <th scope="col" className="px-6 py-3 text-center">
                      Productos
                    </th>
                  )}
                {tokens?.autorization &&
                  ["4", "0"].includes(tokens.autorization) && (
                    <th scope="col" className="px-6 py-3 text-center">
                      Comprobante
                    </th>
                  )}
                {tokens?.autorization &&
                  !["0"].includes(tokens.autorization) && (
                    <th scope="col" className="px-6 py-3 text-center">
                      opciones
                    </th>
                  )}
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
        {modal.type === "update" && tokens?.autorization === "2" && (
          <VendedorUpdate
            key={123e8}
            id={modal.data.id_entrega!}
            onClose={() => setModal({ type: null })}
          />
        )}
        {modal.type === "update" && tokens?.autorization === "3" && (
          <BodegueroUpdate
            key={123e8}
            id={modal.data.id_pedido!}
            onClose={() => setModal({ type: null })}
          />
        )}
        {modal.type === "update" && tokens?.autorization === "4" && (
          <ContadorUpdate
            key={123e8}
            id={modal.data.id_pedido!}
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
  UpdateModal: (arg: string) => void;
  deleteModal: (arg: string) => void;
}) {
  const { tokens } = useAuthStore();
  return (
    <tr className="bg-white border-b   border-gray-200 hover:bg-gray-50 ">
      <td className="px-6 py-4 text-center">
        {pedido.id_estado_pedido === "3"
          ? estadoEntregaActual(pedido.entrega?.id_estado_entrega || "")
              ?.descripcion || "No hay"
          : estadoPedidoActual(pedido.id_estado_pedido)?.descripcion ||
            "No hay"}
      </td>
      <td
        scope="row"
        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap "
      >
        {pedido.fecha.toString()}
      </td>
      <td className="px-6 py-4 text-center">
        ${generateChileanPrice(pedido.total)}
      </td>
      <td className="px-6 py-4 text-center">{pedido.id_entrega}</td>
      <td className="px-6 py-4 text-center">
        {tipoEntregaActual(pedido.entrega?.id_tipo_entrega || "")
          ?.descripcion || "No hay"}
      </td>
      <td className="px-6 py-4 text-center">
        {tipoPagoActual(pedido.id_forma_pago)?.descripcion || "No hay"}
      </td>

      {tokens?.autorization && ["3", "0"].includes(tokens.autorization) && (
        <td className="px-6 py-4 text-center">
          <button
            className="flex items-center justify-center w-full h-full cursor-pointer"
            onClick={() => {
              generatePdfBodeguero(pedido);
            }}
          >
            <FaDownload className="text-gray-600" />
          </button>
        </td>
      )}
      {tokens?.autorization && ["4", "0"].includes(tokens.autorization) && (
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
      )}
      {tokens?.autorization && !["0"].includes(tokens.autorization) && (
        <td className="px-6 py-4 text-center flex flex-col">
          <button
            className="font-medium text-primary  hover:underline cursor-pointer"
            onClick={() => {
              UpdateModal(pedido.id_entrega);
            }}
          >
            Editar
          </button>
          {tokens?.autorization &&
            !["2", "4", "3"].includes(tokens.autorization) && (
              <button
                className="font-medium text-primary  hover:underline cursor-pointer"
                onClick={() => {
                  deleteModal(pedido.id_pedido!);
                }}
              >
                Eliminar
              </button>
            )}
        </td>
      )}
    </tr>
  );
}
