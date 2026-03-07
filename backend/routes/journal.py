# from fastapi import APIRouter, Depends
# from pydantic import BaseModel
# from datetime import datetime
# from database import journals_collection
# from auth import get_current_user
# from bson import ObjectId
# from ai_service import (
#     detect_emotion_with_llm,
#     generate_weekly_summary,
#     generate_contextual_advice
# )

# router = APIRouter()


# class JournalEntry(BaseModel):
#     title: str
#     content: str


# @router.post("/journal")
# def create_journal(entry: JournalEntry, user=Depends(get_current_user)):

#     emotion_result = detect_emotion_with_llm(entry.content)

#     emotion = emotion_result.get("emotion", "Neutral")
#     confidence = emotion_result.get("confidence", 0.5)
#     valence = emotion_result.get("valence", 0.0)
#     intensity = emotion_result.get("intensity", 0.5)
#     energy_level = emotion_result.get("energy_level", "Medium")

#     journal_data = {
#         "user_id": ObjectId(user["user_id"]),
#         "title": entry.title,
#         "content": entry.content,
#         "emotion": emotion,
#         "confidence": confidence,
#         "valence": valence,
#         "intensity": intensity,
#         "energy_level": energy_level,
#         "created_at": datetime.utcnow()
#     }

#     journals_collection.insert_one(journal_data)

#     return {
#         "message": "Journal saved successfully",
#         "emotion": emotion,
#         "confidence": confidence,
#         "valence": valence,
#         "intensity": intensity,
#         "energy_level": energy_level
#     }
    
    
# @router.get("/journal/history")
# def get_journal_history(user=Depends(get_current_user)):

#     journals = journals_collection.find(
#         {"user_id": ObjectId(user["user_id"])}
#     ).sort("created_at", -1)

#     result = []

#     for journal in journals:
#         result.append({
#             "id": str(journal["_id"]),
#             "title": journal.get("title"),
#             "content": journal.get("content"),
#             "emotion": journal.get("emotion"),
#             "confidence": journal.get("confidence"),
#             "created_at": journal.get("created_at")
#         })

#     return {
#         "total_entries": len(result),
#         "journals": result
#     }
    
    
    
# # $match → filter current user's journals (mongodb aggregation pipeline)
# # $group → count by emotion
# @router.get("/journal/analytics")
# def journal_analytics(user=Depends(get_current_user)):

#     pipeline = [
#         {
#             "$match": {
#                 "user_id": ObjectId(user["user_id"])
#             }
#         },
#         {
#             "$group": {
#                 "_id": "$emotion",
#                 "count": {"$sum": 1}
#             }
#         }
#     ]

#     result = list(journals_collection.aggregate(pipeline))

#     distribution = {
#         "Happy": 0,
#         "Sad": 0,
#         "Stressed": 0,
#         "Neutral": 0
#     }

#     for item in result:
#         distribution[item["_id"]] = item["count"]

#     total_entries = sum(distribution.values())

#     return {
#         "total_entries": total_entries,
#         "emotion_distribution": distribution
#     }
    
    
# @router.get("/journal/trend")
# def journal_trend(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])},
#             {"valence": 1, "intensity": 1, "created_at": 1}
#         ).sort("created_at", 1)
#     )

#     trend_data = []

#     for journal in journals:
#         trend_data.append({
#             "date": journal["created_at"],
#             "valence": journal.get("valence", 0),
#             "intensity": journal.get("intensity", 0)
#         })

#     return {
#         "entries": len(trend_data),
#         "trend": trend_data
#     }
    
    
    
# @router.get("/journal/volatility")
# def journal_volatility(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])},
#             {"valence": 1}
#         ).sort("created_at", 1)
#     )

#     valences = [j.get("valence", 0) for j in journals]

#     if len(valences) < 2:
#         return {
#             "entries": len(valences),
#             "volatility_score": 0,
#             "interpretation": "Not enough data"
#         }

#     changes = []

#     for i in range(1, len(valences)):
#         changes.append(abs(valences[i] - valences[i - 1]))

#     volatility = sum(changes) / len(changes)

