import { useNavigate } from "react-router-dom";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import MyButton from "../../../components/MyButton";
import useExchange from "../../../store/useExchangeStore";
import { useQueryClient } from "@tanstack/react-query";

type PayZoneProps = {
  handleNextPage: () => void;
  step: 1 | 2;
};

function PayZone({ handleNextPage, step }: PayZoneProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { exchange } = useExchange();
  const DolarCache = queryClient.getQueryData<number>(["Dolar"]);
  const { totalPrice, counterItems } = useShoppingCartStore();
  const discount = counterItems >= 4 ? totalPrice * 0.25 : 0;

  return (
    <>
      <div className="bg-white rounded px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
        <ul className="text-slate-900 font-medium space-y-4">
          <li className="flex flex-wrap gap-4 text-sm">
            Subtotal{" "}
            <span className="ml-auto font-semibold">
              {exchange === "CLP"
                ? `$${generateChileanPrice(totalPrice)}`
                : `$${Math.round((totalPrice / DolarCache!) * 100) / 100} USD`}
            </span>
          </li>
          <li className="flex flex-wrap gap-4 text-sm">Descuentos:</li>
          {discount >= 4 && (
            <>
              <li className="flex flex-wrap gap-4 text-sm">
                25% Off{" "}
                <span className="ml-auto font-semibold">
                  {exchange === "CLP"
                    ? `$${generateChileanPrice(discount)}`
                    : `$${
                        Math.round((discount / DolarCache!) * 100) / 100
                      } USD`}
                </span>
              </li>
            </>
          )}
          <hr className="border-slate-300" />
          <li className="flex flex-wrap gap-4 text-sm font-semibold">
            Total{" "}
            <span className="ml-auto">
              {exchange === "CLP"
                ? `$${generateChileanPrice(totalPrice - discount)}`
                : `$${Math.round(((totalPrice - discount) / DolarCache!) * 100) / 100} USD`}
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
            <MyButton variant="primary" type="submit">
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
