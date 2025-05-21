import { useFormContext } from "react-hook-form";
import { methodPaymentConstants } from "../../../constants/methodPaymentConstants";
import { tipoEntregaConstants } from "../../../constants/tipoEntregaConstants";
import { CheckoutFormType } from "./ShopingCartPage";

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
    setValue,
    formState: { errors },
  } = useFormContext<CheckoutFormType>();

  const handleDeliveryChange = (value: string) => {
    handleDeliveryChange(value);
    setValue("entrega.id_tipo_entrega", value);
    if (value === "0") {
      setValue("entrega.direccion_entrega", undefined);
    } else {
      setValue("entrega.id_sucursal", undefined);
    }
  };
  const handlePaymentMethodChange = (value: string) => {
    handleSetMethodPayment(value);
    setValue("pedido.id_forma_pago", value);
  };
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
                {isMethodDelivery === "0" && (
                  <>
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
                      >
                        <option value={""}>San Francisco</option>
                        <option value="NY">New York</option>
                        <option value="LA">Los Angeles</option>
                        <option value="CH">Chicago</option>
                        <option value="HU">Houston</option>
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

/* function PaymentInput() {
  return (
    <>
      <div>
        <label
          htmlFor="fecha_entrega"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          Fecha Entrega*
        </label>
        <input
          type="date"
          id="fecha_entrega"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  "
          {...register("fecha_entrega", { required: "Es requerido" })}
        />
      </div>
      <div>
        <div className="mb-2 flex items-center gap-2">
          <label
            htmlFor="select-city-input-3"
            className="block text-sm font-medium text-gray-900"
          >
            Sucursal Entrega*
          </label>
        </div>
        <select
          id="select-city-input-3"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  "
          defaultValue={""}
        >
          <option value={""}>San Francisco</option>
          <option value="NY">New York</option>
          <option value="LA">Los Angeles</option>
          <option value="CH">Chicago</option>
          <option value="HU">Houston</option>
        </select>
      </div>
    </>
  );
}
 */