#     if volatility < 0.2:
#         state = "Very Stable"
#     elif volatility < 0.4:
#         state = "Moderately Stable"
#     elif volatility < 0.6:
#         state = "Emotionally Fluctuating"
#     else:
#         state = "Highly Volatile"

#     return {
#         "entries": len(valences),
#         "volatility_score": round(volatility, 3),
#         "interpretation": state
#     }
    
    
    
# @router.get("/journal/stability-index")
# def journal_stability_index(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])},
#             {"valence": 1, "intensity": 1}
#         ).sort("created_at", 1)
#     )

#     if not journals:
#         return {
#             "entries": 0,
#             "stability_index": 0,
#             "interpretation": "No data available"
#         }

#     valences = [j.get("valence", 0) for j in journals]
#     intensities = [j.get("intensity", 0) for j in journals]

#     avg_valence = sum(valences) / len(valences)
#     avg_intensity = sum(intensities) / len(intensities)

#     if len(valences) > 1:
#         changes = [abs(valences[i] - valences[i - 1]) for i in range(1, len(valences))]
#         volatility = sum(changes) / len(changes)
#     else:
#         volatility = 0

#     stability_score = (1 - volatility) * 50 + ((avg_valence + 1) / 2) * 30 + (avg_intensity) * 20
#     stability_score = max(0, min(100, round(stability_score)))

#     if stability_score > 75:
#         interpretation = "Emotionally Strong"
#     elif stability_score > 50:
#         interpretation = "Generally Stable"
#     elif stability_score > 30:
#         interpretation = "Needs Attention"
#     else:
#         interpretation = "High Emotional Risk"

#     return {
#         "entries": len(journals),
#         "stability_index": stability_score,
#         "interpretation": interpretation,
#         "metrics": {
#             "average_valence": round(avg_valence, 3),
#             "average_intensity": round(avg_intensity, 3),
#             "volatility": round(volatility, 3)
#         }
#     }
    
    
    

# @router.get("/journal/weekly-summary")
# def weekly_summary(user=Depends(get_current_user)):

#     from datetime import timedelta

#     seven_days_ago = datetime.utcnow() - timedelta(days=7)

#     journals = list(
#         journals_collection.find(
#             {
#                 "user_id": ObjectId(user["user_id"]),
#                 "created_at": {"$gte": seven_days_ago}
#             }
#         ).sort("created_at", 1)
#     )

#     summary = generate_weekly_summary(journals)

#     return {
#         "entries_analyzed": len(journals),
#         "weekly_analysis": summary
#     }
    
    
    
    
# @router.get("/journal/advice")
# def contextual_advice(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])},
#             {"emotion": 1, "valence": 1, "intensity": 1, "created_at": 1}
#         ).sort("created_at", -1).limit(10)
#     )

#     if not journals:
#         return {"message": "Not enough data for advice"}

#     valences = [j.get("valence", 0) for j in journals]
#     intensities = [j.get("intensity", 0) for j in journals]

#     avg_valence = sum(valences) / len(valences)
#     avg_intensity = sum(intensities) / len(intensities)

#     context = {
#         "recent_entries": len(journals),
#         "average_valence": avg_valence,
#         "average_intensity": avg_intensity,
#         "recent_emotions": [j.get("emotion") for j in journals]
#     }

#     advice = generate_contextual_advice(context)

#     return {
#         "entries_analyzed": len(journals),
#         "context": context,
#         "ai_advice": advice
#     }
    
    
    




# @router.get("/journal/decline-detection")
# def decline_detection(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])},
#             {"valence": 1, "created_at": 1}
#         ).sort("created_at", -1).limit(6)
#     )

#     if len(journals) < 3:
#         return {
#             "entries_analyzed": len(journals),
#             "decline_detected": False,
#             "message": "Not enough data to detect emotional trend"
#         }

#     # reverse to chronological order
#     journals.reverse()
#     valences = [j.get("valence", 0) for j in journals]
#     decline_count = 0
#     for i in range(1, len(valences)):
#         if valences[i] < valences[i - 1]:
#             decline_count += 1

#     decline_detected = decline_count >= 3

#     if decline_detected:
#         state = "Emotional decline detected"
#     else:
#         state = "No significant decline detected"

