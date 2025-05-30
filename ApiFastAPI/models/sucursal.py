from . import SQLModel, Field
from sqlmodel import Session, select, Relationship
from database import engine
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .entrega import Entrega

class Sucursal(SQLModel, table=True):
    id_sucursal: str = Field(max_length=50, primary_key=True)
    nombre: str = Field(max_length=200, nullable=False)
    direccion: str = Field(max_length=400, nullable=False)
    telefono: int = Field(nullable=False)

    # Relación con Entrega
    entrega: Optional["Entrega"] = Relationship(back_populates="sucursal")

def crear_sucursales():
    sucursales = [
        Sucursal(
            id_sucursal="1",
            nombre="Sucursal Centro",
            direccion="Av. Siempre Viva 123",
            telefono=123456789
        ),
        Sucursal(
            id_sucursal="2",
            nombre="Sucursal Norte",
            direccion="Calle Falsa 456",
            telefono=987654321
        ),
        Sucursal(
            id_sucursal="3",
            nombre="Sucursal Sur",
            direccion="Av. Libertador 789",
            telefono=456789123
        )
    ]

    with Session(engine) as sesion:
        sucursales_existentes = sesion.exec(select(Sucursal)).all()
        if not sucursales_existentes:
            sesion.add_all(sucursales)
            sesion.commit()
            print("Sucursales creadas correctamente")
        else:
            print("Las sucursales ya existen")