from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@router.websocket("/ws/chat")
async def chat_socket(websocket: WebSocket):

    await websocket.accept()

    try:
        while True:

            message = await websocket.receive_text()

            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role":"system","content":"You are a supportive AI mental health companion."},
                    {"role":"user","content":message}
                ]
            )

            reply = completion.choices[0].message.content

            await websocket.send_text(json.dumps({
                "type": "message",
                "content": reply
            }))

    except WebSocketDisconnect:
        print("Client disconnected")