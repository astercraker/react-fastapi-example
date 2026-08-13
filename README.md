# react-fastapi-example

Aplicación de ejemplo con backend en FastAPI y frontend en React (Vite + TypeScript).

## Estructura

```
backend/    API FastAPI (Python, gestionado con uv)
frontend/   SPA React (Vite)
```

## Requisitos

- Docker y Docker Compose

## Modo desarrollo

Levanta ambos servicios con hot-reload (uvicorn `--reload` en el backend, Vite dev server en el frontend):

```bash
docker compose up
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

El código fuente de `backend/` y `frontend/` se monta como volumen, así que los cambios se reflejan sin reconstruir la imagen.

Para entrar a la terminal de un servicio en ejecución:

```bash
docker compose exec backend sh
docker compose exec frontend sh
```

## Modo producción / deploy

El archivo `docker-compose.prod.yml` sobreescribe la configuración de desarrollo: construye el frontend como build estático servido por nginx (puerto 80) y corre el backend sin `--reload` ni volúmenes montados.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

- Frontend: http://localhost:80
- Backend: http://localhost:8000

Para detener:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml down
```
