from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router


app = FastAPI(
    title="INFO-AI",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://your-frontend-url.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# CHAT ROUTES
# =========================

app.include_router(chat_router)


# =========================
# HOME
# =========================

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "INFO-AI backend is running"
    }