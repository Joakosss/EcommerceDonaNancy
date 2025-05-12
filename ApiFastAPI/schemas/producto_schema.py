from pydantic import BaseModel
from uuid import UUID

class ProductoCrear(BaseModel):
    nombre: str 
    descripcion: str
    link_foto: str
    precio: int
    stock: int
    id_categoria: str
    id_marca: str
    id_modelo: str

class ProductoLeer(BaseModel):
    id_producto: UUID
    nombre: str 
    descripcion: str
    link_foto: str
    precio: int
    stock: int
    id_categoria: str
    id_marca: str
    id_modelo: str

    class Config:
        from_attributes = True

class ProductoActualizar(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None
    link_foto: str | None = None
    precio: int | None = None
    stock: int | None = None
    id_categoria: str | None = None
    id_marca: str | None = None
    id_modelo: str | None = None