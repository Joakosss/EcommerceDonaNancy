from . import SQLModel, Field
from database import engine
from sqlmodel import Session, select

class Categoria(SQLModel, table=True):
    id_categoria: str = Field(max_length=50, primary_key=True)
    descripcion: str = Field(max_length=400, nullable=False)

def crear_categorias():
    categorias = [
        Categoria(id_categoria="1", descripcion="Ropa"),
        Categoria(id_categoria="2", descripcion="Electrónicos"),
        Categoria(id_categoria="3", descripcion="Muebles"),
        Categoria(id_categoria="4", descripcion="Zapatos"),
        Categoria(id_categoria="5", descripcion="Varios")
    ]

    with Session(engine) as sesion:
        categorias_existentes = sesion.exec(select(Categoria)).all()
        if not categorias_existentes:
            sesion.add_all(categorias)
            sesion.commit()
            print("Categorias creadas")
        else:
            print("Categorias ya existentes en BD")