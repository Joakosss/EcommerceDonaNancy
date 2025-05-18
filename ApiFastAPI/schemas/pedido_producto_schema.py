from pydantic import BaseModel
from uuid import UUID
from datetime import date
from typing import Optional

class PedidoProductoCrear(BaseModel):
    cantidad: int
    fecha: date
    valor_unidad: int
    id_pedido: str
    id_producto: str

class PedidoProductoLeer(BaseModel):
    id_pedido_producto: UUID
    cantidad: int
    fecha: date
    valor_unidad: int
    id_pedido: str
    id_producto: str

    class Config:
        from_attributes = True

class PedidoProductoActualizar(BaseModel):
    cantidad: Optional[int] = None
    fecha: Optional[date] = None
    valor_unidad: Optional[int] = None
    id_pedido: Optional[str] = None
    id_producto: Optional[str] = None