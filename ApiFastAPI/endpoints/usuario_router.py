from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models import Usuario
from database import get_session
from schemas import UsuarioCrear, UsuarioLeer, UsuarioActualizar
from auth import crear_contrasenia

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"],
)


@router.get("/", response_model=list[UsuarioLeer])
def get_usuarios(session: Session = Depends(get_session)):
    try:
        usuarios = session.exec(select(Usuario)).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener usuarios {str(e)}")
    return usuarios


@router.get("/{id_usuario}", response_model=UsuarioLeer)
def get_usuario_id(id_usuario: str, session: Session = Depends(get_session)):
    try:
        perfil = session.get(Usuario, id_usuario)
        if not perfil:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return perfil
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener usuario {str(e)}")


@router.post("/", response_model=UsuarioLeer)
def post_usuario(usuario: UsuarioCrear, session: Session = Depends(get_session)):
    try:
        db_usuario = Usuario(**usuario.model_dump())
        db_usuario.contrasenia = crear_contrasenia(usuario.contrasenia) #encripta la contraseña
        session.add(db_usuario) #convierte el modelo a un diccionario
        session.commit()
        session.refresh(db_usuario)#devuelve el objeto actualizado desde la base de datos
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear usuario {str(e)}")
    return db_usuario


@router.patch("/{id_usuario}", response_model=UsuarioLeer)
def patch_usuario(id_usuario: str, usuario: UsuarioActualizar, session: Session = Depends(get_session)):
    try:
        db_usuario = session.get(Usuario, id_usuario)
        if not db_usuario:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        usuario_data = usuario.model_dump(exclude_unset=True)#excluye los datos que no se han modificado
        for key, value in usuario_data.items():
            setattr(db_usuario, key, value)
        session.add(db_usuario)
        session.commit()
        session.refresh(db_usuario)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar usuario {str(e)}")
    return db_usuario


@router.delete("/{id_usuario}")
def delete_usuario(id_usuario: str, session: Session = Depends(get_session)):
    try:
        db_usuario = session.get(Usuario, id_usuario)
        if not db_usuario:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        session.delete(db_usuario)
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar usuario {str(e)}")
    return {"mensaje": "Usuario eliminado correctamente"}