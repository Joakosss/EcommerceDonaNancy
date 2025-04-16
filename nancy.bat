@echo off
echo Iniciando proyecto Dona Nancy...
echo ----------------------------------

:: Obtener la ruta base donde se encuentra este script
set "BASE_DIR=%~dp0"
echo [INFO] Ruta del proyecto: %BASE_DIR%

:: Iniciar json-server en una nueva terminal
echo [1/4] Iniciando json-server...
start cmd /k "cd /d "%BASE_DIR%" && json-server --watch db.json"

:: Iniciar el frontend
echo [2/4] Iniciando frontend...
if exist "%BASE_DIR%Client\" (
    start cmd /k "cd /d "%BASE_DIR%Client" && pnpm run dev"
) else (
    echo [ERROR] No se encontró la carpeta Client
)

:: Iniciar el backend
echo [3/4] Iniciando backend...
if exist "%BASE_DIR%Backend\" (
    start cmd /k "cd /d "%BASE_DIR%Backend" && pnpm run dev"
) else (
    echo [ERROR] No se encontró la carpeta Back
)

echo ----------------------------------
echo Proceso completado. Verifique las ventanas abiertas.