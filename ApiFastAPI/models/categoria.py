from . import SQLModel, Field

class Categoria(SQLModel, table=True):
    id_categoria: str = Field(max_length=50, primary_key=True)
    descripcion: str = Field(max_length=400, nullable=False)

