from sqlalchemy import DateTime, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from app.models.base import Base

class Order(Base):
  __tablename__ = "orders"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
  table_id: Mapped[int] = mapped_column(ForeignKey("tables.id"))
  status: Mapped[str] = mapped_column(String(30), default="OPEN")  # OPEN / PAID / CANCELED
  opened_by_employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"))
  created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
