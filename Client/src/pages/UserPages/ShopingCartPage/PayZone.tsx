import { useNavigate } from "react-router-dom";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import MyButton from "../../../components/MyButton";
import { useFormContext } from "react-hook-form";

type PayZoneProps = {
  handleNextPage: () => void;
  step: 1 | 2;
  methodPayment: string;
};

function PayZone({ handleNextPage, step, methodPayment }: PayZoneProps) {
  const navigate = useNavigate();
  const { totalPrice, counterItems } = useShoppingCartStore();
  const discount = counterItems >= 4 ? totalPrice * 0.25 : 0;

  const { handleSubmit } = useFormContext();

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
          {step === 1 ? (
            <MyButton
              onClick={() => {
                handleNextPage();
              }}
              variant="primary"
              type="button"
            >
              Seguir con el pago
            </MyButton>
          ) : (
            <MyButton
              variant="primary"
              type="submit"
            >
              Pagar
            </MyButton>
          )}
          <MyButton onClick={() => navigate("/")} variant="secondaryFull">
            Continuar comprando
          </MyButton>
        </div>
      </div>
    </>
  );
}

export default PayZone;
