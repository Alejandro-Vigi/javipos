from pydantic import BaseModel

class QrAuthIn(BaseModel):
  qr: str

class QrAuthOut(BaseModel):
  ok: bool
  employee_id: int | None = None
  employee_name: str | None = None
  role: str | None = None
