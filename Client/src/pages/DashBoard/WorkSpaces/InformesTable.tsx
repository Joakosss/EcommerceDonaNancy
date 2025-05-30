import LoadingOverlay from "../../../components/LoadingOverlay";
import useComprasxCliente from "../../../hooks/NewQuerys/informesQuerys/useComprasxCliente";
import useEntregasSucursal from "../../../hooks/NewQuerys/informesQuerys/useEntregasSucursal";
import useProductosVendidos from "../../../hooks/NewQuerys/informesQuerys/useProductosVendidos";
import useStockBajo from "../../../hooks/NewQuerys/informesQuerys/useStockBajo";
import useStockProductos from "../../../hooks/NewQuerys/informesQuerys/useStockProductos";
import useVentasxAnnio from "../../../hooks/NewQuerys/informesQuerys/useVentasxAnnio";
import useVentasxMes from "../../../hooks/NewQuerys/informesQuerys/useVentasxMes";

function InformesTable() {
  const { mutate: mutEntregasSucu, isPending: loadEntregasSucu } =
    useEntregasSucursal();
  const { mutate: mutProductosVend, isPending: loadProductosVend } =
    useProductosVendidos();
  const { mutate: mutStockBajo, isPending: loadStockBajo } = useStockBajo();
  const { mutate: mutStockProd, isPending: loadStockProd } =
    useStockProductos();
  const { mutate: mutComprasxCliente, isPending: loadComprasxCliente } =
    useComprasxCliente();
  const { mutate: mutVentasxAnnio, isPending: loadVentasxAnnio } =
    useVentasxAnnio();
  const { mutate: mutuseVentasxmes, isPending: loaduseVentasxmes } =
    useVentasxMes();

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
      <div
        className="cursor-pointer border-primary/80 bg-primary/10 p-19 rounded text-center text-3xl font-bold text-primary hover:bg-primary/30"
        onClick={() => mutVentasxAnnio()}
      >
        Ventas por Año
      </div>
      <div
        className="cursor-pointer border-primary/80 bg-primary/10 p-19 rounded text-center text-3xl font-bold text-primary hover:bg-primary/30"
        onClick={() => mutuseVentasxmes()}
      >
        Ventas por año
      </div>
      <div
        className="cursor-pointer border-primary/80 bg-primary/10 p-19 rounded text-center text-3xl font-bold text-primary hover:bg-primary/30"
        onClick={() => mutComprasxCliente()}
      >
        Compras por Cliente
      </div>

      {loadStockBajo ||
        loadEntregasSucu ||
        loadProductosVend ||
        loadComprasxCliente ||
        loadVentasxAnnio ||
        loaduseVentasxmes ||
        (loadStockProd && <LoadingOverlay />)}
    </div>
  );
}

export default InformesTable;
