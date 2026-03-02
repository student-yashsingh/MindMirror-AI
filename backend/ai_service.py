import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_mood(text: str):
    prompt = f"""
    You are a mental health AI assistant.
    Analyze the following journal entry and return:

    1. Overall mood (one word)
    2. Emotional intensity (low/medium/high)
    3. Short supportive feedback (2-3 lines)

    Journal:
    {text}
    """

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    return response.choices[0].message.content