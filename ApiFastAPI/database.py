#Conexion a la BD
from sqlmodel import create_engine
from dotenv import load_dotenv
import os

load_dotenv() #carga las variables del .env

usuario = os.getenv("DB_USER")
contrasena = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
puerto = os.getenv("DB_PORT")
servicio = os.getenv("DB_SERVICE") 
""" archivo .env 
DB_USER=db_nancy
DB_PASSWORD=db_nancy
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=orcl 
DB_SERVICE=orcl.duoc.com.cl """

DATABASE_URL = f"oracle+oracledb://{usuario}:{contrasena}@{host}:{puerto}/?service_name={servicio}"

engine = create_engine(DATABASE_URL, echo=True)
