from sqlmodel import SQLModel, Field, Session
import uuid
import os

from .perfil import Perfil, crear_perfil
from .usuario import Usuario, crear_usuario, crear_nombreUsuario, crear_correo
from .estado_entrega import Estado_entrega, crear_estado_entrega
from .tipo_entrega import Tipo_entrega, crear_tipo_entrega
from .forma_pago import Forma_pago, crear_formas_pago
from .marca import Marca, crear_marcas
from .modelo import Modelo, crear_modelos
from .categoria import Categoria, crear_categorias
from .producto import Producto
from .entrega import Entrega
from .estado_pedido import Estado_pedido, crear_estado_pedido
from .pedido import Pedido
from .pedido_producto import Pedido_producto
from .sucursal import Sucursal