#     return {
#         "entries_analyzed": len(valences),
#         "valence_sequence": valences,
#         "decline_steps": decline_count,
#         "decline_detected": decline_detected,
#         "interpretation": state
#     }
    
    
    
    
    
    
    
    
    
# @router.get("/journal/dashboard")
# def dashboard(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])}
#         ).sort("created_at", -1)
#     )

#     if not journals:
#         return {
#             "total_entries": 0,
#             "emotion_distribution": {},
#             "averages": {},
#             "recent_trend": [],
#             "message": "No journal data available"
#         }

#     distribution = {
#         "Happy": 0,
#         "Sad": 0,
#         "Stressed": 0,
#         "Neutral": 0
#     }

#     valence_sum = 0
#     intensity_sum = 0
#     count = 0

#     trend = []

#     for j in journals:
#         emotion = j.get("emotion", "Neutral")

#         if emotion in distribution:
#             distribution[emotion] += 1

#         valence = j.get("valence", 0)
#         intensity = j.get("intensity", 0)

#         valence_sum += valence
#         intensity_sum += intensity
#         count += 1

#         trend.append({
#             "date": j["created_at"],
#             "emotion": emotion,
#             "valence": valence,
#             "intensity": intensity
#         })

#     avg_valence = valence_sum / count
#     avg_intensity = intensity_sum / count

#     trend = trend[:7]

#     return {
#         "total_entries": count,
#         "emotion_distribution": distribution,
#         "averages": {
#             "valence": avg_valence,
#             "intensity": avg_intensity
#         },
#         "recent_trend": trend
#     }
    
    
    
    
    

# @router.get("/journal/stability")
# def emotional_stability(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])},
#             {"valence": 1, "created_at": 1}
#         ).sort("created_at", -1).limit(20)
#     )

#     if len(journals) < 3:
#         return {
#             "entries_analyzed": len(journals),
#             "volatility_score": 0,
#             "stability_index": 100,
#             "message": "Not enough data to compute stability"
#         }

#     journals.reverse()

#     valences = [j.get("valence", 0) for j in journals]

#     diffs = []

#     for i in range(1, len(valences)):
#         diffs.append(abs(valences[i] - valences[i-1]))

#     volatility = sum(diffs) / len(diffs)

#     stability_index = max(0, 100 - (volatility * 100))

#     interpretation = "Stable emotional pattern"

#     if volatility > 0.6:
#         interpretation = "Highly unstable emotional pattern"
#     elif volatility > 0.35:
#         interpretation = "Moderate emotional fluctuation"

#     return {
#         "entries_analyzed": len(valences),
#         "valence_sequence": valences,
#         "volatility_score": round(volatility, 3),
#         "stability_index": round(stability_index, 2),
#         "interpretation": interpretation
#     }
    
    
    



# @router.get("/journal/risk-prediction")
# def risk_prediction(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])},
#             {"emotion": 1, "valence": 1, "intensity": 1, "created_at": 1}
#         ).sort("created_at", -1).limit(10)
#     )

#     if not journals:
#         return {
#             "entries_analyzed": 0,
#             "risk_level": "Unknown",
#             "pattern_detected": "No data",
#             "recommendation": "Start writing journal entries to enable analysis."
#         }

#     valences = [j.get("valence", 0) for j in journals]
#     intensities = [j.get("intensity", 0) for j in journals]
#     emotions = [j.get("emotion", "Neutral") for j in journals]

#     avg_valence = sum(valences) / len(valences)
#     avg_intensity = sum(intensities) / len(intensities)

#     negative_count = sum(1 for v in valences if v < 0)

#     if avg_valence < -0.3 and negative_count >= len(valences) * 0.6:
#         risk_level = "High"
#         pattern = "Consistently negative emotional trend"
#         recommendation = "Consider speaking with someone you trust or seeking professional guidance."
#     elif avg_valence < 0:
#         risk_level = "Moderate"
#         pattern = "Mixed emotions with recent stress indicators"
#         recommendation = "Focus on rest, structured routines, and activities that improve mood."
#     else:
#         risk_level = "Low"
#         pattern = "Mostly positive or stable emotional state"
#         recommendation = "Maintain current habits that support emotional well-being."

