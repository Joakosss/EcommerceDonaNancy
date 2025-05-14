from fastapi import FastAPI
from sqlmodel import SQLModel
from database import engine
from models import crear_perfil, crear_usuario, crear_estado_entrega, crear_tipo_entrega, crear_marcas, crear_modelos, crear_categorias, crear_estado_pedido, crear_formas_pago
from endpoints import usuario_router, auth_router, producto_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="API Boutique Doña Nancy",
    description="API gestión de usuarios y productos :D",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Crear tablas
@app.on_event("startup")
def crear_tablas():
    try:
        SQLModel.metadata.create_all(engine)
        print("Tablas creadas correctamente")
        try:
            #Funciones para agregar datos fijos en BD
            crear_perfil()
            crear_usuario()
            crear_estado_entrega()
            crear_tipo_entrega()
            crear_marcas()
            crear_modelos()
            crear_categorias()
            crear_estado_pedido()
            crear_formas_pago()
            print("Datos fijos creados correctamente")
        except Exception as e:
            print(f"Error al crear datos de prueba: {e}")
    except Exception as e:
        print(f"Error al crear las tablas: {e}")

@app.get("/")
async def root():
    return {"mensaje": "FastAPI Doña Nancy"}

#Importar enpoints
app.include_router(auth_router.router, prefix="/api", tags=["Autenticación"])
app.include_router(usuario_router.router, prefix="/api", tags=["Usuarios"])
app.include_router(producto_router.router, prefix="/api", tags=["Productos"])
