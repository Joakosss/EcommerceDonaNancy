from pydantic import BaseModel
from uuid import UUID

class PerfilCrear(BaseModel):
    descripcion: str 

class PerfilLeer(BaseModel):
    id_perfil: str
    descripcion: str

    class Config:
        from_attributes = True

class PerfilActualizar(BaseModel):
    descripcion: str | None = None