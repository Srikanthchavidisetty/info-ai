from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router


app = FastAPI(
    title="College AI Assistant"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# ROUTES
# ==========================================

app.include_router(chat_router)


# ==========================================
# HOME
# ==========================================

@app.get("/")
def root():
    return {
        "message": "College AI Assistant Backend is running!"
    }