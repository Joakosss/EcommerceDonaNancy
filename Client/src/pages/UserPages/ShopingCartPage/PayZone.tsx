import { useNavigate } from "react-router-dom";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import { generateChileanPrice } from "../../../utilities/generateChileanPrice";
import MyButton from "../../../components/MyButton";
import useCreateBoleta from "../../../hooks/useCreateBoleta";
import { useEffect } from "react";

type PayZoneProps = {
  handleNextPage: () => void;
  step: 1 | 2;
};

function PayZone({ handleNextPage, step }: PayZoneProps) {
  const navigation = useNavigate();
  const { totalPrice, counterItems, shoppingCart, empty } =
    useShoppingCartStore();
  const discount = counterItems >= 4 ? totalPrice * 0.25 : 0;
  const { isSuccess, isError, isPending, mutate } = useCreateBoleta();
  const handleCreateBoleta = () => {
    const productosBasicos = shoppingCart.map((p) => ({
      id: p.product.id_producto,
      cantidad: p.quantity,
    }));
    const boleta = {
      fecha: new Date(),
      total: totalPrice,
      estado_boleta: 1,
      usuario: 1,
      forma_pago: 1,
      productos: [...productosBasicos],
    };
    mutate(boleta);
  };

  useEffect(() => {
    if (isSuccess) {
      empty();
      navigation("/");
    }
  }, [isSuccess]);

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
              onClick={() => {
                handleCreateBoleta();
              }}
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
        </div>
      </div>
    </>
  );
}

export default PayZone;
