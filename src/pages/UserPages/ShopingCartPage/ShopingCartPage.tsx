import ItemList from "./ItemList";
import PayZone from "./PayZone";
import useShoppingCartStore from "../../../store/useShoppingCartStore";

type Props = {};

function ShopingCartPage({}: Props) {
  const {shoppingCart} = useShoppingCartStore()

  return (
    <div className="h-full flex flex-col max-w-5xl max-md:max-w-xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold text-slate-900">Tu carrito</h1>
      <div className="grid md:grid-cols-3 gap-10 mt-8">
        <div className="md:col-span-2 space-y-4">
          {/* Aqui van los productos comprados */}
          {shoppingCart.map((product)=>(
            <ItemList
              key={product.product.id_producto}
              product={product}
            />
          ))}
        </div>

        <PayZone />
      </div>
    </div>
  );
}

export default ShopingCartPage;






