import { EstadoBoletaType } from "./EstadoBoletaType";
import { FormaPagoType } from "./FormaPagoType";
import { UsuarioType } from "./UsuarioType";

export type BoletaType = {
  id: string;
  fecha: Date;
  total: number;
  estado_boleta: EstadoBoletaType;
  usuario: UsuarioType;
  comprobante_pago?: Blob|File;
  forma_pago: FormaPagoType;
};
