from groq import Groq
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))



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

    prompt = f"""
Analyze the emotional tone of this journal entry.

Return STRICT JSON only:

{{
  "emotion": "Happy/Sad/Stressed/Neutral",
  "confidence": 0.0-1.0,
  "valence": -1.0 to 1.0,
  "intensity": 0.0-1.0,
  "energy_level": "Low/Medium/High"
}}

Journal:
{text}
"""

    try:
        response = client.chat.completions.create(
            model=os.getenv("MODEL_NAME"),
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2
        )

        content = response.choices[0].message.content

        parsed = _extract_json(content)

        if parsed:
            return parsed

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

    prompt = f"""
You are a mental wellness assistant.

Analyze the following journal entries from the past week and generate a short summary.

Return STRICT JSON:

{{
 "summary": "short emotional summary",
 "dominant_emotion": "Happy/Sad/Stressed/Neutral",
 "suggestion": "short supportive advice"
}}

Journals:
{combined_text}
"""

    try:
        response = client.chat.completions.create(
            model=os.getenv("MODEL_NAME"),
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )

        content = response.choices[0].message.content

        parsed = _extract_json(content)

        if parsed:
            return parsed

    except Exception as e:
        print("Weekly Summary Error:", e)

    return {
        "summary": "Unable to generate summary",
        "dominant_emotion": "Neutral",
        "suggestion": "Try writing more entries for better analysis."
    }



# Contextual Advice Generator

def generate_contextual_advice(context):

    prompt = f"""
You are a mental wellness assistant.

Based on the following emotional analytics data, give helpful advice.

Return STRICT JSON:

{{
 "risk_level": "Low/Moderate/High",
 "analysis": "short explanation of emotional pattern",
 "advice": "practical coping suggestion"
}}

User Emotional Data:
{context}
"""

    try:
        response = client.chat.completions.create(
            model=os.getenv("MODEL_NAME"),
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4
        )

        content = response.choices[0].message.content

        parsed = _extract_json(content)

        if parsed:
            return parsed

    except Exception as e:
        print("Advice Generation Error:", e)

    return {
        "risk_level": "Unknown",
        "analysis": "Unable to analyze emotional trend",
        "advice": "Try writing more journal entries."
    }