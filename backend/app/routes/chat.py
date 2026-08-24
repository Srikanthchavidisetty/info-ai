from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel

from app.services.llm import ask_llm, ask_llm_with_file


router = APIRouter(prefix="/api/chat", tags=["Chat"])


# ==============================
# NORMAL TEXT CHAT
# ==============================

class ChatRequest(BaseModel):
    question: str


@router.post("/")
def chat(request: ChatRequest):
    answer = ask_llm(request.question)

    return {
        "question": request.question,
        "answer": answer
    }


# ==============================
# CHAT WITH FILE / IMAGE
# ==============================

@router.post("/file")
async def chat_with_file(
    question: str = Form(""),
    file: UploadFile = File(...)
):
    file_bytes = await file.read()

    answer = ask_llm_with_file(
        question=question,
        file_bytes=file_bytes,
        mime_type=file.content_type,
        filename=file.filename
    )

    return {
        "question": question,
        "filename": file.filename,
        "answer": answer
    }