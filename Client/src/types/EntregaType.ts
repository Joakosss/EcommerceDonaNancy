import { BoletaType } from "./PedidoType";
import { EstadoEntregaType } from "./EstadoEntregaType";
import { SucursalType } from "./SucursalType";
import { TipoEntregaType } from "./TipoEntregaType";

export type EntregaType = {
  id: string;
  fecha_entrega: Date;
  direccion_entrega?: string;
  boleta: BoletaType;
  sucursal: SucursalType;
  estado_entrega: EstadoEntregaType;
  tipo_entrega: TipoEntregaType;
};
