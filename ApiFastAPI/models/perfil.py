from . import SQLModel, Field, uuid
from database import engine
from sqlmodel import Session

class Perfil(SQLModel, table=True):
    id_perfil: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    descripcion: str = Field(max_length = 400, nullable = False)

def crear_perfil():
    perfil_1 = Perfil(id_perfil="0", descripcion="Administrador")
    perfil_2 = Perfil(id_perfil="1", descripcion="Cliente")
    perfil_3 = Perfil(id_perfil="2", descripcion="Vendedor")
    perfil_4 = Perfil(id_perfil="3", descripcion="Bodeguero")
    perfil_5 = Perfil(id_perfil="4", descripcion="Contador")
    sesion = Session(engine)
    sesion.add(perfil_1, perfil_2, perfil_3, perfil_4, perfil_5)
    sesion.commit()