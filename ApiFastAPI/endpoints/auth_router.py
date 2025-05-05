from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from database import get_session
from models import Usuario
from auth import verificar_contrasenia, crear_token_acceso

router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"],
)

@router.post("/login")
def login(nom_usuario: str, contrasenia: str, sesion: Session = Depends(get_session)):
    usuario = sesion.exec(select(Usuario).where(Usuario.nombre_usuario == nom_usuario)).first()
    if not usuario or not verificar_contrasenia(contrasenia, usuario.contrasenia):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")#401 credenciales invalidas
    token = crear_token_acceso({"sub": usuario.nombre_usuario})#toma el payload y lo convierte en un token
    return {"access_token": token, "token_type": "bearer"}#bearer es el tipo de token que se va a usar en la autenticacion