from fastapi import FastAPI, HTTPException
from sqlmodel import SQLModel
from database import engine
from models import *

app = FastAPI()

# Crear tablas 
@app.on_event("startup")
def crear_tablas():
    try:
        SQLModel.metadata.create_all(engine)
        print("Tablas creadas correctamente")
    except Exception as e:
        print(f"Error al crear las tablas: {e}")


if __name__ == "__main__":
    crear_tablas()

@app.get("/")
async def root():
    return {"mensaje": "FastAPI Doña Nancy"}

