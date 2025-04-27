from . import SQLModel, Field, uuid

class Perfil(SQLModel, table=True):
    id_perfil: str = Field(default_factory = uuid.uuid4, primary_key = True)
    descripcion: str = Field(max_length = 400, nullable = False)