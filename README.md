# react-fastapi-example

Aplicación de ejemplo con backend en FastAPI y frontend en React (Vite + TypeScript).

## Estructura

```
backend/    API FastAPI (Python, gestionado con uv)
frontend/   SPA React (Vite)
```

## Requisitos

- Docker y Docker Compose

## Configuración

Copia `.env.example` a `.env` y ajusta los valores según el entorno:

```bash
cp .env.example .env
```

- `DATABASE_URL`: cadena de conexión a Postgres usada por el backend (opcional; si no se define, el backend arranca sin base de datos).
- `DOMAIN`: dominio usado por Caddy en producción para servir con TLS automático (por defecto `localhost`).

## Modo desarrollo

Levanta los servicios con hot-reload (uvicorn `--reload` en el backend, Vite dev server en el frontend):

```bash
docker compose up
```

`docker-compose.override.yml` se aplica automáticamente en este modo y añade un servicio `db` (Postgres 16) conectado al backend vía `DATABASE_URL`.

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Postgres: localhost:5432

El código fuente de `backend/` y `frontend/` se monta como volumen, así que los cambios se reflejan sin reconstruir la imagen. Podés verificar la conexión a la base de datos con `GET /health/db`.

Para entrar a la terminal de un servicio en ejecución:

```bash
docker compose exec backend sh
docker compose exec frontend sh
```

## Modo producción / deploy

El archivo `docker-compose.prod.yml` sobreescribe la configuración de desarrollo: construye el frontend como build estático (servido por nginx, usando `VITE_API_URL=/api`), corre el backend sin `--reload` ni volúmenes montados, y agrega un servicio `caddy` que expone los puertos 80/443 y hace de reverse proxy hacia `frontend` y `backend` (rutas `/api/*`), con TLS automático según `DOMAIN`.

Nota: `docker-compose.override.yml` (servicio `db`) no se incluye en este comando, ya que se especifican los archivos explícitamente; en producción se espera una base de datos externa configurada vía `DATABASE_URL`.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

- Frontend/Backend: http://localhost (o `https://$DOMAIN` si se configura un dominio)

Para detener:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml down
```
