from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from routes.user import router as user_router
from routes.journal import router as journal_router
from database import users_collection

load_dotenv()

app = FastAPI(title="MindMirror AI API")


origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router)
app.include_router(journal_router)


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
        return {"database_status": "MongoDB Connected Successfully"}
    except Exception as e:
        return {"error": str(e)}