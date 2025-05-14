from . import SQLModel, Field, uuid
import datetime

class Pedido_producto(SQLModel, table=True):
    id_pedido_producto: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    cantidad: int = Field(nullable=False)
    fecha: datetime.date = Field(nullable=False)
    valor_unidad: int = Field(nullable=False)
    id_pedido: str = Field(max_length=50, foreign_key="pedido.id_pedido", nullable=False)
    id_producto: str = Field(max_length=50, foreign_key="producto.id_producto", nullable=False)