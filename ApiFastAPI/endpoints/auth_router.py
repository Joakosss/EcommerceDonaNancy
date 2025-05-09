from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from sqlmodel import Session, select
from database import get_session
from models import Usuario
from auth import verificar_contrasenia, crear_token_acceso, crear_token_refresco, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"],
)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), sesion: Session = Depends(get_session)):
    usuario = sesion.exec(select(Usuario).where(Usuario.nombre_usuario == form_data.username)).first()
    
    if not usuario or not verificar_contrasenia(form_data.password, usuario.contrasenia):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")#401 credenciales invalidas
    
    token = crear_token_acceso({"sub": usuario.id_usuario})#toma el payload y lo convierte en un token
    refresh_token = crear_token_refresco({"sub": usuario.id_usuario})

    return {
        "access_token": token, 
        "refresh_token": refresh_token,
        "id_usuario": str(usuario.id_usuario),
        "nombre_usuario": usuario.nombre_usuario,
        "perfil": usuario.id_perfil
    }

@router.post("/refresh")
async def refresh_token(request: Request, sesion: Session = Depends(get_session)):
    body = await request.json()
    refresh_token = body.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=400, detail="Se requiere un token de refresco")#400 error de peticion
    
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        id_usuario = payload.get("sub")

        if id_usuario is None:
            raise HTTPException(status_code=401, detail="Token de refresco no válido")
        
        #Validar si el usuario existe en la BD
        usuario = sesion.exec(select(Usuario).where(Usuario.id_usuario == id_usuario)).first()
        if not usuario:
            raise HTTPException(status_code=401, detail="Token de refresco no válido")
        
        nuevo_token = crear_token_acceso({"sub": id_usuario})
        return {"access_token": nuevo_token}
    except Exception:
        raise HTTPException(status_code=401, detail="Token de refresco no válido")
    