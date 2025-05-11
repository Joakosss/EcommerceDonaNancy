from . import SQLModel, Field, uuid
from sqlmodel import Session, select
from database import engine

class Forma_pago(SQLModel, table=True):
    id_forma_pago: str = Field(max_length=50, primary_key=True),
    descripcion: str = Field(max_length=400, nullable=False)

def crearFormaPago():
    formas_pago = [
        Forma_pago(id_forma_pago="0", descripcion="Tarjeta"),
        Forma_pago(id_forma_pago="1", descripcion="Debito"),
        Forma_pago(id_forma_pago="2", descripcion="Credito"),
        Forma_pago(id_forma_pago="3", descripcion="Transferencia")
    ]

    with Session(engine) as sesion:
        formas_existentes = exec(select(Forma_pago)).all()
        if not formas_existentes:
            sesion.add_all(formas_pago)
            sesion.commit()
            print("Formas de pago Creadas en bd")
        else:
            print("Formas de pago ya existen en bd")