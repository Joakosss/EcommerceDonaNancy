import ItemList from "./ItemList";
import PayZone from "./PayZone";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import cartC from "../../../images/CartC.svg";
import { useState } from "react";
import PayFormPage from "./PayFormPage";
import LoadingOverlay from "../../../components/LoadingOverlay";
type Props = {};

function ShopingCartPage({}: Props) {
  const [methodPayment, setMethodPayment] = useState<
    "Webpay" | "Transferencia"
  >("Transferencia");

  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2>(1);
  const { shoppingCart } = useShoppingCartStore();
  const hanldeNextPage = () => {
    setStep(2);
  };

  return (
    <div className="h-full flex flex-col max-w-5xl max-md:max-w-xl mx-auto p-4 ">
      {loading && <LoadingOverlay />}
      <h1 className="text-2xl font-bold text-slate-900">Tu carrito</h1>
      <div className="grid md:grid-cols-3 gap-10 mt-8">
        <div className="md:col-span-2 space-y-4">
          {/* Aqui van los productos comprados */}

          {step === 1 ? (
            shoppingCart.length > 0 ? (
              shoppingCart.map((product) => (
                <ItemList key={product.product.id_producto} product={product} />
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
              methodPayment={methodPayment}
              handleSetMethodPayment={setMethodPayment}
            />
          )}
        </div>

        <PayZone
          handleNextPage={hanldeNextPage}
          handleLoading={setLoading}
          step={step}
          methodPayment={methodPayment}
        />
      </div>
    </div>
  );
}

export default ShopingCartPage;
