from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.table import DiningTable

router = APIRouter()

@router.get("/tables")
def list_tables(db: Session = Depends(get_db)):
  rows = db.query(DiningTable).order_by(DiningTable.id.asc()).all()
  return [{"id": t.id, "name": t.name, "status": t.status} for t in rows]
