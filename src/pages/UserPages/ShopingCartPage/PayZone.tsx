import { useNavigate } from "react-router-dom";
import useShoppingCartStore from "../../../store/useShoppingCartStore";



function PayZone() {

  const navigation = useNavigate()
  const {totalPrice,counterItems} = useShoppingCartStore()
  
  const discount = counterItems>=4 ? totalPrice*0.25 : 0

  return (
    <>
      <div className="bg-white rounded px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
        <ul className="text-slate-900 font-medium space-y-4">
          <li className="flex flex-wrap gap-4 text-sm">
            Subtotal <span className="ml-auto font-semibold">${totalPrice}</span>
          </li>
          <li className="flex flex-wrap gap-4 text-sm">
            Descuento <span className="ml-auto font-semibold">${discount}</span>
          </li>
          <hr className="border-slate-300" />
          <li className="flex flex-wrap gap-4 text-sm font-semibold">
            Total <span className="ml-auto">${totalPrice-discount}</span>
          </li>
        </ul>
        <div className="mt-8 space-y-2">
          <button
            type="button"
            className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md"
          >
            Pagar
          </button>
          <button
            type="button"
            className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-md"
            onClick={()=>navigation("/productos/")}
          >
            Continuar comprando
          </button>
        </div>
      </div>
    </>
  );
}

export default PayZone;
