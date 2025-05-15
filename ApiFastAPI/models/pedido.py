from . import SQLModel, Field, uuid
import datetime

class Pedido(SQLModel, table=True):
    id_pedido: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    fecha: datetime.date = Field(nullable=False)
    total: int = Field(nullable=False)
    comprobante_pago: str = Field(max_length=500, nullable=False)
    id_estado_pedido: str = Field(max_length=50, foreign_key="estado_pedido.id_estado_pedido", nullable=False)
    id_usuario: str = Field(max_length=50, foreign_key="usuario.id_usuario", nullable=False)
    id_forma_pago: str = Field(max_length=50, foreign_key="forma_pago.id_forma_pago", nullable=False)
    id_entrega: str = Field(max_length=50, foreign_key="entrega.id_entrega", nullable=False)
