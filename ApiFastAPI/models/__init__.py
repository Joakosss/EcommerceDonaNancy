from sqlmodel import SQLModel, Field, Session
import uuid
import os

from .perfil import Perfil, crear_perfil
from .usuario import Usuario, crear_usuario, crear_nombreUsuario, crear_correo
from .estado_entrega import Estado_entrega, crear_estado_entrega
from .tipo_entrega import Tipo_entrega, crear_tipo_entrega
from .marca import Marca, crear_marcas
from .modelo import Modelo, crear_modelos