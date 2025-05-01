from . import SQLModel, Field, Session, uuid
from database import engine

class Usuario(SQLModel, table=True):
    id_usuario: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    nombre_usuario: str = Field(max_length=100, nullable=False)
    contrasenia: str = Field(max_length=100, nullable=False)
    run_usuario: str = Field(max_length=20, nullable=False)
    p_nombre: str = Field(max_length=100, nullable=False)
    s_nombre: str = Field(max_length=100, nullable=True)
    p_apellido: str = Field(max_length=100, nullable=False)
    s_apellido: str = Field(max_length=100, nullable=False)
    telefono: int = Field(nullable=False)
    correo: str = Field(max_length=200, nullable=False)
    direccion: str = Field(max_length=200, nullable=True)
    id_perfil: str = Field(max_length=50, foreign_key="perfil.id_perfil", nullable=False)

def crear_usuario():
    usu = Usuario(
        id_usuario="1",
        nombre_usuario="NancyDiaz",
        contrasenia="NDia.1822",
        run_usuario="18225225-0",
        p_nombre="Nancy",
        s_nombre="Andrea",
        p_apellido="Díaz",
        s_apellido="Vega",
        telefono=912341234,
        correo="nancy.diaz@btnancy.cl",
        direccion="Las Parras 0350",
        id_perfil="1"
    ) 

    with Session(engine) as sesion:
        sesion.add(usu)
        sesion.commit()
