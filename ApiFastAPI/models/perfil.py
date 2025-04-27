from . import SQLModel, Field, uuid

class Perfil(SQLModel, table=True):
    id_perfil: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    descripcion: str = Field(max_length = 400, nullable = False)