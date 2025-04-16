import { useNavigate } from "react-router-dom";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import MyButton from "../../../components/MyButton";
import axios from "axios";

type PayZoneProps = {
  handleNextPage: () => void;
  handleLoading: (bool: boolean) => void;
  step: 1 | 2;
  methodPayment: "Webpay" | "Transferencia";
};

function PayZone({
  handleNextPage,
  handleLoading,
  step,
  methodPayment,
}: PayZoneProps) {
  const navigation = useNavigate();
  const { totalPrice, counterItems, shoppingCart } = useShoppingCartStore();
  const discount = counterItems >= 4 ? totalPrice * 0.25 : 0;

  const createProducts = () => {
    const productosBasicos = shoppingCart.map((p) => ({
      id: p.product.id_producto,
      quantity: p.quantity,
      price: p.product.precio /* Esto se puede borrar a futuro */,
    }));
    return productosBasicos;
  };

  const handlebuyWebPay = async () => {
    handleLoading(true);
    const products = createProducts();
    try {
      const response = await axios.post("http://localhost:4000/webpay/create", {
        amount: 5000,
        products: products,
      });
      const { token, url } = response.data;
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
    } catch (error) {
      handleLoading(false);
    }
  };

  const handleBuyTransferencia = () => {
    alert("pagando con transferencia");
  };
  return (
    <>
      <div className="bg-white rounded px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
        <ul className="text-slate-900 font-medium space-y-4">
          <li className="flex flex-wrap gap-4 text-sm">
            Subtotal{" "}
            <span className="ml-auto font-semibold">
              ${generateChileanPrice(totalPrice)}
            </span>
          </li>
          <li className="flex flex-wrap gap-4 text-sm">Descuentos:</li>
          {discount >= 4 && (
            <>
              <li className="flex flex-wrap gap-4 text-sm">
                25% Off{" "}
                <span className="ml-auto font-semibold">
                  ${generateChileanPrice(discount)}
                </span>
              </li>
            </>
          )}
          <hr className="border-slate-300" />
          <li className="flex flex-wrap gap-4 text-sm font-semibold">
            Total{" "}
            <span className="ml-auto">
              ${generateChileanPrice(totalPrice - discount)}
            </span>
          </li>
        </ul>
        <div className="mt-8 space-y-2">
          {step === 1 && (
            <MyButton
              onClick={() => {
                handleNextPage();
              }}
              variant="primary"
            >
              Seguir con el pago
            </MyButton>
          )}
          {step === 2 && (
            <MyButton
              onClick={
                methodPayment === "Webpay"
                  ? handlebuyWebPay
                  : handleBuyTransferencia
              }
              variant="primary"
            >
              Pagar
            </MyButton>
          )}
          <MyButton
            onClick={() => navigation("/productos/")}
            variant="secondaryFull"
          >
            Continuar comprando
          </MyButton>

          {/*           <Wallet
            initialization={{ preferenceId: preference! }}
            customization={{ theme: "dark" }}
          /> */}
        </div>
      </div>
    </>
  );
}

export default PayZone;
