import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
JWT_SECRET = os.getenv("JWT_SECRET", "dev_only_change_me")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
