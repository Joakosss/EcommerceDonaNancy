import { useState } from "react";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import useQueryGetMisPedidos from "../../../hooks/NewQuerys/pedidosQuerys/useQueryGetMisPedidos";
import { estadoPedidoConstants } from "../../../constants/estadoPedidoConstants";
import { estadoEntregaConstants } from "../../../constants/estadoEntregaConstants";
import { useQueryClient } from "@tanstack/react-query";
import useExchange from "../../../store/useExchangeStore";
import { ComprasType } from "../../../types/ComprasType";
import { tipoEntregaConstants } from "../../../constants/tipoEntregaConstants";
import { methodPaymentConstants } from "../../../constants/methodPaymentConstants";
import { FaDownload } from "react-icons/fa";

function MyPurchasesPage() {
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const { data: misCompras, isLoading } = useQueryGetMisPedidos();
  const queryClient = useQueryClient();
  const DolarCache = queryClient.getQueryData<number>(["Dolar"]);
  const { exchange } = useExchange();

  const statusClass = (status: string) => {
    switch (status) {
      case "Revisando Pago":
        return "bg-yellow-100 text-yellow-800";
      case "Rechazado":
        return "bg-red-100 text-red-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      case "En proceso":
        return "bg-blue-100 text-blue-800";
      case "Despachado":
        return "bg-green-100 text-green-800";
      case "Entregado":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const estadoEntregaActual = (id_estado_entrega: string) => {
    return estadoEntregaConstants.find(
      (estado) => estado.id === id_estado_entrega
    );
  };

  const estadoPedidoActual = (id_estado_pedido: string) => {
    return estadoPedidoConstants.find(
      (estado) => estado.id === id_estado_pedido
    );
  };

  const handleOpenClose = (id_pedido: string) => {
    if (id_pedido !== openOrder) {
      setOpenOrder(id_pedido);
      return;
    }
    setOpenOrder("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis compras</h1>
          <p className="text-gray-600 mt-2">
            Consulta tus compras recientes y el estado de tus pedidos
          </p>
        </div>

        <div className="space-y-6">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
          {!isLoading &&
            (misCompras?.length ?? 0) > 0 &&
            misCompras?.map((compra) => (
              <div
                key={compra.id_entrega}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleOpenClose(compra.id_pedido)}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-900">
                          Orden {compra.id_pedido}
                        </span>
                        <span
                          /* Aqui modificar el status segun como esté */
                          className={`px-3 py-1 rounded-full text-xs font-medium  ${statusClass(
                            compra.id_estado_pedido === "3" //esto es si estada pagado
                              ? estadoEntregaActual(
                                  compra.entrega.id_estado_entrega
                                )?.descripcion ?? ""
                              : estadoPedidoActual(compra.id_estado_pedido)
                                  ?.descripcion ?? ""
                          )}`}
                        >
                          {compra.id_estado_pedido === "3"
                            ? estadoEntregaActual(
                                compra.entrega.id_estado_entrega
                              )?.descripcion
                            : estadoPedidoActual(compra.id_estado_pedido)
                                ?.descripcion}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Fecha compra:{" "}
                        {new Date(compra.fecha).toLocaleDateString("es-CL")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {exchange === "CLP"
                          ? `$${generateChileanPrice(compra.total)}`
                          : `$${
                              Math.round((compra.total / DolarCache!) * 100) /
                              100
                            } USD`}
                      </p>
                    </div>
                  </div>
                </div>

                {openOrder === compra.id_pedido && (
                  <div className="border-t border-gray-100 animate-fade-in">
                    <div className="p-6 space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-4">
                          Productos adquiridos
                        </h3>
                        <div className="space-y-4">
                          {/* Items */}
                          {compra.productos.map((item) => (
                            <div
                              key={item.id_pedido_producto}
                              className="flex items-center space-x-4"
                            >
                              <img
                                src={item.producto.link_foto}
                                alt={item.producto.nombre}
                                className="w-16 h-16 object-cover rounded-md border border-gray-200"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.producto.nombre}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Cantidad: {item.cantidad}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {exchange === "CLP"
                                  ? `$${generateChileanPrice(compra.total)}`
                                  : `$${
                                      Math.round(
                                        (compra.total / DolarCache!) * 100
                                      ) / 100
                                    } USD`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Zona datos de entrega */}
                      <ZonaEntrega compra={compra} />
                    </div>
                    {/* Actions */}
                    <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                      <div className="flex justify-end space-x-4">
                        <button
                          className="px-4 py-2 bg-red-600 rounded-md text-sm font-medium text-white cursor-pointer disabled:opacity-50 disabled:cursor-default"
                          disabled={
                            estadoEntregaActual(
                              compra.entrega.id_estado_entrega
                            )?.descripcion === "Entregado" ||
                            estadoEntregaActual(
                              compra.entrega.id_estado_entrega
                            )?.descripcion === "Despachado"
                          }
                        >
                          Cancelar Compra
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          {!isLoading && (misCompras?.length ?? 0) === 0 && (
            <div>No tienes compras</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPurchasesPage;

function Skeleton() {
  return (
    <div className="bg-gray-300 rounded-lg shadow-sm border border-gray-200 animate-pulse h-22"></div>
  );
}

function ZonaEntrega({ compra }: { compra: ComprasType }) {
  const tipoEntregaActual = (id_tipo_entrega: string) => {
    return tipoEntregaConstants.find((tipo) => tipo.id === id_tipo_entrega);
  };
  const tipoPagoActual = (id_tipo_pago: string) => {
    return methodPaymentConstants.find((tipo) => tipo.id === id_tipo_pago);
  };
  return (
    <>
      {compra.entrega.id_tipo_entrega === "0" && ( //entrega en tienda
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="font-medium text-gray-900">
                Entrega:{" "}
                {tipoEntregaActual(compra.entrega.id_tipo_entrega)?.descripcion}
              </p>
              <p>
                {compra.entrega.sucursal.nombre}{" "}
                <strong>{compra.entrega.sucursal.direccion}</strong>
              </p>
              <p>
                Fecha de entrega:{" "}
                {new Date(compra.entrega.fecha_entrega).toLocaleDateString(
                  "es-CL"
                )}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">
                Método de Pago:{" "}
                {tipoPagoActual(compra.id_forma_pago)?.descripcion}
              </p>
              {compra.id_forma_pago === "3" && ( //transferencia
                <p className="font-medium text-gray-900 flex gap-3">
                  Comprobante
                  <a
                    href={`http://localhost:4000${compra.comprobante_pago}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDownload className="text-gray-900" />
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {compra.entrega.id_tipo_entrega === "1" && ( //Envio a domicilio
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="font-medium text-gray-900">
                Entrega:{" "}
                {tipoEntregaActual(compra.entrega.id_tipo_entrega)?.descripcion}
              </p>
              <p>
                Dirección: <strong>{compra.entrega.direccion_entrega}</strong>
              </p>
              <p>
                Fecha de entrega:{" "}
                {new Date(compra.entrega.fecha_entrega).toLocaleDateString(
                  "es-CL"
                )}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">
                Método de Pago:{" "}
                {tipoPagoActual(compra.id_forma_pago)?.descripcion}
              </p>
              {compra.id_forma_pago === "3" && ( //transferencia
                <p className="font-medium text-gray-900 flex gap-3">
                  Comprobante
                  <a
                    href={`http://localhost:4000${compra.comprobante_pago}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDownload className="text-gray-900" />
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
