from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, or_
from models import Pedido, EstadoPedido, FormaPago, Entrega
from schemas import PedidoCrear, PedidoLeer, PedidoActualizar
from database import get_session
from auth import obtener_usuario
from typing import Optional
from datetime import date

router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"],
)

#petición get (requiere login)
@router.get("/", response_model=list[PedidoLeer])
def get_buscar_pedidos(
    id_pedido: Optional[str] = None, 
    id_estado_pedido: Optional[str] = None,
    id_usuario: Optional[str] = None,
    id_forma_pago: Optional[str] = None,
    id_entrega: Optional[str] = None,
    sesion: Session = Depends(get_session)
):
    try:
        filtros = []

        if id_pedido:
            filtros.append(Pedido.id_pedido == id_pedido)
        if id_estado_pedido:
            filtros.append(Pedido.id_estado_pedido == id_estado_pedido)
        if id_usuario:
            filtros.append(Pedido.id_usuario == id_usuario)
        if id_forma_pago:
            filtros.append(Pedido.id_forma_pago == id_forma_pago)
        if id_entrega:
            filtros.append(Pedido.id_entrega == id_entrega)
        
        if filtros:
            query = select(Pedido).where(or_(*filtros))
        else:
            query = select(Pedido)
        pedidos = sesion.exec(query).all()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar pedidos: {str(e)}")
    return pedidos

#hacer pedido (requiere login)
@router.post("/", response_model=PedidoLeer)
def post_crear_pedido(
    pedido: PedidoCrear,
    sesion: Session = Depends(get_session),
    usuario_actual: str = Depends(obtener_usuario)
):
    try:
        #guardar la fecha actual de pedido
        pedido.fecha = date.today()

        #validar que haya un link de comprobante de pago si es que elige transferencia
        forma_pago = pedido.id_forma_pago
        if forma_pago == "3":
            if not pedido.comprobante_pago:
                raise HTTPException(status_code=400, detail="Se requiere comprobante de pago para transferencia")
        
        db_pedido = Pedido(**pedido.model_dump())
        sesion.add(db_pedido)
        sesion.commit()
        sesion.refresh(db_pedido)
        return PedidoLeer.model_validate(db_pedido)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear pedido: {str(e)}")
    