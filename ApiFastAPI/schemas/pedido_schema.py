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

class SucursalLeer(BaseModel):
    id_sucursal: str
    nombre: str
    direccion: str
    telefono: int

    class Config:
        from_attributes = True
    
class EntregaLeer(BaseModel):
    id_entrega: str
    id_tipo_entrega: str
    id_estado_entrega: str
    fecha_entrega: date
    direccion_entrega: str | None = None
    sucursal: Optional["SucursalLeer"]

    class Config:
        from_attributes = True

EntregaLeer.model_rebuild()

class ProductoLeer(BaseModel):
    id_producto: str
    nombre: str
    precio: int
    link_foto: str | None = None

    class Config:
        from_attributes = True

class PedidoProductoLeer(BaseModel):
    id_pedido_producto: str
    id_producto: str
    cantidad: int
    valor_unidad: int
    producto: Optional[ProductoLeer]

    class Config:
        from_attributes = True

class PedidoLeer(BaseModel):
    id_pedido: str
    fecha: date
    total: int
    comprobante_pago: str | None = None
    id_estado_pedido: str
    id_usuario: str
    id_forma_pago: str
    id_entrega: str | None = None
    entrega: Optional[EntregaLeer]
    productos: list[PedidoProductoLeer] = []

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
