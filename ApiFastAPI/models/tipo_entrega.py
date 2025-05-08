from . import SQLModel, Field
from database import engine
from sqlmodel import Session, select

class Tipo_entrega(SQLModel, table=True):
    id_tipo_entrega: str = Field(max_length=50, primary_key=True)
    descripcion: str = Field(max_length=400, nullable=False)

def crear_tipo_entrega():
    tipos_ent = [
        Tipo_entrega(id_tipo_entrega = "0", descripcion = "Retiro en tienda"),
        Tipo_entrega(id_tipo_entrega = "1", descripcion = "Envío a domicilio")
    ]

    with Session(engine) as sesion:
        tiposEntrega_existentes = sesion.exec(select(Tipo_entrega)).all()
        if not tiposEntrega_existentes:
            sesion.add_all(tipos_ent)
            sesion.commit()
            print("Tipos entrega creados")
        else:
            print("Tipos de entrega existentes en BD")