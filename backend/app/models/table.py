from sqlalchemy import String, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from app.models.base import Base

class DiningTable(Base):
  __tablename__ = "tables"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
  name: Mapped[str] = mapped_column(String(50))   # "Mesa 1", "Mesa 12"
  status: Mapped[str] = mapped_column(String(30), default="FREE")  # FREE / OPEN
  created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
