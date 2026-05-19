from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from groq import AsyncGroq
from dotenv import load_dotenv
import os
import json

load_dotenv()

router = APIRouter()
client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = (
    "You are a compassionate AI mental health companion. "
    "Listen carefully, respond with empathy, and offer supportive, "
    "practical guidance. Keep responses concise and warm."
)

@router.websocket("/ws/chat")
async def chat_socket(websocket: WebSocket):

    await websocket.accept()

    conversation_history = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]

    try:
        while True:

            message = await websocket.receive_text()

            # Append user message to history for context
            conversation_history.append(
                {"role": "user", "content": message}
            )

            # Keep history manageable (system + last 20 messages)
            if len(conversation_history) > 21:
                conversation_history = (
                    conversation_history[:1] + conversation_history[-20:]
                )

            try:
                completion = await client.chat.completions.create(
                    model=os.getenv("MODEL_NAME", "llama-3.1-8b-instant"),
                    messages=conversation_history,
                    temperature=0.7,
                    max_tokens=512,
                )

                reply = completion.choices[0].message.content

                # Append assistant reply to history
                conversation_history.append(
                    {"role": "assistant", "content": reply}
                )

                await websocket.send_text(json.dumps({
                    "type": "message",
                    "content": reply
                }))

            except Exception as e:
                print("Groq API Error:", e)
                await websocket.send_text(json.dumps({
                    "type": "message",
                    "content": "Sorry, I'm having trouble responding right now. Please try again."
                }))

    except WebSocketDisconnect:
        print("Client disconnected")
