from . import SQLModel, Field, uuid

class Producto(SQLModel, table=True):
    id_producto: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    nombre: str = Field(max_length=200 , nullable=False)
    descripcion: str = Field(max_length=500 , nullable=False)
    link_foto: str = Field(max_length=500 , nullable=False)
    precio: int = Field(nullable=False)
    stock: int = Field(nullable=False)
    id_categoria: str = Field(max_length=50, foreign_key="categoria.id_categoria", nullable=False)
    id_modelo: str = Field(max_length=50, foreign_key="modelo.id_modelo", nullable=False)
