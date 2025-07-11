from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, or_
from models import Usuario, crear_nombreUsuario, crear_correo
from database import get_session
from schemas import UsuarioCrear, UsuarioLeer, UsuarioActualizar
from auth import crear_contrasenia, obtener_usuario
from typing import Optional

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"],
)

#petición get (requiere login)
@router.get("/", response_model=list[UsuarioLeer])
def get_buscar_usuarios(
    id_usuario: Optional[str] = Query(None),
    id_perfil: Optional[str] = Query(None),
    p_nombre: Optional[str] = Query(None),
    p_apellido: Optional[str] = Query(None),
    session: Session = Depends(get_session),
    usuario_actual: Usuario = Depends(obtener_usuario)
):
    try:
        filtros = []

        #se agregan los filtros a la lista si se ingresan en el endpoint 
        if id_usuario:
            filtros.append(Usuario.id_usuario == id_usuario)
        if id_perfil:
            filtros.append(Usuario.id_perfil == id_perfil)
        if p_nombre:
            filtros.append(Usuario.p_nombre.ilike(f"%{p_nombre}%"))
        if p_apellido:
            filtros.append(Usuario.p_apellido.ilike(f"%{p_apellido}%"))

        #si existen filtros, se agregan a la consulta con el operador OR
        #or_(*filtros) descompone la lista y la pasa como argumentos separados al operador OR
        if filtros:
            query = select(Usuario).where(or_(*filtros))  
        #Si no se ingresan filtros, se devuelven todos los usuarios
        else:
            query = select(Usuario)
        usuarios = session.exec(query).all()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar usuarios: {str(e)}")
    return usuarios

#obtener un usuario por id (requiere login)
@router.get("/{id_usuario}", response_model=UsuarioLeer)
def get_usuario_id(
    id_usuario: str, session: Session = Depends(get_session),
    usuario_actual: Usuario = Depends(obtener_usuario)
):
    try:
        usuario = session.get(Usuario, id_usuario)
        if not usuario:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener usuario {str(e)}")
    return usuario

#crear un usuario (no requiere login)
@router.post("/", response_model=UsuarioLeer) 
def post_usuario(usuario: UsuarioCrear, session: Session = Depends(get_session)):
    try:
        print(usuario)
        #Crea el nombre de usuario si no se ingresa
        if not usuario.nombre_usuario:
            usuario.nombre_usuario = crear_nombreUsuario(usuario.p_nombre, usuario.p_apellido, usuario.run_usuario)
        #Crea el correo si no se ingresa
        if not usuario.correo: 
            usuario.correo = crear_correo(usuario.p_nombre, usuario.p_apellido)

        errores = []#puse los errores en una lista por si hay mas de uno

        #verifica si rut, username o correo ya existan en la bd
        run_usuario =  session.exec(select(Usuario).where(Usuario.run_usuario == usuario.run_usuario)).first()
        if run_usuario:
            errores.append("El rut a registrar ya existe")

        nombre_usuario = session.exec(select(Usuario).where(Usuario.id_usuario == usuario.nombre_usuario)).first()
        if nombre_usuario:
            errores.append("El nombre de usuario a registrar ya existe")
        
        correo_usuario = session.exec(select(Usuario).where(Usuario.correo == usuario.correo)).first()
        if correo_usuario:
            errores.append("El correo a registrar ya existe")
        
        if errores:
            return JSONResponse(
                status_code=400,
                content={
                    "mensaje": "Error al crear usuario",
                    "errores": errores
                }
            )
        #Guarda el usuario en bd
        db_usuario = Usuario(**usuario.model_dump())
        db_usuario.contrasenia = crear_contrasenia(usuario.contrasenia) #encripta la contraseña
        session.add(db_usuario) #convierte el modelo a un diccionario
        session.commit()
        session.refresh(db_usuario)#devuelve el objeto actualizado desde la base de datos

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear usuario {str(e)}")
    return db_usuario

#actualizar un usuario (requiere login)
@router.patch("/{id_usuario}", response_model=UsuarioLeer)
def patch_usuario(
    id_usuario: str, usuario: UsuarioActualizar, session: Session = Depends(get_session),
    usuario_actual: Usuario = Depends(obtener_usuario)
):
    try:
        db_usuario = session.get(Usuario, id_usuario)
        if not db_usuario:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        usuario_data = usuario.model_dump(exclude_unset=True)#excluye los datos que no se han modificado
        if "contrasenia" in usuario_data:
            usuario_data["contrasenia"] = crear_contrasenia(usuario_data["contrasenia"]) 

        for key, value in usuario_data.items():
            setattr(db_usuario, key, value)
        
        session.add(db_usuario)
        session.commit()
        session.refresh(db_usuario)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar usuario {str(e)}")
    return db_usuario

#eliminar un usuario (requiere login)
@router.delete("/{id_usuario}")
def delete_usuario(
    id_usuario: str, session: Session = Depends(get_session),
    usuario_actual: Usuario = Depends(obtener_usuario)
):
    try:
        db_usuario = session.get(Usuario, id_usuario)
        if not db_usuario:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        session.delete(db_usuario)
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar usuario {str(e)}")
    return {"mensaje": "Usuario eliminado correctamente"}