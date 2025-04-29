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

#PUT 
@router.put("/perfil-put/{id_perfil}", response_model=PerfilLeer)
def put_perfil(id_perfil: str, perfil: PerfilActualizar, session: Session = Depends(get_session)):
    try:
        db_perfil = session.get(Perfil, id_perfil)
        if not db_perfil:
            raise HTTPException(status_code=404, detail="Perfil no encontrado")
        perfil_data = perfil.model_dump(exclude_unset=True) #excluye los datos que no se han modificado
        for key, value in perfil_data.items():
            setattr(db_perfil, key, value)
        session.add(db_perfil)
        session.commit()
        session.refresh(db_perfil)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar perfil {str(e)}")
    return db_perfil

#PATCH
@router.patch("/perfil-patch/{id_perfil}", response_model=PerfilLeer)
def patch_perfil(id_perfil: str, perfil: PerfilActualizar, session: Session = Depends(get_session)):
    try:
        db_perfil = session.get(Perfil, id_perfil)
        if not db_perfil:
            raise HTTPException(status_code=404, detail="Perfil no encontrado")
        perfil_data = perfil.model_dump(exclude_unset=True)
        for key, value in perfil_data.items():
            setattr(db_perfil, key, value)
        session.add(db_perfil)
        session.commit()
        session.refresh(db_perfil)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar perfil {str(e)}")
    return db_perfil
    
#DELETE
@router.delete("/perfil-delete/{id_perfil}", status_code=status.HTTP_204_NO_CONTENT)
def delete_perfil(id_perfil: str, session: Session = Depends(get_session)):
    try:
        db_perfil = session.get(Perfil, id_perfil)
        if not db_perfil:
            raise HTTPException(status_code=404, detail="Perfil no encontrado")
        session.delete(db_perfil)
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar perfil {str(e)}")