import ItemList from "./ItemList";
import PayZone from "./PayZone";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import cartC from "../../../images/CartC.svg";
import { useState } from "react";
import PayFormPage from "./PayFormPage";
import LoadingOverlay from "../../../components/LoadingOverlay";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../types/ProductType";
import { FormProvider, useForm } from "react-hook-form";
import usePay from "../../../hooks/usePay";
import usePayTransf from "../../../hooks/usePayTransf";

export type CheckoutFormType = {
  products: ProductType[];
  entrega: {
    fecha_entrega: Date;
    direccion_entrega?: string;
    id_sucursal?: string;
    id_tipo_entrega: string;
  };
  pedido: {
    id_forma_pago: string;
  };
  comprobante?: File;
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
    if (shoppingCart.length === 0) return;
    setStep(2);
  };
  /* Formulario y mutate */
  const methods = useForm<CheckoutFormType>();
  const { mutate, isPending } = usePay();
  const { mutate: mutateTransf, isPending: isPendingTransf } = usePayTransf();

  const handleSend = async (data: CheckoutFormType) => {
    const formData = new FormData();

    shoppingCart.forEach((item, idex) => {
      formData.append(
        `products[${idex}][id_producto]`,
        item.product.id_producto!
      );
      formData.append(`products[${idex}][cantidad]`, item.quantity.toString());
    });

    formData.append(
      "entrega[fecha_entrega]",
      data.entrega.fecha_entrega.toString()
    );
    formData.append("entrega[id_tipo_entrega]", isMethodDelivery);

    if (isMethodDelivery === "0") {
      //con retiro en tienda
      formData.append("entrega[sucursal]", data.entrega.id_sucursal || "0");
    } else {
      //con envio a domicilio
      formData.append(
        "entrega[direccion_entrega]",
        data.entrega.direccion_entrega || ""
      );
    }

    formData.append("pedido[id_forma_pago]", methodPayment);

    if (methodPayment === "3") {
      formData.append("comprobante", data.comprobante[0]);
    }

    if (methodPayment === "0") {
      //webpay
      mutate(
        {
          formData,
        },
        {
          onSuccess: (data) => {
            alert("entraste");
            redirectToWebPay(data.token, data.url);
          },
          onError: (err) => {
            alert(`error ${err}`);
          },
        }
      );
    } else {
      if (!data.comprobante) {
        alert("Falta comprobante");
        return;
      }
      if (isMethodDelivery === "0" && !data.entrega.id_sucursal) {
        alert("Falta sucursal");
        return;
      }
      mutateTransf(
        { formData },
        {
          onSuccess: (data) => {
            navigate(`/processPay/${data.pedido}`);
          },
          onError: (err) => {
            alert(err.message);
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
      {isPending || (isPendingTransf && <LoadingOverlay />)}
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

            <PayZone handleNextPage={handleNextPage} step={step} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ShopingCartPage;
