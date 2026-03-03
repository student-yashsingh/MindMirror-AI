from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import datetime
from database import journals_collection
from auth import get_current_user
from bson import ObjectId
from ai_service import detect_emotion_with_llm

router = APIRouter()


class JournalEntry(BaseModel):
    title: str
    content: str


@router.post("/journal")
def create_journal(entry: JournalEntry, user=Depends(get_current_user)):

    # Call LLM for emotion detection
    emotion_result = detect_emotion_with_llm(entry.content)

    emotion = emotion_result.get("emotion", "Neutral")
    confidence = emotion_result.get("confidence", 0.5)

    journal_data = {
        "user_id": ObjectId(user["user_id"]),
        "title": entry.title,
        "content": entry.content,
        "emotion": emotion,
        "confidence": confidence,
        "created_at": datetime.utcnow()
    }

    journals_collection.insert_one(journal_data)

    return {
        "message": "Journal saved successfully",
        "detected_emotion": emotion,
        "confidence": confidence
    }
    
    
@router.get("/journal/history")
def get_journal_history(user=Depends(get_current_user)):

    journals = journals_collection.find(
        {"user_id": ObjectId(user["user_id"])}
    ).sort("created_at", -1)

    result = []

    for journal in journals:
        result.append({
            "id": str(journal["_id"]),
            "title": journal.get("title"),
            "content": journal.get("content"),
            "emotion": journal.get("emotion"),
            "confidence": journal.get("confidence"),
            "created_at": journal.get("created_at")
        })

    return {
        "total_entries": len(result),
        "journals": result
    }
    
    
    
# $match → filter current user's journals (mongodb aggregation pipeline)
# $group → count by emotion
@router.get("/journal/analytics")
def journal_analytics(user=Depends(get_current_user)):

    pipeline = [
        {
            "$match": {
                "user_id": ObjectId(user["user_id"])
            }
        },
        {
            "$group": {
                "_id": "$emotion",
                "count": {"$sum": 1}
            }
        }
    ]

    result = list(journals_collection.aggregate(pipeline))

    distribution = {
        "Happy": 0,
        "Sad": 0,
        "Stressed": 0,
        "Neutral": 0
    }

    for item in result:
        distribution[item["_id"]] = item["count"]

    total_entries = sum(distribution.values())

    return {
        "total_entries": total_entries,
        "emotion_distribution": distribution
    }