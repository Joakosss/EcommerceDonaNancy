from . import SQLModel, Field, uuid
from database import engine
from sqlmodel import Session, select
from unidecode import unidecode

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

#Crear usuario admin por defecto
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

#funciones para crear el nombre de usuario y el correo si no se ingresan en el registro
def crear_nombreUsuario(nombre: str, apellido: str, rut: str) -> str:
    p_nombre = unidecode(nombre.split()[0][:3].lower())
    p_apellido = unidecode(apellido.split()[0].lower())
    run = rut.split("-")[0][:3]

    username = f"{p_apellido}.{p_nombre}{run}"

    return username

def crear_correo(nombre: str, apellido: str) -> str:
    p_nombre = unidecode(nombre.split()[0][:3].lower())
    p_apellido = unidecode(apellido.split()[0].lower())

    correo = f"{p_nombre}.{p_apellido}@bdnancy.cl"
    return correo