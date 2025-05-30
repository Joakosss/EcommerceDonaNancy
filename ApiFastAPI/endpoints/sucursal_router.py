from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models import Sucursal
from auth import obtener_usuario
from database import get_session
from schemas import SucursalLeer

router = APIRouter(
    prefix="/sucursales",
    tags=["Sucursales"],
)

#petición get (requiere login)
@router.get("/", response_model=list[SucursalLeer])
def get_sucursales(
    sesion: Session = Depends(get_session)
):
    try:
        query = select(Sucursal)
        sucursales = sesion.exec(query).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar sucursales: {str(e)}")
    return sucursales
