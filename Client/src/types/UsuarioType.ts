import { PerfilType } from "./PerfilType";

export type UsuarioType = {
  id?: string;
  nombre_usuario: string;
  contrasennia?: string;
  p_nombre: string;
  s_nombre?: string;
  p_apellido: string;
  s_apellido: string;
  telefono: number;
  correo: string;
  direccion?: string;
  id_perfil?: string;
};
