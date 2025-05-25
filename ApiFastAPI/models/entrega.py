from . import SQLModel, Field, uuid
from sqlmodel import Relationship, Session, select
from typing import TYPE_CHECKING, Optional
from database import engine
import datetime 

if TYPE_CHECKING:
    from .pedido import Pedido
    from .sucursal import Sucursal

class Entrega(SQLModel, table=True):
    id_entrega: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    fecha_entrega: datetime.date = Field(nullable=False)
    direccion_entrega: str = Field(max_length=200, nullable=True)
    id_sucursal: str = Field(max_length=50, foreign_key="sucursal.id_sucursal", nullable=True)
    id_estado_entrega: str = Field(max_length=50, foreign_key="estado_entrega.id_estado_entrega", nullable=False)
    id_tipo_entrega: str = Field(max_length=50, foreign_key="tipo_entrega.id_tipo_entrega", nullable=False)

    #uno a muchos con pedido
    pedido: Optional["Pedido"] = Relationship(back_populates="entrega")
    #uno a muchos con sucursal
    sucursal: Optional["Sucursal"] = Relationship(back_populates="entrega")

def crear_entregas():
    entregas =[
        Entrega(id_entrega="1", fecha_entrega=datetime.date.today(), direccion_entrega="Calle entrega 456", id_sucursal="1", id_estado_entrega="1", id_tipo_entrega="1"),
        Entrega(id_entrega="2", fecha_entrega=datetime.date.today(), direccion_entrega="Calle entrega 123", id_sucursal="1", id_estado_entrega="1", id_tipo_entrega="1"),
    ]
    with Session(engine) as session:
        entregas_existentes = session.exec(select(Entrega)).all()
        if not entregas_existentes:
            session.add_all(entregas)
            session.commit()
            print("Entregas creadas")
        else:
            print("Entregas ya existentes en BD")