#     return {
#         "entries_analyzed": len(journals),
#         "average_valence": round(avg_valence, 3),
#         "average_intensity": round(avg_intensity, 3),
#         "recent_emotions": emotions,
#         "risk_level": risk_level,
#         "pattern_detected": pattern,
#         "recommendation": recommendation
#     }
    
    
    
    





# @router.get("/journal/dashboard-summary")
# def dashboard_summary(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": user["_id"]},
#             {"emotion": 1, "valence": 1, "intensity": 1, "created_at": 1}
#         ).sort("created_at", -1)
#     )

#     if not journals:
#         return {
#             "total_entries": 0,
#             "emotion_distribution": {},
#             "averages": {},
#             "stability": {},
#             "risk": {},
#             "message": "No journal data available"
#         }

#     # Emotion distribution
#     distribution = {"Happy": 0, "Sad": 0, "Stressed": 0, "Neutral": 0}

#     valences = []
#     intensities = []

#     for j in journals:
#         emotion = j.get("emotion", "Neutral")
#         if emotion in distribution:
#             distribution[emotion] += 1

#         valences.append(j.get("valence", 0))
#         intensities.append(j.get("intensity", 0))

#     total = len(journals)

#     avg_valence = sum(valences) / total
#     avg_intensity = sum(intensities) / total

#     # Volatility
#     diffs = []
#     for i in range(1, len(valences)):
#         diffs.append(abs(valences[i] - valences[i-1]))

#     volatility = sum(diffs) / len(diffs) if diffs else 0
#     stability_index = max(0, 100 - (volatility * 100))

#     # Risk logic
#     negative_count = sum(1 for v in valences if v < 0)

#     if avg_valence < -0.3 and negative_count >= total * 0.6:
#         risk_level = "High"
#     elif avg_valence < 0:
#         risk_level = "Moderate"
#     else:
#         risk_level = "Low"

#     return {
#         "total_entries": total,

#         "emotion_distribution": distribution,

#         "averages": {
#             "valence": round(avg_valence, 3),
#             "intensity": round(avg_intensity, 3)
#         },

#         "stability": {
#             "volatility_score": round(volatility, 3),
#             "stability_index": round(stability_index, 2)
#         },

#         "risk": {
#             "risk_level": risk_level,
#             "negative_entries": negative_count
#         }
#     }
    
    
    
    
    
    
    
    
    
# @router.get("/journal/pattern-analysis")
# def pattern_analysis(user=Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": ObjectId(user["user_id"])},
#             {"emotion": 1, "valence": 1, "intensity": 1, "content": 1}
#         ).sort("created_at", -1).limit(10)
#     )

#     if not journals:
#         return {"message": "Not enough data"}

#     context = {
#         "valence": [j.get("valence", 0) for j in journals],
#         "intensity": [j.get("intensity", 0) for j in journals],
#         "emotions": [j.get("emotion") for j in journals]
#     }

#     prompt = f"""
# Analyze the emotional pattern of this user.

# Data:
# {context}

# Return STRICT JSON:

# {{
#  "pattern": "...",
#  "explanation": "...",
#  "confidence": 0.0-1.0
# }}
# """

#     try:
#         response = client.chat.completions.create(
#             model=os.getenv("MODEL_NAME"),
#             messages=[{"role":"user","content":prompt}],
#             temperature=0.3
#         )

#         parsed = _extract_json(response.choices[0].message.content)

#         if parsed:
#             return parsed

#     except Exception as e:
#         print("Pattern Analysis Error:", e)

#     return {
#         "pattern": "Unknown",
#         "explanation": "Unable to analyze pattern",
#         "confidence": 0.5
#     }
    
    
    
# @router.get("/journal")
# def get_journals(current_user = Depends(get_current_user)):

#     journals = list(
#         journals_collection.find(
#             {"user_id": current_user["_id"]}
#         ).sort("created_at",-1)
#     )

#     for j in journals:
#         j["_id"] = str(j["_id"])

#     return journals



