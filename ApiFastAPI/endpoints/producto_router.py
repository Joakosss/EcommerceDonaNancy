from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, and_
from models import Producto, Marca, Modelo
from database import get_session
from schemas import ProductoCrear, ProductoLeer, ProductoActualizar
from auth import obtener_usuario
from typing import Optional

router = APIRouter(
    prefix="/productos",
    tags=["Productos"],
)

#petición get (requiere login)
@router.get("/", response_model=list[ProductoLeer])
def get_buscar_productos(
    id_producto: Optional[str] = None,
    id_marca: Optional[str] = None,
    id_modelo: Optional[str] = None,
    nombre: Optional[str] = None,
    id_categoria: Optional[str] = None,
    sesion: Session = Depends(get_session)
):
    try:
        filtros = []

        #se agregan filtros a la consulta si se agrega alguno de los parámetros en el endpoint
        if id_producto:
            filtros.append(Producto.id_producto == id_producto)
        if id_marca:
            filtros.append(Producto.id_marca == id_marca)
        if id_modelo:
            filtros.append(Producto.id_modelo == id_modelo)
        if nombre:
            filtros.append(Producto.nombre.ilike(f"%{nombre}%"))
        if id_categoria:
            filtros.append(Modelo.id_categoria == id_categoria)
            join = True

        if filtros:
            if join:
                query = select(Producto).join(Modelo)
            query = query.where(and_(*filtros))
        else:
            query = select(Producto)
        productos = sesion.exec(query).all()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar productos: {str(e)}")
    return productos
    
#Petición get para los 4 productos mas vendidos
@router.get("/populares", response_model=list[ProductoLeer])
def get_productos_populares(
    sesion: Session = Depends(get_session)
):
    try:
        productos = select(Producto).order_by(Producto.stock.desc()).limit(4)
        productos = sesion.exec(productos).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar productos: {str(e)}")
    return productos

#obtener un producto por id (requiere login)
@router.get("/{id_producto}", response_model=ProductoLeer)
def get_producto_id(
    id_producto: str, sesion: Session = Depends(get_session)
):
    try:
        producto = sesion.get(Producto, id_producto)
        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail={
                "mensaje": "Error al obtener producto",
                "error": [str(e)]
            }
        )
    return producto

#crear un producto (requiere login)    
@router.post("/", response_model=ProductoLeer)
def post_producto(
    producto: ProductoCrear, 
    sesion: Session = Depends(get_session),
    usuario_actual: Producto = Depends(obtener_usuario)
):
    try:
        errores = []     
        if producto.stock < 0:
            errores.append("El stock no puede ser menor a 0")
        if producto.precio < 0:
            errores.append("El precio no puede ser menor a 0")
        
        #Validaciones de claves foraneas
        if not sesion.get(Marca, producto.id_marca):
            errores.append("La id de marca ingresada no existe")
        if not sesion.get(Modelo, producto.id_modelo):
            errores.append("la id de modelo ingresado no existe")
        
        if errores:
            return JSONResponse(
                status_code=400,
                content={
                    "mensaje": "Error al crear producto",
                    "errores": errores
                }
            )
        
        db_producto = Producto(**producto.model_dump()) #Crea un diccionario con los datos del producto
        sesion.add(db_producto) #Agregar el producto a la sesión
        sesion.commit() #Guardar los cambios en la base de datos
        sesion.refresh(db_producto)
        return ProductoLeer.model_validate(db_producto) #devuelve el producto creado

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear producto {str(e)}")

#actualizar un producto (requiere login)
@router.patch("/{id_producto}", response_model=ProductoLeer)
def patch_producto(
    id_producto: str, producto: ProductoActualizar, 
    sesion: Session = Depends(get_session),
    usuario_actual: Producto = Depends(obtener_usuario)
):
    try:
        db_producto = sesion.get(Producto, id_producto)
        if not db_producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        producto_data = producto.model_dump(exclude_unset=True) #excluye los datos que no se modifiquen 
        for key, value in producto_data.items():
            setattr(db_producto, key, value)
        sesion.add(db_producto)
        sesion.commit()
        sesion.refresh(db_producto)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar producto {str(e)}")
    return db_producto

#eliminar un producto (requiere login)
@router.delete("/{id_producto}")
def delete_producto(
    id_producto: str, 
    sesion: Session = Depends(get_session),
    usuario_actual: Producto = Depends(obtener_usuario)
):
    try:
        producto = sesion.get(Producto, id_producto)
        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        sesion.delete(producto)
        sesion.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar producto {str(e)}")
    return {"mensaje": "Producto eliminado correctamente"}