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
from .entrega import Entrega, crear_entregas
from .estado_pedido import Estado_pedido, crear_estado_pedido
from .pedido import Pedido, crear_pedidos
from .pedido_producto import Pedido_producto, crear_pedido_productos
from .sucursal import Sucursal, crear_sucursales
from .producto import Producto, crear_productos, crear_id_producto