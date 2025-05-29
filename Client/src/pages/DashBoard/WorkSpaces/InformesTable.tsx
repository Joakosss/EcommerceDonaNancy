import LoadingOverlay from "../../../components/LoadingOverlay";
import useEntregasSucursal from "../../../hooks/NewQuerys/informesQuerys/useEntregasSucursal";
import useProductosVendidos from "../../../hooks/NewQuerys/informesQuerys/useProductosVendidos";
import useStockBajo from "../../../hooks/NewQuerys/informesQuerys/useStockBajo";
import useStockProductos from "../../../hooks/NewQuerys/informesQuerys/useStockProductos";

function InformesTable() {
  const { mutate: mutEntregasSucu, isPending: loadEntregasSucu } =
    useEntregasSucursal();
  const { mutate: mutProductosVend, isPending: loadProductosVend } =
    useProductosVendidos();
  const { mutate: mutStockBajo, isPending: loadStockBajo } = useStockBajo();
  const { mutate: mutStockProd, isPending: loadStockProd } =
    useStockProductos();

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div
        className="cursor-pointer border-primary/80 bg-primary/10 p-19 rounded text-center text-3xl font-bold text-primary hover:bg-primary/30"
        onClick={() => mutStockBajo()}
      >
        Stock Bajo
      </div>
      <div
        className="cursor-pointer border-primary/80 bg-primary/10 p-19 rounded text-center text-3xl font-bold text-primary hover:bg-primary/30"
        onClick={() => mutStockProd()}
      >
        Stock Productos
      </div>
      <div
        className="cursor-pointer border-primary/80 bg-primary/10 p-19 rounded text-center text-3xl font-bold text-primary hover:bg-primary/30"
        onClick={() => mutEntregasSucu()}
      >
        Entregas Sucursales
      </div>
      <div
        className="cursor-pointer border-primary/80 bg-primary/10 p-19 rounded text-center text-3xl font-bold text-primary hover:bg-primary/30"
        onClick={() => mutProductosVend()}
      >
        Productos vendidos
      </div>
      {loadStockBajo ||
        loadEntregasSucu ||
        loadProductosVend ||
        (loadStockProd && <LoadingOverlay />)}
    </div>
  );
}

export default InformesTable;
