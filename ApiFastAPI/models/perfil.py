from . import SQLModel, Field, uuid
from database import engine
from sqlmodel import Session

class Perfil(SQLModel, table=True):
    id_perfil: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    descripcion: str = Field(max_length = 400, nullable = False)

def crear_perfil():
    perfil_1 = Perfil(id_perfil="1", descripcion="Administrador")
    sesion = Session(engine)
    sesion.add(perfil_1)
    sesion.commit()