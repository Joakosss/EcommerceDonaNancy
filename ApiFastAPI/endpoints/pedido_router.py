from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, or_
from models import Pedido, Estado_pedido, Forma_pago, Entrega
from schemas import PedidoLeer, PedidoActualizar
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

#petición get por "mis pedidos" (requiere login)
@router.get("/mis-pedidos", response_model=list[PedidoLeer])
def get_mis_pedidos(
    sesion: Session = Depends(get_session),
    usuario_actual: Pedido = Depends(obtener_usuario)
):
    try:
        query = select(Pedido).where(Pedido.id_usuario == usuario_actual.id_usuario)
        pedidos = sesion.exec(query).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar mis pedidos: {str(e)}")
    return pedidos

#modificar pedido (requiere login)
@router.patch("/{id_pedido}", response_model=PedidoLeer)
def patch_pedido(
    id_pedido: str,
    pedido: PedidoActualizar,
    sesion: Session = Depends(get_session),
    usuario_actual: Pedido = Depends(obtener_usuario)
):
    try:
        db_pedido = sesion.get(Pedido, id_pedido)
        if not db_pedido:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")
        pedido_data = pedido.model_dump(exclude_unset=True)
        for key, value in pedido_data.items():
            setattr(db_pedido, key, value)
        sesion.add(db_pedido)
        sesion.commit()
        sesion.refresh(db_pedido)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al modificar el pedido: {str(e)}")
    return pedido

@router.delete("/{id_pedido}")
def delete_pedido(
    id_pedido: str,
    sesion: Session = Depends(get_session),
    usuario_actual: Pedido = Depends(obtener_usuario)
):
    try:
        pedido = sesion.get(Pedido, id_pedido)
        if not pedido:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")
        sesion.delete(pedido)
        sesion.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar el pedido: {str(e)}")