from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat(req: ChatRequest):

    user_message = req.message

    # temporary response
    reply = f"I understand you're feeling something about: {user_message}. Tell me more."

    return {"reply": reply}