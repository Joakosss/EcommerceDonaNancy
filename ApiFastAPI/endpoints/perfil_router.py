from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from models import Perfil
from database import get_session
from schemas import PerfilCrear, PerfilLeer, PerfilActualizar


router = APIRouter()

@router.get("/perfiles", response_model=list[PerfilLeer])
def get_perfiles(session: Session = Depends(get_session)):
    try:
        perfiles = session.exec(select(Perfil)).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener perfiles {str(e)}")
    return perfiles

@router.post("/perfil-post", response_model=PerfilLeer)
def post_perfil(perfil: PerfilCrear, session: Session = Depends(get_session)):
    try:
        db_perfil =  Perfil(**perfil.model_dump())
        session.add(db_perfil)
        session.commit()
        session.refresh(db_perfil)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear perfil{str(e)}")
    return db_perfil 

@router.get("/perfil-get/{id_perfil}", response_model=PerfilLeer)
def get_perfil_id(id_perfil: str, session: Session = Depends(get_session)):
    try:
        perfil = session.get(Perfil, id_perfil)
        if not perfil:
            raise HTTPException(status_code=404, detail="Perfil no encontrado")
        return perfil

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener perfil {str(e)}")
