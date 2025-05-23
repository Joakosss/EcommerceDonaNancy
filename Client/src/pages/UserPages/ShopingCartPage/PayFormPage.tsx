import { useFormContext } from "react-hook-form";
import { methodPaymentConstants } from "../../../constants/methodPaymentConstants";
import { tipoEntregaConstants } from "../../../constants/tipoEntregaConstants";
import { CheckoutFormType } from "./ShopingCartPage";
import { SucursalType } from "../../../types/SucursalType";
import { getSucursales } from "../../../hooks/getSucursales";
import { useState } from "react";
import Modal from "../../../components/Modal";

type PayFormPageProps = {
  methodPayment: string;
  handleSetMethodPayment: (methodPayment: string) => void;
  isMethodDelivery: string;
  handleSetIsMethodDelivery: (methodPayment: string) => void;
};

function PayFormPage({
  methodPayment,
  handleSetMethodPayment,
  isMethodDelivery,
  handleSetIsMethodDelivery,
}: PayFormPageProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormType>();

  const sucursales = getSucursales();
  const [isModalTransf, setIsModalTransf] = useState<boolean>(false);

  return (
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 ">
            Métodos de envío
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tipoEntregaConstants.map((entrega) => (
              <MethodSelector
                key={entrega.id}
                data={entrega}
                handleOnChage={handleSetIsMethodDelivery}
                isData={isMethodDelivery}
                nameRadio="delivery-method"
              />
            ))}
          </div>
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 ">
                Preparemos tu compra
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fecha_entrega"
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    Fecha Entrega*
                  </label>
                  {errors.entrega?.direccion_entrega && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.entrega.direccion_entrega.message}
                    </p>
                  )}
                  <input
                    type="date"
                    id="fecha_entrega"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  "
                    {...register("entrega.fecha_entrega", {
                      required: "Es requerido",
                    })}
                  />
                </div>
                {isMethodDelivery === "0" && (
                  <>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <label
                          htmlFor="select-city-input-3"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Sucursal Entrega*
                        </label>
                        {errors.entrega?.id_sucursal && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.entrega.id_sucursal.message}
                          </p>
                        )}
                      </div>
                      <select
                        id="select-city-input-3"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  "
                        defaultValue={""}
                        {...register("entrega.id_sucursal", {
                          required: {
                            value: isMethodDelivery === "0",
                            message: "Debe seleccionar sucursal",
                          },
                        })}
                      >
                        <option value="">Selecciona</option>
                        {sucursales.data &&
                          sucursales.data.map((sucursal: SucursalType) => (
                            <option key={sucursal.nombre} value={sucursal.id}>
                              {sucursal.nombre}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}
                {isMethodDelivery === "1" && (
                  <>
                    <div className="col-span-2">
                      <label
                        htmlFor="direccion_entrega"
                        className="mb-2 block text-sm font-medium text-gray-900 "
                      >
                        Dirección*
                      </label>
                      {errors.entrega?.direccion_entrega && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.entrega.direccion_entrega.message}
                        </p>
                      )}
                      <input
                        type="text"
                        placeholder="Ingresa tu dirección"
                        id="direccion_entrega"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  "
                        {...register("entrega.direccion_entrega", {
                          required: "Es requerido",
                        })}
                      />
                    </div>
                  </>
                )}
                {methodPayment === "3" && (
                  <div>
                    <label
                      htmlFor="fileTransferencia"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      Comprobante de Pago*{" "}
                      <button
                        className="text-primary hover:text-red-700 cursor-pointer"
                        onClick={() => setIsModalTransf(true)}
                      >
                        {" "}
                        Datos
                      </button>
                    </label>
                    {errors.entrega?.direccion_entrega && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.comprobante?.message}
                      </p>
                    )}
                    <input
                      type="file"
                      id="fileTransferencia"
                      accept="image/jpeg, image/png, image/gif"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  "
                      {...register("comprobante")}
                    />
                    <small className="text-gray-500 text-sm">
                      Formatos: JPG, PNG, GIF. Máximo 5MB.
                    </small>
                    {/* Example popover using React state */}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Métodos de pago
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {methodPaymentConstants.map((method) => (
                  <MethodSelector
                    key={method.descripcion}
                    data={method}
                    handleOnChage={handleSetMethodPayment}
                    isData={methodPayment}
                    nameRadio="payment-method"
                    subText={method.subText}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        key="datosTransferencias"
        isOpen={isModalTransf}
        onClose={() => {
          setIsModalTransf(false);
        }}
      >
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Pago por Transferencia Bancaria
          </h3>
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900 mb-3">
              Datos para transferencia:
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Banco:</strong> Banco Estado
              </p>
              <p>
                <strong>Tipo de cuenta:</strong> Cuenta Corriente
              </p>
              <p>
                <strong>Número de cuenta:</strong> 100100100
              </p>
              <p>
                <strong>RUT:</strong> 100100100-1
              </p>
              <p>
                <strong>Nombre:</strong> Dona Nancy
              </p>
              <p>
                <strong>Email:</strong> DonaNancy@DonaNancy.cl
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PayFormPage;

type MethodSelectorProp = {
  data: any;
  isData: any;
  handleOnChage: (id: string) => void;
  nameRadio: string;
  subText?: string;
};
function MethodSelector({
  data,
  isData,
  handleOnChage,
  nameRadio,
  subText,
}: MethodSelectorProp) {
  return (
    <div
      key={data.descripcion}
      className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4"
    >
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id={data.id}
            type="radio"
            name={nameRadio}
            value={data.id}
            checked={isData === data.id}
            onChange={() => handleOnChage(data.id)}
            className="h-4 w-4 border-gray-300 bg-white text-primary-600"
          />
        </div>

        <div className="ms-4 text-sm">
          <label
            htmlFor={nameRadio}
            className="font-medium leading-none text-gray-900"
          >
            {data.descripcion}
            {subText && (
              <p
                id="transferencia-text"
                className="mt-1 text-xs font-normal text-gray-500"
              >
                {subText}
              </p>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
