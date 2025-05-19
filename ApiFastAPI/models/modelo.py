from . import SQLModel, Field
from database import engine
from sqlmodel import Session, select

class Modelo(SQLModel, table=True):
    id_modelo: str = Field(max_length=50, primary_key=True)
    descripcion: str = Field(max_length=200, nullable=False)
    id_categoria: str = Field(max_length=50, foreign_key="categoria.id_categoria", nullable=False)

def crear_modelos():
    modelos = [
        Modelo(id_modelo="10", descripcion="Nuevo", id_categoria="1"),
        Modelo(id_modelo="11", descripcion="Usado",id_categoria="1"),
        Modelo(id_modelo="20", descripcion="Batería", id_categoria="2"),
        Modelo(id_modelo="21", descripcion="Cableado", id_categoria="2"),
        Modelo(id_modelo="30", descripcion="Moderno", id_categoria="3"),
        Modelo(id_modelo="31", descripcion="Retro", id_categoria="3"),
        Modelo(id_modelo="40", descripcion="Altos", id_categoria="4"),
        Modelo(id_modelo="41", descripcion="Bajos", id_categoria="4"),
        Modelo(id_modelo="50", descripcion="Transportes", id_categoria="5"),
        Modelo(id_modelo="51", descripcion="Extras", id_categoria="5")
    ]

    with Session(engine) as sesion:
        modelos_existentes = sesion.exec(select(Modelo)).all()
        if not modelos_existentes:
            sesion.add_all(modelos)
            sesion.commit()
            print("Modelos creados")
        else:
            print("Modelos ya existentes en BD")
        
