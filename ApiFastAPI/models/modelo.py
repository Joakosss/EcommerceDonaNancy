from . import SQLModel, Field
from database import engine
from sqlmodel import Session, select

class Modelo(SQLModel, table=True):
    id_modelo: str = Field(max_length=50, primary_key=True)
    descripcion: str = Field(max_length=200, nullable=False)

def crear_modelos():
    modelos = [
        Modelo(id_modelo="10", descripcion="Nuevo"),
        Modelo(id_modelo="11", descripcion="Usado"),
        Modelo(id_modelo="20", descripcion="Batería"),
        Modelo(id_modelo="21", descripcion="Cableado"),
        Modelo(id_modelo="30", descripcion="Moderno"),
        Modelo(id_modelo="31", descripcion="Retro"),
        Modelo(id_modelo="40", descripcion="Altos"),
        Modelo(id_modelo="41", descripcion="Bajos"),
        Modelo(id_modelo="50", descripcion="Transportes"),
        Modelo(id_modelo="51", descripcion="Extras")
    ]

    with Session(engine) as sesion:
        modelos_existentes = sesion.exec(select(Modelo)).all()
        if not modelos_existentes:
            sesion.add_all(modelos)
            sesion.commit()
            print("Modelos creados")
        else:
            print("Modelos ya existentes en BD")
        
