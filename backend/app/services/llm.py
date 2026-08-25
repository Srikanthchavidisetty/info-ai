from google import genai
from google.genai import types

from app.config import GEMINI_API_KEY


client = genai.Client(
    api_key=GEMINI_API_KEY
)

MODEL = "gemini-3.6-flash"


# ==========================================
# NORMAL TEXT CHAT
# ==========================================

def ask_llm(question: str) -> str:
    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=question
        )

        return response.text

    except Exception as error:
        error_text = str(error)

        if "429" in error_text or "RESOURCE_EXHAUSTED" in error_text:
            return (
                "⚠️ AI quota has been reached for this Gemini API "
                "project. Please wait for the quota to reset and "
                "try again."
            )

        print("Gemini error:", error)

        return (
            "Sorry, I couldn't generate an answer right now. "
            "Please try again later."
        )


# ==========================================
# CHAT WITH IMAGE / PDF / TEXT FILE
# ==========================================

def ask_llm_with_file(
    question: str,
    file_bytes: bytes,
    mime_type: str | None,
    filename: str | None
) -> str:

    try:

        if not mime_type:
            mime_type = "application/octet-stream"

        supported_types = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf",
            "text/plain",
            "text/csv",
        ]

        if mime_type not in supported_types:
            return (
                f"Sorry, this file type is not supported yet: "
                f"{mime_type}"
            )

        if not question.strip():
            question = (
                "Explain this file in simple words. "
                "Give the important points and details."
            )

        file_part = types.Part.from_bytes(
            data=file_bytes,
            mime_type=mime_type
        )

        response = client.models.generate_content(
            model=MODEL,
            contents=[
                file_part,
                question
            ]
        )

        return response.text

    except Exception as error:

        error_text = str(error)

        if "429" in error_text or "RESOURCE_EXHAUSTED" in error_text:
            return (
                "⚠️ AI quota has been reached limit"
                "Please wait for the quota to reset and "
                "try again."
            )

        print("Gemini file error:", error)

        return (
            "Sorry, I couldn't analyze this file right now. "
            "Please try again later."
        )