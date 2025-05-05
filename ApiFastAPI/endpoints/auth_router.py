from fastapi import APIRouter, Depends, HTTPException, Request
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
def login(nom_usuario: str, contrasenia: str, sesion: Session = Depends(get_session)):
    usuario = sesion.exec(select(Usuario).where(Usuario.nombre_usuario == nom_usuario)).first()
    if not usuario or not verificar_contrasenia(contrasenia, usuario.contrasenia):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")#401 credenciales invalidas
    
    token = crear_token_acceso({"sub": usuario.nombre_usuario})#toma el payload y lo convierte en un token
    refresh_token = crear_token_refresco({"sub": usuario.nombre_usuario})

    return {"access_token": token, "refresh_token": refresh_token, "token_type": "bearer"}#bearer es el tipo de token que se va a usar en la autenticacion

@router.post("/refresh")
async def refresh_token(request: Request):
    body = await request.json()
    refresh_token = body.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=400, detail="Se requiere un token de refresco")#400 error de peticion
    
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token de refresco no válido")
        
        nuevo_token = crear_token_acceso({"sub": username})
        return {"access_token": nuevo_token, "token_type": "bearer"}
    except Exception:
        raise HTTPException(status_code=401, detail="Token de refresco no válido")
    