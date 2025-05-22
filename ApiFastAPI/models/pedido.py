from . import SQLModel, Field, uuid
from sqlmodel import Relationship
from typing import TYPE_CHECKING, List, Optional
import datetime

if TYPE_CHECKING:
    from .pedido_producto import Pedido_producto
    from .forma_pago import Forma_pago
    from .entrega import Entrega

class Pedido(SQLModel, table=True):
    id_pedido: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    fecha: datetime.date = Field(nullable=False)
    total: int = Field(nullable=False)
    comprobante_pago: str = Field(max_length=500, nullable=True)
    id_estado_pedido: str = Field(max_length=50, foreign_key="estado_pedido.id_estado_pedido", nullable=False)
    id_usuario: str = Field(max_length=50, foreign_key="usuario.id_usuario", nullable=False)
    id_forma_pago: str = Field(max_length=50, foreign_key="forma_pago.id_forma_pago", nullable=False)
    id_entrega: str = Field(max_length=50, foreign_key="entrega.id_entrega", nullable=True)

    #relacion uno a muchos con pedido_producto
    productos: List["Pedido_producto"] = Relationship(
        back_populates="pedido",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )    #relacion muchos a uno con forma_pago
    forma_pago: Optional["Forma_pago"] = Relationship(
        back_populates="pedidos"
    )    
    entrega: Optional["Entrega"] = Relationship(
        back_populates="pedido"
    )