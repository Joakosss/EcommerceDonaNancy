from . import SQLModel, Field, uuid
from sqlmodel import Relationship, Session, select
from typing import TYPE_CHECKING, List, Optional
from database import engine
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

def crear_pedidos():
    pedidos = [
        Pedido(id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1a", fecha=datetime.date.today(), total=10000, comprobante_pago="linkcomprobante.jpg", id_estado_pedido="3", id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc8", id_forma_pago="1", id_entrega="1"),
        Pedido(id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1b", fecha=datetime.date.today(), total=5000, comprobante_pago=None, id_estado_pedido="3", id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc7", id_forma_pago="1", id_entrega=None),
        Pedido(id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1c", fecha=datetime.date.today(), total=15000, comprobante_pago="linkcomprobante2.jpg", id_estado_pedido="3", id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc7", id_forma_pago="2", id_entrega="2"),
        Pedido(id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1d", fecha=datetime.date(2025, 5, 25), total=20000, comprobante_pago="linkcomprobante3.jpg", id_estado_pedido="1", id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc7", id_forma_pago="3", id_entrega=None),
        Pedido(id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1e", fecha=datetime.date(2025, 5, 24), total=12000, comprobante_pago=None, id_estado_pedido="2", id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc7", id_forma_pago="1", id_entrega=None),
        Pedido(id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1f", fecha=datetime.date(2025, 5, 23), total=8000, comprobante_pago="linkcomprobante4.jpg", id_estado_pedido="3", id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc7", id_forma_pago="2", id_entrega=None)

    ]

    with Session(engine) as sesion:
        pedidos_existentes = sesion.exec(select(Pedido)).all()
        if not pedidos_existentes:
            sesion.add_all(pedidos)
            sesion.commit()
            print("Pedidos creados")
        else:
            print("Pedidos ya existentes en BD")

