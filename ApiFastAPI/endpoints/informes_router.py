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
    
#Informes de contaduria
#ventas por mes:
@router.get("/ventas_por_mes", response_model=list[dict])
def get_ventas_por_mes(sesion: Session = Depends(get_session)):
    try:
        consulta = text("""
            SELECT 
            TO_CHAR(p.fecha, 'MM') AS mes,
            SUM(p.total) AS total_ventas,
            COUNT(p.id_pedido) AS total_pedidos
            FROM pedido p
            JOIN estado_pedido ep
                ON p.id_estado_pedido = ep.id_estado_pedido
            WHERE EXTRACT(YEAR FROM p.fecha) = EXTRACT(YEAR FROM SYSDATE)
            GROUP BY TO_CHAR(p.fecha, 'MM')
        """)
        resultados = sesion.exec(consulta).all()

        return [
            {
                "mes": row[0],
                "total_ventas": row[1],
                "total_pedidos": row[2]
            } for row in resultados
        ]

    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    
#Total ventas por año:
@router.get("/ventas_por_anio", response_model=list[dict])
def get_ventas_por_anio(sesion: Session = Depends(get_session)):
    try:
        consulta = text("""
            SELECT 
                EXTRACT(YEAR FROM SYSDATE) AS anio,
                SUM(p.total) AS total_ventas,
                COUNT(p.id_pedido) AS total_pedidos
            FROM pedido p
            JOIN estado_pedido ep
                ON p.id_estado_pedido = ep.id_estado_pedido
            WHERE EXTRACT(YEAR FROM SYSDATE) = EXTRACT(YEAR FROM p.fecha)
            GROUP BY EXTRACT(YEAR FROM p.fecha)

        """)
        resultados = sesion.exec(consulta).all()

        return [
            {
                "anio": row[0],
                "total_ventas": row[1],
                "total_pedidos": row[2]
            } for row in resultados
        ]

    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

#Informe de compras por cliente
@router.get("/compras_por_cliente", response_model=list[dict])
def get_compras_por_cliente(sesion: Session = Depends(get_session)):
    try:
        consulta = text("""
            SELECT
                p.id_pedido,
                p.fecha,
                p.total,
                u.p_nombre || ' ' || u.p_apellido AS cliente,
                s.nombre AS sucursal,
                e.fecha_entrega AS fecha_entrega,
                te.descripcion AS tipo_entrega,
                ep.descripcion AS estado_pedido
            FROM pedido p
            JOIN usuario u ON p.id_usuario = u.id_usuario
            JOIN entrega e ON p.id_entrega = e.id_entrega
            JOIN sucursal s ON e.id_sucursal = s.id_sucursal
            JOIN tipo_entrega te ON e.id_tipo_entrega = te.id_tipo_entrega
            JOIN estado_pedido ep ON p.id_estado_pedido = ep.id_estado_pedido
            WHERE p.fecha BETWEEN TO_DATE('2025-01-01', 'YYYY-MM-DD') AND TO_DATE('2025-12-31', 'YYYY-MM-DD');
        """)
        resultados = sesion.exec(consulta).all()

        return [
            {
                "id_cliente": row[0],
                "nombre_cliente": row[1],
                "total_pedidos": row[2],
                "total_compras": row[3]
            } for row in resultados
        ]

    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))