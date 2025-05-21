from pydantic import BaseModel

class SucursalLeer(BaseModel):
    id_sucursal: str
    nombre: str
    direccion: str
    telefono: int

    class Config:
        from_attributes = True