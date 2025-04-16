import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { PedidoType } from "../../../types/PedidoType";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";

function MyPurchasesPage() {
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  const {
    data: misCompras,
    isError,
    isLoading,
  } = useQuery<PedidoType[]>({
    queryKey: ["misCompras"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/PEDIDOS");
      console.log(response.data);
      return response.data;
    },
  });

  const statusClass = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800";
      case "Procesando":
        return "bg-yellow-100 text-yellow-800";
      case "Pagado":
        return "bg-blue-100 text-blue-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      case "Pendiente":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!misCompras) {
    return <div>Hola</div>;
  }

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
          {misCompras.map((compra) => (
            <div
              key={compra.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setOpenOrder(openOrder === compra.id ? null : compra.id)
                }
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900">
                        Orden {compra.id}
                      </span>
                      <span
                        /* Aqui modificar el status segun como esté */
                        className={`px-3 py-1 rounded-full text-xs font-medium  ${statusClass(
                          compra.estado_boleta === "Pagado"
                            ? compra.Entrega.estado_entrega
                            : compra.estado_boleta
                        )}`}
                      >
                        {compra.estado_boleta === "Pagado"
                          ? compra.Entrega.estado_entrega
                          : compra.estado_boleta}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Fecha compra:{" "}
                      {new Date(compra.fecha_pedido).toLocaleDateString(
                        "es-CL"
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${generateChileanPrice(compra.total)}
                    </p>
                  </div>
                </div>
              </div>

              {openOrder === compra.id && (
                <div className="border-t border-gray-100 animate-fade-in">
                  <div className="p-6 space-y-6">
                    {/* Items */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-4">
                        Productos adquiridos
                      </h3>
                      <div className="space-y-4">
                        {compra.Productos.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4"
                          >
                            <img
                              src={item.link_foto}
                              alt={item.nombre}
                              className="w-16 h-16 object-cover rounded-md border border-gray-200"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {item.nombre}
                              </p>
                              <p className="text-sm text-gray-500">
                                Cantidad: {item.cantidad}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              ${item.precio_unitario}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">
                            Datos de Entrega
                          </p>
                          <p>{compra.Entrega.direccion}</p>
                          <p>
                            {new Date(
                              compra.Entrega.fecha_entrega
                            ).toLocaleDateString("es-CL")}
                          </p>
                          <p>{compra.Entrega.estado_entrega}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">
                            Método de Pago
                          </p>
                          <p>{compra.forma_pago}</p>
                          {/* <p>Card: **** **** **** {"order.payment.last4"}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                    <div className="flex justify-end space-x-4">
                      <button
                        className="px-4 py-2 bg-red-600 rounded-md text-sm font-medium text-white cursor-pointer disabled:opacity-50 disabled:cursor-default"
                        disabled={
                          compra.Entrega.estado_entrega === "Entregado" ||
                          compra.Entrega.estado_entrega === "Enviado"
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
        </div>
      </div>
    </div>
  );
}

export default MyPurchasesPage;
