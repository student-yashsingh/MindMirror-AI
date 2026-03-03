from groq import Groq
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def extract_json(text: str):
    """
    Extract JSON object from LLM response safely.
    """
    try:
        # Remove markdown formatting if present
        text = text.strip()
        text = re.sub(r"```json|```", "", text)

        # Extract JSON block
        json_match = re.search(r"\{.*\}", text, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
    except:
        pass

    return None


def detect_emotion_with_llm(text: str):
    prompt = f"""
    Analyze the emotional tone of this journal entry.

    Classify into ONE of:
    Happy, Sad, Stressed, Neutral.

    Return STRICT JSON only:
    {{
        "emotion": "Happy/Sad/Stressed/Neutral",
        "confidence": 0.0-1.0
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

        parsed = extract_json(content)

        if parsed:
            return parsed

    except Exception as e:
        print("LLM Error:", e)

    # Fallback
    return {
        "emotion": "Neutral",
        "confidence": 0.5
    }