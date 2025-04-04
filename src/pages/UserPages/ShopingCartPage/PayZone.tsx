import { useNavigate } from "react-router-dom";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import MyButton from "../../../components/MyButton";

function PayZone() {
  const navigation = useNavigate();
  const { totalPrice, counterItems } = useShoppingCartStore();

  const discount = counterItems >= 4 ? totalPrice * 0.25 : 0;

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
          <MyButton onClick={() => {}} variant="primary">
            Pagar
          </MyButton>
          <MyButton
            onClick={() => navigation("/productos/")}
            variant="secondaryFull"
          >
            Continuar comprando
          </MyButton>
        </div>
      </div>
    </>
  );
}

export default PayZone;
