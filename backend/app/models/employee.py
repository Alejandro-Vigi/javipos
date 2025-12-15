from sqlalchemy import String, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

from app.models.base import Base

class Employee(Base):
  __tablename__ = "employees"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
  name: Mapped[str] = mapped_column(String(120))
  role: Mapped[str] = mapped_column(String(40), default="MESERO")  # MESERO/CAJA/ADMIN
  qr_token: Mapped[str] = mapped_column(String(255), unique=True)  # lo que va en el QR
  created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
