from fastapi import FastAPI
from dotenv import load_dotenv
import os

from routes.user import router as user_router

load_dotenv()

app = FastAPI(title="MindMirror AI API")

# Include routers AFTER creating app
app.include_router(user_router)

@app.get("/")
def home():
    return {"message": "MindMirror AI Backend Running 🚀"}

@app.get("/test-env")
def test_env():
    return {
        "mongo_url": os.getenv("MONGO_URL"),
        "groq_key_loaded": bool(os.getenv("GROQ_API_KEY"))
    }