import ItemList from "./ItemList";
import PayZone from "./PayZone";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import cartC from "../../../images/CartC.svg";
import { useEffect, useLayoutEffect, useState } from "react";
import PayFormPage from "./PayFormPage";
import LoadingOverlay from "../../../components/LoadingOverlay";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../types/ProductType";
import { FormProvider, useForm } from "react-hook-form";
import usePay from "../../../hooks/usePay";
import { EntregaType } from "../../../types/EntregaType";
import { PedidoType } from "../../../types/PedidoType";

export type CheckoutFormType = {
  products: ProductType[];
  entrega: {
    fecha_entrega: Date;
    direccion_entrega?: string;
    id_sucursal?: string;
    id_tipo_entrega: string;
  };
  pedido: {
    comprobante_pago?: string;
    id_forma_pago: string;
  };
};

function ShopingCartPage() {
  const { tokens } = useAuthStore();
  const navigate = useNavigate();
  const { shoppingCart } = useShoppingCartStore();

  /* Estados de flujo */
  const [isMethodDelivery, setIsMethodDelivery] = useState<string>("0");
  const [methodPayment, setMethodPayment] = useState<string>("0");
  const [step, setStep] = useState<1 | 2>(1);

  const handleNextPage = () => {
    if (!tokens || !tokens.access_token) {
      navigate("/login");
      return;
    }
    setStep(2);
  };
  /* Formulario y mutate */
  const methods = useForm<CheckoutFormType>();
  const { mutate, isPending } = usePay();

  const handleSend = async (data: CheckoutFormType) => {
    const products: { id_producto: string; cantidad: number }[] = [];
    for (const item of shoppingCart) {
      products.push({
        id_producto: item.product.id_producto!,
        cantidad: item.quantity,
      });
    }
    console.log(products)
    if (methodPayment === "0") {
      //pago con webpay
      const entrega: EntregaType = {
        fecha_entrega: data.entrega.fecha_entrega,
        id_tipo_entrega: isMethodDelivery,
      };
      if (isMethodDelivery === "0") {
        //si es con retiro
        entrega.sucursal = data.entrega.id_sucursal;
      } else {
        //si es con envio
        entrega.direccion_entrega = data.entrega.direccion_entrega;
      }
      const pedido: PedidoType = {
        id_forma_pago: methodPayment,
      };
      mutate(
        {
          products,
          entrega,
          pedido,
        },
        {
          onSuccess: (data) => {
            alert("entraste");
            redirectToWebPay(data.token, data.url);
          },
          onError: (err) => {
            alert(err);
          },
        }
      );
    }
  };

  const redirectToWebPay = (token: string, url: string) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token_ws";
    input.value = token;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="h-full flex flex-col max-w-5xl max-md:max-w-xl mx-auto p-4 ">
      {isPending && <LoadingOverlay />}
      <h1 className="text-2xl font-bold text-slate-900">Tu carrito</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSend)}>
          <div className="grid md:grid-cols-3 gap-10 mt-8">
            <div className="md:col-span-2 space-y-4">
              {/* Aqui van los productos comprados */}

              {step === 1 ? (
                shoppingCart.length > 0 ? (
                  shoppingCart.map((product) => (
                    <ItemList
                      key={product.product.id_producto}
                      product={product}
                    />
                  ))
                ) : (
                  <div className="grid place-items-center">
                    <img src={cartC} className="max-h-[255px]" />
                    <h4 className="text-2xl font-bold text-[#1c4364]">
                      Tu carrito está vacío
                    </h4>
                  </div>
                )
              ) : (
                <PayFormPage
                  handleSetIsMethodDelivery={setIsMethodDelivery}
                  isMethodDelivery={isMethodDelivery}
                  methodPayment={methodPayment}
                  handleSetMethodPayment={setMethodPayment}
                />
              )}
            </div>

            <PayZone
              handleNextPage={handleNextPage}
              step={step}
              methodPayment={methodPayment}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ShopingCartPage;
