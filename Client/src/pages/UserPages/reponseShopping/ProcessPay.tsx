import { useEffect } from "react";
import useShoppingCartStore from "../../../store/useShoppingCartStore";
import happyCart from "../../../images/HappyCart.svg";

function ProcessPay() {
  const { empty } = useShoppingCartStore();
  useEffect(() => {
    empty();
  }, []);

  return (
    <>
      <div className="grid place-items-center">
        <img src={happyCart} className="max-h-[450px]" />
        <h4 className="text-2xl font-bold text-[#1c4364]">
          Compra en proceso de validación
        </h4>
      </div>
    </>
  );
}

export default ProcessPay;
