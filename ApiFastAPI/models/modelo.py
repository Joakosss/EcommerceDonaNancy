from . import SQLModel, Field
from database import engine
from sqlmodel import Session, select

class Modelo(SQLModel, table=True):
    id_marca: str = Field(max_length=50, primary_key=True)
    descripcion: str = Field(max_length=200, nullable=False)

def crear_modelos():
    modelos = [
        Modelo(id_marca="10", descripcion="Nuevo"),
        Modelo(id_marca="11", descripcion="Usado"),
        Modelo(id_marca="20", descripcion="Batería"),
        Modelo(id_marca="21", descripcion="Cableado"),
        Modelo(id_marca="30", descripcion="Moderno"),
        Modelo(id_marca="31", descripcion="Retro"),
        Modelo(id_marca="40", descripcion="Altos"),
        Modelo(id_marca="41", descripcion="Bajos"),
        Modelo(id_marca="50", descripcion="Transportes"),
        Modelo(id_marca="51", descripcion="Extras")
    ]

    with Session(engine) as sesion:
        modelos_existentes = sesion.exec(select(Modelo)).all()
        if not modelos_existentes:
            sesion.add_all(modelos)
            sesion.commit()
            print("Modelos creados")
        else:
            print("Modelos ya existentes en BD")
        
