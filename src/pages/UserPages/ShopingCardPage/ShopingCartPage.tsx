import ItemList from "./ItemList";
import PayZone from "./PayZone";

type Props = {};

function ShopingCartPage({}: Props) {
  return (
    <div className="h-full flex flex-col max-w-5xl max-md:max-w-xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold text-slate-900">Tu carrito</h1>
      <div className="grid md:grid-cols-3 gap-10 mt-8">
        <div className="md:col-span-2 space-y-4">
          {/* Aqui van los productos comprados */}
          <ItemList
            key={1}
            price={500}
            imgLink="https://i.imgur.com/3oXNBst.jpeg"
            title="Escritorio"
            counter={1}
          />
          <ItemList
            key={2}
            price={500}
            imgLink="https://i.imgur.com/3oXNBst.jpeg"
            title="Escritorio"
            counter={1}
          />
          <ItemList
            key={3}
            price={500}
            imgLink="https://i.imgur.com/3oXNBst.jpeg"
            title="Escritorio"
            counter={1}
          />
        </div>

        <PayZone subtotal={500} />
      </div>
    </div>
  );
}

export default ShopingCartPage;






