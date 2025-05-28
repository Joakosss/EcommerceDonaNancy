from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import JSONResponse
from sqlmodel import Session
from sqlalchemy import text
from database import get_session

router = APIRouter(
    prefix="/informes",
    tags=["Informes"],
)

@router.get("/productos_vendidos", response_model=dict)
def get_informe_productos_vendidos(sesion: Session = Depends(get_session)):
    try:
        consulta = text("""
            SELECT producto.nombre, SUM(pedido_producto.cantidad) AS total_vendido
            FROM pedido_producto
            JOIN producto ON pedido_producto.id_producto = producto.id_producto
            GROUP BY producto.nombre
            ORDER BY total_vendido DESC
        """)
        resultados = sesion.exec(consulta).all()

        return {
            "productos_mas_vendidos": [
                {"nombre": row[0], "cantidad_vendida": row[1]} for row in resultados
            ]
        }

    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    
@router.get("/entregas_sucursal", response_model=list[dict])
def get_entregas_por_sucursal(
    id_estado_entrega: str = Query(default='1'),
    sesion: Session = Depends(get_session)
):
    try:
        query_sql = text("""
            SELECT COUNT(e.ID_ENTREGA) AS cantidad_entregas,
                   s.NOMBRE AS nombre_sucursal,
                   SUM(p.TOTAL) AS ventas_sucursal,
                   te.DESCRIPCION AS tipo_entrega
            FROM ESTADO_ENTREGA ee
            JOIN ENTREGA e ON ee.ID_ESTADO_ENTREGA = e.ID_ESTADO_ENTREGA
            JOIN PEDIDO p ON p.ID_ENTREGA = e.ID_ENTREGA
            JOIN SUCURSAL s ON e.ID_SUCURSAL = s.ID_SUCURSAL
            JOIN TIPO_ENTREGA te ON e.ID_TIPO_ENTREGA = te.ID_TIPO_ENTREGA
            WHERE ee.ID_ESTADO_ENTREGA = :estado
            GROUP BY s.NOMBRE, te.DESCRIPCION
        """)

        #La consulta con parametros (bindparams indica que se usará un parámetro en la consulta)
        resultado = sesion.exec(query_sql.bindparams(estado=id_estado_entrega)).all()

        informes = [
            {
                "cantidad_entregas": row[0],
                "nombre_sucursal": row[1],
                "ventas_sucursal": row[2],
                "tipo_entrega": row[3]
            }
            for row in resultado
        ]

        return informes

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener informe: {str(e)}")
    
#informe para ver stock de los productos
@router.get("/stock_productos", response_model=list[dict])
def get_stock_productos(sesion: Session = Depends(get_session)):
    try:
        consulta = text("""
            SELECT P.ID_PRODUCTO AS "ID PRODUCTO",
            P.NOMBRE,
            P.STOCK,
            M.DESCRIPCION AS "MARCA",
            C.DESCRIPCION AS "CATEGORÍA"
            FROM PRODUCTO P
            JOIN MODELO M
                ON P.ID_MODELO = M.ID_MODELO
            JOIN MARCA MA
                ON P.ID_MARCA = MA.ID_MARCA
            JOIN CATEGORIA C
                ON M.ID_CATEGORIA = C.ID_CATEGORIA
            ORDER BY P.STOCK DESC, P.NOMBRE ASC
        """)
        resultados = sesion.exec(consulta).all()

        return [
            {
                "id_producto": row[0],
                "nombre_producto": row[1],
                "stock": row[2],
                "marca": row[3],
                "categoria": row[4]
            } for row in resultados
        ]

    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    
#informe para ver productos con stock bajo
@router.get("/stock_bajo", response_model=list[dict])
def get_stock_bajo(sesion: Session = Depends(get_session)):
    try:
        consulta = text("""
            SELECT P.ID_PRODUCTO AS "ID PRODUCTO",
            P.NOMBRE,
            P.STOCK,
            M.DESCRIPCION AS "MARCA",
            C.DESCRIPCION AS "CATEGORÍA"
            FROM PRODUCTO P
            JOIN MODELO M
                ON P.ID_MODELO = M.ID_MODELO
            JOIN MARCA MA
                ON P.ID_MARCA = MA.ID_MARCA
            JOIN CATEGORIA C
                ON M.ID_CATEGORIA = C.ID_CATEGORIA
            WHERE P.STOCK < 25
            ORDER BY P.STOCK ASC, P.NOMBRE ASC
            FETCH FIRST 10 ROWS ONLY
        """)
        resultados = sesion.exec(consulta).all()

        return [
            {
                "id_producto": row[0],
                "nombre_producto": row[1],
                "stock": row[2],
                "marca": row[3],
                "categoria": row[4]
            } for row in resultados
        ]

    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))