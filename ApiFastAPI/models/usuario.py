from . import SQLModel, Field, uuid

class Usuario(SQLModel, table=True):
    id_usuario: str = Field(default_factory=uuid.uuid4, primary_key=True)
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
    id_perfil: str = Field(foreign_key="perfil.id_perfil", nullable=False)