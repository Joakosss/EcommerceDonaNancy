from fastapi import FastAPI
from sqlmodel import SQLModel
from database import engine
from models import crear_perfil, crear_usuario
from endpoints import perfil_router, usuario_router

app = FastAPI(
    title="API Boutique Doña Nancy",
    description="API gestión de usuarios y perfiles (Por ahora :p)",
    version="0.1.0",
)

# Crear tablas
@app.on_event("startup")
def crear_tablas():
    try:
        SQLModel.metadata.create_all(engine)
        print("Tablas creadas correctamente")
        try:
            crear_perfil()
            crear_usuario()
            print("Datos fijos creados correctamente")
        except Exception as e:
            print(f"Error al crear datos de prueba: {e}")
    except Exception as e:
        print(f"Error al crear las tablas: {e}")

@app.get("/")
async def root():
    return {"mensaje": "FastAPI Doña Nancy"}

#Importar enpoints
app.include_router(perfil_router.router, prefix="/api", tags=["Perfiles"])
app.include_router(usuario_router.router, prefix="/api", tags=["Usuarios"])