from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import datetime
from database import journals_collection
from auth import get_current_user
from bson import ObjectId
from ai_service import (
    detect_emotion_with_llm,
    generate_weekly_summary,
    generate_contextual_advice
)

router = APIRouter()


class JournalEntry(BaseModel):
    title: str
    content: str


@router.post("/journal")
def create_journal(entry: JournalEntry, user=Depends(get_current_user)):

    emotion_result = detect_emotion_with_llm(entry.content)

    emotion = emotion_result.get("emotion", "Neutral")
    confidence = emotion_result.get("confidence", 0.5)
    valence = emotion_result.get("valence", 0.0)
    intensity = emotion_result.get("intensity", 0.5)
    energy_level = emotion_result.get("energy_level", "Medium")

    journal_data = {
        "user_id": user["_id"],
        "title": entry.title,
        "content": entry.content,
        "emotion": emotion,
        "confidence": confidence,
        "valence": valence,
        "intensity": intensity,
        "energy_level": energy_level,
        "created_at": datetime.utcnow()
    }

    journals_collection.insert_one(journal_data)

    return {
        "message": "Journal saved successfully",
        "emotion": emotion,
        "confidence": confidence,
        "valence": valence,
        "intensity": intensity,
        "energy_level": energy_level
    }


@router.get("/journal/history")
def get_journal_history(user=Depends(get_current_user)):

    journals = journals_collection.find(
        {"user_id": user["_id"]}
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


@router.get("/journal/analytics")
def journal_analytics(user=Depends(get_current_user)):

    pipeline = [
        {"$match": {"user_id": user["_id"]}},
        {"$group": {"_id": "$emotion", "count": {"$sum": 1}}}
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


@router.get("/journal/trend")
def journal_trend(user=Depends(get_current_user)):

    journals = list(
        journals_collection.find(
            {"user_id": user["_id"]},
            {"valence": 1, "intensity": 1, "created_at": 1}
        ).sort("created_at", 1)
    )

    trend_data = []

    for journal in journals:
        trend_data.append({
            "date": journal["created_at"],
            "valence": journal.get("valence", 0),
            "intensity": journal.get("intensity", 0)
        })

    return {
        "entries": len(trend_data),
        "trend": trend_data
    }


@router.get("/journal/volatility")
def journal_volatility(user=Depends(get_current_user)):

    journals = list(
        journals_collection.find(
            {"user_id": user["_id"]},
            {"valence": 1}
        ).sort("created_at", 1)
    )

    valences = [j.get("valence", 0) for j in journals]

    if len(valences) < 2:
        return {
            "entries": len(valences),
            "volatility_score": 0,
            "interpretation": "Not enough data"
        }

    changes = []
    for i in range(1, len(valences)):
        changes.append(abs(valences[i] - valences[i - 1]))

    volatility = sum(changes) / len(changes)

    if volatility < 0.2:
        state = "Very Stable"
    elif volatility < 0.4:
        state = "Moderately Stable"
    elif volatility < 0.6:
        state = "Emotionally Fluctuating"
    else:
        state = "Highly Volatile"

    return {
        "entries": len(valences),
        "volatility_score": round(volatility, 3),
        "interpretation": state
    }


@router.get("/journal/stability-index")
def journal_stability_index(user=Depends(get_current_user)):

    journals = list(
        journals_collection.find(
            {"user_id": user["_id"]},
            {"valence": 1, "intensity": 1}
        ).sort("created_at", 1)
    )

    if not journals:
        return {
            "entries": 0,
            "stability_index": 0,
            "interpretation": "No data available"
        }

    valences = [j.get("valence", 0) for j in journals]
    intensities = [j.get("intensity", 0) for j in journals]

    avg_valence = sum(valences) / len(valences)
    avg_intensity = sum(intensities) / len(intensities)

    if len(valences) > 1:
        changes = [abs(valences[i] - valences[i - 1]) for i in range(1, len(valences))]
        volatility = sum(changes) / len(changes)
    else:
        volatility = 0

    stability_score = (1 - volatility) * 50 + ((avg_valence + 1) / 2) * 30 + (avg_intensity) * 20
    stability_score = max(0, min(100, round(stability_score)))

    if stability_score > 75:
        interpretation = "Emotionally Strong"
    elif stability_score > 50:
        interpretation = "Generally Stable"
    elif stability_score > 30:
        interpretation = "Needs Attention"
    else:
        interpretation = "High Emotional Risk"

    return {
        "entries": len(journals),
        "stability_index": stability_score,
        "interpretation": interpretation,
        "metrics": {
            "average_valence": round(avg_valence, 3),
            "average_intensity": round(avg_intensity, 3),
            "volatility": round(volatility, 3)
        }
    }


@router.get("/journal/weekly-summary")
def weekly_summary(user=Depends(get_current_user)):

    from datetime import timedelta
    seven_days_ago = datetime.utcnow() - timedelta(days=7)

    journals = list(
        journals_collection.find(
            {
                "user_id": user["_id"],
                "created_at": {"$gte": seven_days_ago}
            }
        ).sort("created_at", 1)
    )

    summary = generate_weekly_summary(journals)

    return {
        "entries_analyzed": len(journals),
        "weekly_analysis": summary
    }


@router.get("/journal/advice")
def contextual_advice(user=Depends(get_current_user)):

    journals = list(
        journals_collection.find(
            {"user_id": user["_id"]},
            {"emotion": 1, "valence": 1, "intensity": 1, "created_at": 1}
        ).sort("created_at", -1).limit(10)
    )

    if not journals:
        return {"message": "Not enough data for advice"}

    valences = [j.get("valence", 0) for j in journals]
    intensities = [j.get("intensity", 0) for j in journals]

    avg_valence = sum(valences) / len(valences)
    avg_intensity = sum(intensities) / len(intensities)

    context = {
        "recent_entries": len(journals),
        "average_valence": avg_valence,
        "average_intensity": avg_intensity,
        "recent_emotions": [j.get("emotion") for j in journals]
    }

    advice = generate_contextual_advice(context)

    return {
        "entries_analyzed": len(journals),
        "context": context,
        "ai_advice": advice
    }


@router.get("/journal/dashboard-summary")
def dashboard_summary(user=Depends(get_current_user)):

    journals = list(
        journals_collection.find(
            {"user_id": user["_id"]},
            {"emotion": 1, "valence": 1, "intensity": 1, "created_at": 1}
        ).sort("created_at", -1)
    )

    if not journals:
        return {
            "total_entries": 0,
            "emotion_distribution": {},
            "averages": {},
            "stability": {},
            "risk": {},
            "message": "No journal data available"
        }

    distribution = {"Happy": 0, "Sad": 0, "Stressed": 0, "Neutral": 0}

    valences = []
    intensities = []

    for j in journals:
        emotion = j.get("emotion", "Neutral")
        if emotion in distribution:
            distribution[emotion] += 1

        valences.append(j.get("valence", 0))
        intensities.append(j.get("intensity", 0))

    total = len(journals)

    avg_valence = sum(valences) / total
    avg_intensity = sum(intensities) / total

    diffs = []
    for i in range(1, len(valences)):
        diffs.append(abs(valences[i] - valences[i-1]))

    volatility = sum(diffs) / len(diffs) if diffs else 0
    stability_index = max(0, 100 - (volatility * 100))

    negative_count = sum(1 for v in valences if v < 0)

    if avg_valence < -0.3 and negative_count >= total * 0.6:
        risk_level = "High"
    elif avg_valence < 0:
        risk_level = "Moderate"
    else:
        risk_level = "Low"

    return {
        "total_entries": total,
        "emotion_distribution": distribution,
        "averages": {
            "valence": round(avg_valence, 3),
            "intensity": round(avg_intensity, 3)
        },
        "stability": {
            "volatility_score": round(volatility, 3),
            "stability_index": round(stability_index, 2)
        },
        "risk": {
            "risk_level": risk_level,
            "negative_entries": negative_count
        }
    }


@router.get("/journal")
def get_journals(current_user=Depends(get_current_user)):

    journals = list(
        journals_collection.find(
            {"user_id": current_user["_id"]}
        ).sort("created_at", -1)
    )

    for j in journals:
        j["_id"] = str(j["_id"])

    return journals