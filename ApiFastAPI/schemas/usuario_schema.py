from pydantic import BaseModel
from uuid import UUID

class UsuarioCrear(BaseModel):
    nombre_usuario: str |None = None
    contrasenia: str
    run_usuario: str
    p_nombre: str
    s_nombre: str | None = None
    p_apellido: str
    s_apellido: str
    telefono: int
    correo: str | None = None
    direccion: str | None = None
    id_perfil: str

class UsuarioLeer(BaseModel):
    #se puede leer todo menos la contraseña
    id_usuario: UUID
    nombre_usuario: str 
    run_usuario: str
    p_nombre: str
    s_nombre: str | None = None
    p_apellido: str
    s_apellido: str
    telefono: int
    correo: str
    direccion: str | None = None
    id_perfil: str

    class Config:
        from_attributes = True

class UsuarioActualizar(BaseModel):
    #se puede actualizar todo menos el id_usuario y run_usuario
    nombre_usuario: str | None = None
    contrasenia: str | None = None
    p_nombre: str | None = None
    s_nombre: str | None = None
    p_apellido: str | None = None
    s_apellido: str | None = None
    telefono: int | None = None
    correo: str | None = None
    direccion: str | None = None
    id_perfil: str | None = None