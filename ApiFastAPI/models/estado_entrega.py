from . import SQLModel, Field
from database import engine
from sqlmodel import Session, select

class Estado_entrega(SQLModel, table=True):
    id_estado_entrega: str = Field(max_length=50, primary_key=True)
    descripcion: str = Field(max_length=400, nullable=False)

def crear_estado_entrega():
    estados = [
        Estado_entrega(id_estado_entrega = "0", descripcion = "En proceso"),
        Estado_entrega(id_estado_entrega = "1", descripcion = "Pendiente"),
        Estado_entrega(id_estado_entrega = "2", descripcion = "Cancelado"),
        Estado_entrega(id_estado_entrega = "3", descripcion = "Entregado"),
        Estado_entrega(id_estado_entrega = "4", descripcion = "Completado")

    ]

    with Session(engine) as sesion:
        estados_existentes = sesion.exec(select(Estado_entrega)).all()
        if not estados_existentes:
            sesion.add_all(estados)
            sesion.commit()
            print("Estados de entrega creados")
        else:
            print("Estados entrega ya existentes en BD")