from . import SQLModel, Field, uuid

class Sucursal(SQLModel, table=True):
    id_sucursal: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    nombre: str = Field(max_length=200, nullable=False)
    direccion: str = Field(max_length=400, nullable=False)
    telefono: int = Field(nullable=False)