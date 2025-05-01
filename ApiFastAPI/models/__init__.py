from sqlmodel import SQLModel, Field, Session
import uuid
import os

from .perfil import Perfil, crear_perfil
from .usuario import Usuario, crear_usuario