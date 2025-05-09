from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from pydantic import BaseModel
from models import Usuario
import os 

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") #algoritmo de encriptacion 

#ruta para obtener el token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

#funcion para crear un contraseña encriptada
def crear_contrasenia(contrasenia: str) -> str:
    return pwd_context.hash(contrasenia) #devuelve la contraseña encriptada

#función que verifica la contraseña recibida y la contraseña encriptada
def verificar_contrasenia(contrasenia: str, contrasenia_hash: str) -> bool:
    return pwd_context.verify(contrasenia, contrasenia_hash)

#función para crear un token de acceso
def crear_token_acceso(data: dict, expires_delta: timedelta | None = None) -> str: 
    to_enconde = data.copy()#copia el diccionario de datos
    if expires_delta: #si se le pasa un tiempo de expiracion
        expire = datetime.utcnow() + expires_delta #se le suma al tiempo actual el tiempo de expiracion
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES) #sino se le suma el tiempo de expiracion por defecto
    to_enconde.update(
        {"exp": expire, "sub": data["sub"]}) 
    
    encoded_jwt = jwt.encode(to_enconde, SECRET_KEY, algorithm=ALGORITHM) #se codifica el diccionario con la clave secreta y el algoritmo
    return encoded_jwt 

#función para crear token de refresco
def crear_token_refresco(data: dict, expires_delta: timedelta = timedelta(days=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta #se le suma al tiempo actual el tiempo de expiracion
    to_encode.update({"exp": expire}) #se le agrega la fecha de expiracion al diccionario
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM) #se codifica el diccionario

#función para verificar el token de acceso
def verificar_token_acceso(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) 
        return payload
    except JWTError:
        return print("Token no valido")

class TokenData(BaseModel):
    id_usuario: str 

#funcion para autorizar al usuario
def obtener_usuario(token: str = Depends(oauth2_scheme), sesion: Session = Depends(get_session)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id_usuario: str = payload.get("sub") #obtiene el nombre de usuario del payload
        if id_usuario is None:
            raise HTTPException(status_code=401, detail="Token no valido")
        token_data = TokenData(id_usuario=id_usuario)
    except JWTError:
        raise HTTPException(status_code=401, detail="Token no valido")

    usuario = sesion.exec(select(Usuario).where(Usuario.id_usuario == token_data.id_usuario)).first()
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario #devuelve el usuario si el token es valido y el usuario existe