# Ecommerce Doña Nancy

Doña Nancy es una plataforma de ecommerce orientada al retail, desarrollada con fines educativos. El proyecto busca simular un entorno real de comercio electrónico real.

## Características principales:

🧑‍💼 Gestión de perfiles: Los usuarios pueden registrarse, gestionar su información y acceder a su historial de compras.

🛒 Catálogo de productos: Sección dedicada a mostrar productos organizados, con detalles como imágenes, descripciones, precios y disponibilidad.

💳 Integración con Webpay: Se incluye conexión con Webpay como ejemplo práctico de integración con plataformas de pago.

📦 Carrito de compras y flujo de checkout: Implementación completa del flujo de compra.

## Tecnologías utilizadas:

Frontend: React.js – para construir una interfaz dinámica y responsiva.

Backend: FastAPI y Express.js – permitiendo una arquitectura flexible y modular.

Base de datos: OracleSql – para gestionar datos de usuarios, productos y órdenes de forma eficiente y relacional.

## Instalación:
### fastApi:
    1. Crear BD oracle usuario y contraseña "  db_nancy  "
```bash
  cd ApiFastApi
  python -m venv venv
  venv\Scripts\activate
  pip install -r requirements.txt
  uvicorn main:app
```
### Client(react):
```bash
  cd client
  npm install -g pnpm
  pnpm install
  pnpm run dev
```    
### ApiNodeJS:
```bash
  cd ApiNodeJS
  pnpm install
  pnpm run dev
```    
