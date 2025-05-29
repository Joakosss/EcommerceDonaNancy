from . import SQLModel, Field, uuid
from sqlmodel import Relationship, Session, select
from typing import Optional, TYPE_CHECKING
from database import engine
import datetime

if TYPE_CHECKING:
    from .pedido import Pedido
    from .producto import Producto

class Pedido_producto(SQLModel, table=True):
    id_pedido_producto: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    cantidad: int = Field(nullable=False)
    fecha: datetime.date = Field(nullable=False)
    valor_unidad: int = Field(nullable=False)
    id_pedido: str = Field(max_length=50, foreign_key="pedido.id_pedido", nullable=False)
    id_producto: str = Field(max_length=50, foreign_key="producto.id_producto", nullable=False)
    #agregar relacion, para que se borren los productos si se borra el pedido

    pedido: Optional["Pedido"] = Relationship(back_populates="productos")
    producto: Optional["Producto"] = Relationship(back_populates="pedido_productos")

def crear_pedido_productos():
    pedido_productos = [
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e0", cantidad=2, fecha=datetime.date.today(), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1a", id_producto="1"),
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e1", cantidad=1, fecha=datetime.date.today(), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1a", id_producto="2"),
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e2", cantidad=1, fecha=datetime.date.today(), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1a", id_producto="3"),
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e3", cantidad=3, fecha=datetime.date.today(), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1a", id_producto="4"),
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e4", cantidad=1, fecha=datetime.date.today(), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1b", id_producto="5"),
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e5", cantidad=4, fecha=datetime.date.today(), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1b", id_producto="6"),
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e6", cantidad=2, fecha=datetime.date(2025, 5, 23), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1c", id_producto="7"),
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e7", cantidad=1, fecha=datetime.date(2025, 5, 24), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1d", id_producto="8"),
        Pedido_producto(id_pedido_producto="4fd2d2b8-9610-4f00-8d55-435d92b729e8", cantidad=5, fecha=datetime.date(2025, 5, 25), valor_unidad=5000, id_pedido="2015cae5-99eb-454d-ab1a-ede02d703a1e", id_producto="9"),

    ]

    with Session(engine) as sesion:
        pedido_productos_existentes = sesion.exec(select(Pedido_producto)).all()
        if not pedido_productos_existentes:
            sesion.add_all(pedido_productos)
            sesion.commit()
            print("Pedido_productos creados")
        else:
            print("Pedido_productos ya existentes en BD")