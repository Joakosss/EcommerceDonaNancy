from pydantic import BaseModel
from uuid import UUID

class UsuarioCrear(BaseModel):
    nombre_usuario: str 
    contrasenia: str
    run_usuario: str
    p_nombre: str
    s_nombre: str | None = None
    p_apellido: str
    s_apellido: str
    telefono: int
    correo: str
    direccion: str | None = None
    id_perfil: str

class UsuarioLeer(BaseModel):
    id_perfil: UUID
    descripcion: str

    class Config:
        from_attributes = True

class UsuarioActualizar(BaseModel):
    descripcion: str | None = None