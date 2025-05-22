from . import SQLModel, Field, uuid
from sqlmodel import Relationship
from typing import TYPE_CHECKING, List, Optional
import datetime 

if TYPE_CHECKING:
    from .pedido import Pedido

class Entrega(SQLModel, table=True):
    id_entrega: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    fecha_entrega: datetime.date = Field(nullable=False)
    direccion_entrega: str = Field(max_length=200, nullable=False)
    id_sucursal: str = Field(max_length=50, foreign_key="sucursal.id_sucursal", nullable=True)
    id_estado_entrega: str = Field(max_length=50, foreign_key="estado_entrega.id_estado_entrega", nullable=False)
    id_tipo_entrega: str = Field(max_length=50, foreign_key="tipo_entrega.id_tipo_entrega", nullable=False)

    #uno a muchos con pedido
    pedido: Optional["Pedido"] = Relationship(back_populates="entrega")