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
    cambiar_contrasenia: bool = Field(default=False, nullable=False)

def crear_usuario():
    usuarios = [
        #Administrador
        Usuario(
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
            id_perfil="0",
            cambiar_contrasenia=True
        ),
        #Cliente
        Usuario(
            id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc7",
            nombre_usuario="JuanPerez",
            contrasenia="$2b$12$L/KK5SnXRVZUiG77mMoQGOqf4j2raFialEpj9/qGUNvEdkjBkt3pa",
            run_usuario="18225225-1",
            p_nombre="Juan",
            s_nombre="Andres",
            p_apellido="Pérez",
            s_apellido="Gonzalez",
            telefono=912341234,
            correo="juan.perez@gmail.cl",
            direccion="Calle 123",
            id_perfil="1"
        ),
        Usuario(
            id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc0",
            nombre_usuario="AnaGonzalez",
            contrasenia="$2b$12$L/KK5SnXRVZUiG77mMoQGOqf4j2raFialEpj9/qGUNvEdkjBkt3pa",
            run_usuario="18225225-2",
            p_nombre="Ana",
            s_nombre="Maria",
            p_apellido="Gonzalez",
            s_apellido="Fernandez",
            telefono=912341234,
            correo="mari.gonza@gmail.com",
            direccion="Calle 456",
            id_perfil="1"
        ),
        #Vendedor
        Usuario(
            id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc8",
            nombre_usuario="MariaLopez",
            contrasenia="$2b$12$L/KK5SnXRVZUiG77mMoQGOqf4j2raFialEpj9/qGUNvEdkjBkt3pa",
            run_usuario="18225225-2",
            p_nombre="María",
            s_nombre="Jose",
            p_apellido="Lopez",
            s_apellido="Martinez",
            telefono=912341234,
            correo="mar.lopez@btnancy.cl",
            direccion="Calle 456",
            id_perfil="2"
        ),
        #Bodeguero
        Usuario(
            id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffc9",
            nombre_usuario="PedroGonzalez",
            contrasenia="$2b$12$L/KK5SnXRVZUiG77mMoQGOqf4j2raFialEpj9/qGUNvEdkjBkt3pa",
            run_usuario="18225225-3",
            p_nombre="Pedro",
            s_nombre="Pablo",
            p_apellido="Gonzalez",
            s_apellido="Fernandez",
            telefono=912341234,
            correo="pedro.gonz@btnancy.cl",
            direccion="Calle 789",
            id_perfil="3"
        ),
        #Contador
        Usuario(
            id_usuario="6352a479-0b04-4fa6-89d2-a51fba16ffca",
            nombre_usuario="AnaFernandez",
            contrasenia="$2b$12$L/KK5SnXRVZUiG77mMoQGOqf4j2raFialEpj9/qGUNvEdkjBkt3pa",
            run_usuario="18225225-4",
            p_nombre="Ana",
            s_nombre="Maria",
            p_apellido="Fernandez",
            s_apellido="Lopez",
            telefono=912341234,
            correo="ana.fern@btnancy.cl",
            direccion="Calle 101",
            id_perfil="4"
        )
    ]

    #Validación para que no creen los usuarios si ya existen:
    with Session(engine) as sesion:
        usuarios_existentes = sesion.exec(select(Usuario)).all()
        if not usuarios_existentes:
            sesion.add_all(usuarios)
            sesion.commit()
            print("Usuarios creados")
        else:
            print("Usuarios ya existentes en BD")

#funciones para crear el nombre de usuario y el correo si no se ingresan en el registro
def crear_nombreUsuario(nombre: str, apellido: str, rut: str) -> str:
    p_nombre = unidecode(nombre.split()[0][:3].lower())
    p_apellido = unidecode(apellido.split()[0].lower())
    run = rut.split("-")[0][:3]

    user_base = f"{p_apellido}.{p_nombre}{run}"

    if not existe_username(user_base):
    
        return user_base

    for i in range(1, 100):
        usuario = f"{user_base}{i}"
        if not existe_username(usuario):
            return usuario

    raise Exception("No se pudo generar un nombre de usuario único.")

def crear_correo(nombre: str, apellido: str) -> str:
    p_nombre = unidecode(nombre.split()[0][:3].lower())
    p_apellido = unidecode(apellido.split()[0].lower())

    base = f"{p_nombre}.{p_apellido}@bdnancy.cl"

    if not existe_correo(base):
        return base

    for i in range(1, 100):
        correo = f"{p_nombre}.{p_apellido}{i}@bdnancy.cl"
        if not existe_correo(correo):
            return correo

    raise Exception("No se pudo generar un correo único.")

#Funciones para validar si el username y el correo ya existen en BD
def existe_username(username: str) -> bool:
    with Session(engine) as sesion:
        usuario = sesion.exec(select(Usuario).where(Usuario.nombre_usuario == username)).first()
        if usuario:
            return True
        else:
            return False
        
def existe_correo(correo: str) -> bool:
    with Session(engine) as sesion:
        usuario = sesion.exec(select(Usuario).where(Usuario.correo == correo)).first()
        if usuario:
            return True
        else:
            return False
