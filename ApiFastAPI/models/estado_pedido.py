from . import SQLModel, Field, uuid
from database import engine
from sqlmodel import Session, select

class Estado_pedido(SQLModel, table=True):
    id_estado_pedido: str = Field(default_factory=lambda: str(uuid.uuid4()), max_length=50, primary_key=True)
    descripcion: str = Field(max_length=400, nullable=False)

def crear_estado_pedido():
    estados_pedido = [
        Estado_pedido(id_estado_pedido="0", descripcion="Revisando Pago"),
        Estado_pedido(id_estado_pedido="1", descripcion="Rechazado"),
        Estado_pedido(id_estado_pedido="2", descripcion="Cancelado"),
        Estado_pedido(id_estado_pedido="3", descripcion="Pagado"),
    ]

    with Session(engine) as sesion:
        estados_pedido_existentes = sesion.exec(select(Estado_pedido)).all()
        if not estados_pedido_existentes:
            sesion.add_all(estados_pedido)
            sesion.commit()
            print("Estados de pedido creados")
        else:
            print("Estados de pedido ya existentes en BD")
