from fastapi import FastAPI
from dotenv import load_dotenv
import os

from routes.user import router as user_router
from database import users_collection   
load_dotenv()

app = FastAPI(title="MindMirror AI API")

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


@app.get("/test-db")
def test_db():
    try:
        users_collection.find_one()
        return {"database_status": "MongoDB Connected Successfully "}
    except Exception as e:
        return {"error": str(e)}