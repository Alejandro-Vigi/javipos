from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import CORS_ORIGINS
from app.core.db import engine, SessionLocal
from app.models.base import Base
from app.core.ws import ws_manager

from app.api.routes.health import router as health_router
from app.api.routes.auth import router as auth_router
from app.api.routes.tables import router as tables_router

# Crea tablas al vuelo (en dev). Luego lo pasamos a Alembic.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="JaviPOS")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"] if CORS_ORIGINS == "*" else CORS_ORIGINS.split(","),
  allow_credentials=False,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(health_router, tags=["health"])
app.include_router(auth_router, tags=["auth"])
app.include_router(tables_router, tags=["tables"])

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
  await ws_manager.connect(ws)
  try:
    while True:
      msg = await ws.receive_text()
      await ws_manager.broadcast({"type": "echo", "msg": msg})
  except Exception:
    pass
  finally:
    ws_manager.disconnect(ws)

# Seed rápido para pruebas (una sola vez)
@app.post("/dev/seed")
def dev_seed():
  db: Session = SessionLocal()
  try:
    from app.models.employee import Employee
    from app.models.table import DiningTable

    # si ya hay algo, no duplicar
    if db.query(Employee).count() == 0:
      db.add_all([
        Employee(name="Javi Admin", role="ADMIN", qr_token="JAVIPOS_ADMIN"),
        Employee(name="Mesero 1", role="MESERO", qr_token="MESERO_1"),
      ])

    if db.query(DiningTable).count() == 0:
      db.add_all([DiningTable(name=f"Mesa {i}", status="FREE") for i in range(1, 11)])

    db.commit()
    return {"ok": True}
  finally:
    db.close()
