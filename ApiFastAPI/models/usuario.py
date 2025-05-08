from . import SQLModel, Field, uuid
from database import engine
from sqlmodel import Session, select

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

def crear_nombreUsuario(apellido: str, rut: str) -> str:
    # Extraer el primer apellido y los primeros 3 dígitos del RUT
    primer_apellido = apellido.split()[0].lower()
    rut_digitos = rut.split("-")[0][:3]
    
    # Concatenar el primer apellido y los 3 dígitos del RUT
    nombre_usuario = f"{primer_apellido}{rut_digitos}"
    
    return nombre_usuario

def crear_usuario():
    usu = Usuario(
        id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc6",
        nombre_usuario="NancyDiaz",
        contrasenia="$2b$12$L/KK5SnXRVZUiG77mMoQGOqf4j2raFialEpj9/qGUNvEdkjBkt3pa",
        run_usuario="18225225-0",
        p_nombre="Nancy",
        s_nombre="Andrea",
        p_apellido="Díaz",
        s_apellido="Vega",
        telefono=912341234,
        correo="nancy.diaz@btnancy.cl",
        direccion="Las Parras 0350",
        id_perfil="0"
    ) 

    with Session(engine) as sesion:
        #Validación para que no cree el usuario si ya existe
        if sesion.exec(select(Usuario).where(Usuario.id_usuario == usu.id_usuario)).first():
            print("Usuario ya existe")
        else:
            sesion.add(usu)
            sesion.commit()