from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from chat_ws import router as chat_router
import os

from routes.user import router as user_router
from routes.journal import router as journal_router
from routes.auth_routes import router as auth_router
from database import users_collection
from routes import user
load_dotenv()

app = FastAPI(title="MindMirror AI API")


origins = [
    "http://localhost:5173",
    "http://localhost:5174",
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
app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(user.router, prefix="/user", tags=["User"])


@app.get("/")
def home():
    return {"message": "MindMirror AI Backend Running "}


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