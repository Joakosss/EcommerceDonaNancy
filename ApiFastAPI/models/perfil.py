from . import SQLModel, Field, uuid
from sqlmodel import Session, select
from database import engine

class Perfil(SQLModel, table=True):
    id_perfil: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    descripcion: str = Field(max_length = 400, nullable = False)

def crear_perfil():
    perfiles = [
        Perfil(id_perfil="0", descripcion="Administrador"),
        Perfil(id_perfil="1", descripcion="Cliente"),
        Perfil(id_perfil="2", descripcion="Vendedor"),
        Perfil(id_perfil="3", descripcion="Bodeguero"),
        Perfil(id_perfil="4", descripcion="Contador")
    ]
        
    with Session(engine) as sesion: #La sesion se cierra al terminar el bloque 
        perfiles_existentes = sesion.exec(select(Perfil)).all() #Si ya existen perfiles no se van a crear de nuevo
        if not perfiles_existentes: 
            sesion.add_all(perfiles)
            sesion.commit()
            print("Perfiles creados")
        else:
            print("Perfiles ya existen")
        

