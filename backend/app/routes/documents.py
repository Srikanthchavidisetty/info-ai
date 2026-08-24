from fastapi import APIRouter

router = APIRouter(prefix="/api/documents", tags=["Documents"])

@router.get("/")
def documents_status():
    return {"message": "Documents API is ready."}
