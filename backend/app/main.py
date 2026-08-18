import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI(title="react-fastapi-example", root_path="/api")

DATABASE_URL = os.environ.get("DATABASE_URL")
engine = create_engine(DATABASE_URL) if DATABASE_URL else None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Test Async Hello from FastAPI"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/health/db")
async def health_db():
    if engine is None:
        return {"db": "not_configured"}
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"db": "connected"}
    except SQLAlchemyError as e:
        return {"db": "error", "detail": str(e)}
