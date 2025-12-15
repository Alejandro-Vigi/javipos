from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.auth import QrAuthIn, QrAuthOut
from app.models.employee import Employee

router = APIRouter()

@router.post("/auth/qr", response_model=QrAuthOut)
def auth_qr(payload: QrAuthIn, db: Session = Depends(get_db)):
  qr = payload.qr.strip()
  emp = db.query(Employee).filter(Employee.qr_token == qr).first()
  if not emp:
    return QrAuthOut(ok=False)

  return QrAuthOut(ok=True, employee_id=emp.id, employee_name=emp.name, role=emp.role)
