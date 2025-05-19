from . import SQLModel, Field
from database import engine
from sqlmodel import Session, select

class Marca(SQLModel, table=True):
    id_marca: str = Field(max_length=50, primary_key=True)
    descripcion: str = Field(max_length=200, nullable = False)

def crear_marcas():
    marcas = [
        Marca(id_marca = "0", descripcion = "Doña Nancy"),
        Marca(id_marca = "1", descripcion = "Shein")
    ]

    with Session(engine) as sesion:
        marcas_existentes = sesion.exec(select(Marca)).all()
        if not marcas_existentes:
            sesion.add_all(marcas)
            sesion.commit()
            print("Marcas creadas")
        else:
            print("Marcas ya existentes en BD")