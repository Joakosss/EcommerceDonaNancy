from sqlmodel import SQLModel, Field
import uuid
import os

from .perfil import Perfil, crear_perfil
from .usuario import Usuario