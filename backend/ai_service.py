from groq import Groq
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = os.getenv("MODEL_NAME", "llama-3.1-8b-instant")


#  Extract JSON safely

def _extract_json(text: str):
    try:
        text = text.strip()
        text = re.sub(r"```json|```", "", text)
        # find JSON block
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except Exception as e:
        print("JSON Extract Error:", e)
    return None


# Emotion Detection

def detect_emotion_with_llm(text: str):

    prompt = f"""Analyze the emotional tone of this journal entry and return ONLY a JSON object, no explanation.

Valid emotion values: Happy, Sad, Stressed, Neutral, Angry, Anxious
Confidence: float between 0.0 and 1.0
Valence: float between -1.0 (very negative) and 1.0 (very positive)
Intensity: float between 0.0 and 1.0
Energy level: Low, Medium, or High

Return exactly this structure:
{{
  "emotion": "Happy",
  "confidence": 0.9,
  "valence": 0.8,
  "intensity": 0.7,
  "energy_level": "High"
}}

Journal entry: {text}"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are an emotion analysis API. Always respond with valid JSON only. No markdown, no explanation."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=150
        )

        content = response.choices[0].message.content
        print("Emotion LLM raw:", content)

        parsed = _extract_json(content)

        if parsed:
            # Normalise emotion casing
            emotion_map = {
                "happy": "Happy", "sad": "Sad",
                "stressed": "Stressed", "neutral": "Neutral",
                "angry": "Angry", "anxious": "Anxious"
            }
            raw_emotion = str(parsed.get("emotion", "Neutral")).lower()
            parsed["emotion"] = emotion_map.get(raw_emotion, "Neutral")
            return parsed

        print("Emotion Detection: failed to parse JSON from:", content)

    except Exception as e:
        print("Emotion Detection Error:", e)

    return {
        "emotion": "Neutral",
        "confidence": 0.5,
        "valence": 0.0,
        "intensity": 0.5,
        "energy_level": "Medium"
    }



# Weekly Mental Health Summary

def generate_weekly_summary(journals):

    if not journals:
        return {
            "summary": "No journal entries found for this week.",
            "dominant_emotion": "Neutral",
            "suggestion": "Start journaling regularly to enable analysis."
        }

    combined_text = "\n".join([j.get("content", "") for j in journals])

    prompt = f"""You are a mental wellness assistant. Analyze these journal entries from the past week and return ONLY a JSON object.

Return exactly this structure:
{{
  "summary": "short emotional summary of the week",
  "dominant_emotion": "Happy",
  "suggestion": "short supportive advice"
}}

Journal entries:
{combined_text}"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are a mental wellness API. Always respond with valid JSON only. No markdown, no explanation."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=300
        )

        content = response.choices[0].message.content
        print("Weekly Summary LLM raw:", content)

        parsed = _extract_json(content)
        if parsed:
            return parsed

        print("Weekly Summary: failed to parse JSON from:", content)

    except Exception as e:
        print("Weekly Summary Error:", e)

    return {
        "summary": "Unable to generate summary",
        "dominant_emotion": "Neutral",
        "suggestion": "Try writing more entries for better analysis."
    }


# Contextual Advice Generator

def generate_contextual_advice(context):

    prompt = f"""You are a compassionate mental wellness assistant. Based on the user's emotional data, provide helpful advice and return ONLY a JSON object.

Return exactly this structure:
{{
  "risk_level": "Low",
  "analysis": "brief explanation of the emotional pattern observed",
  "advice": "practical, warm, specific coping suggestion in 2-3 sentences"
}}

User emotional data:
{json.dumps(context, indent=2)}"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are a mental wellness API. Always respond with valid JSON only. No markdown, no explanation."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.4,
            max_tokens=300
        )

        content = response.choices[0].message.content
        print("Advice LLM raw:", content)

        parsed = _extract_json(content)
        if parsed:
            return parsed

        print("Advice: failed to parse JSON from:", content)

    except Exception as e:
        print("Advice Generation Error:", e)

    return {
        "risk_level": "Unknown",
        "analysis": "Unable to analyze emotional trend",
        "advice": "Try writing more journal entries."
    }