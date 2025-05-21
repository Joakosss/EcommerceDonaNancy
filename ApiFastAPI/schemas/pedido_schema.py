from pydantic import BaseModel
from datetime import date
from typing import Optional
from schemas.pedido_producto_schema import PedidoProductoLeer

class PedidoCrear(BaseModel):
    fecha: date
    total: int
    comprobante_pago: str | None = None
    id_estado_pedido: str
    id_usuario: str
    id_forma_pago: str
    id_entrega: str | None = None

class PedidoLeer(BaseModel):
    id_pedido: str
    fecha: date
    total: int
    comprobante_pago: str | None = None
    id_estado_pedido: str
    id_usuario: str
    id_forma_pago: str
    id_entrega: str | None = None

    class Config:
        from_attributes = True

class PedidoCrearDetalle(BaseModel):
    fecha: date
    comprobante_pago: str | None = None
    id_estado_pedido: str
    id_usuario: str
    id_forma_pago: str
    id_entrega: str | None = None
    productos: list[PedidoProductoLeer]

    class Config:
        from_attributes = True

class PedidoActualizar(BaseModel):
    fecha: Optional[date] = None
    total: Optional[int] = None
    comprobante_pago: Optional[str] = None
    id_estado_pedido: Optional[str] = None
    id_usuario: Optional[str] = None
    id_forma_pago: Optional[str] = None
    id_entrega: Optional[str] = None
