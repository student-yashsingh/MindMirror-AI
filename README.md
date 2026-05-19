<div align="center">

<br/>

```
███╗   ███╗██╗███╗   ██╗██████╗ ███╗   ███╗██╗██████╗ ██████╗  ██████╗ ██████╗
████╗ ████║██║████╗  ██║██╔══██╗████╗ ████║██║██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
██╔████╔██║██║██╔██╗ ██║██║  ██║██╔████╔██║██║██████╔╝██████╔╝██║   ██║██████╔╝
██║╚██╔╝██║██║██║╚██╗██║██║  ██║██║╚██╔╝██║██║██╔══██╗██╔══██╗██║   ██║██╔══██╗
██║ ╚═╝ ██║██║██║ ╚████║██████╔╝██║ ╚═╝ ██║██║██║  ██║██║  ██║╚██████╔╝██║  ██║
╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
```

**Your Digital Emotional Intelligence Companion**

<br/>

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.135.1-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-D22128?style=for-the-badge)](LICENSE)

<br/>

*Bridge the gap between traditional journaling and modern AI — understand your mind, one entry at a time.*

<br/>

[Overview](#overview) &nbsp;|&nbsp; [Features](#features) &nbsp;|&nbsp; [Tech Stack](#tech-stack) &nbsp;|&nbsp; [Installation](#installation) &nbsp;|&nbsp; [API Reference](#api-documentation) &nbsp;|&nbsp; [Roadmap](#roadmap) &nbsp;|&nbsp; [Contributing](#contributing)

<br/>

---

</div>

## Overview

**MindMirror AI** is an intelligent mental wellness platform that fuses the intimacy of personal journaling with the analytical power of large language models. Every entry you write is processed in real time — emotions are detected, patterns are tracked, and personalized insights are surfaced so you can understand yourself more clearly.

Mental health awareness is no longer optional. MindMirror gives you a private, intelligent space to process your inner world — without judgment, without noise.

<br/>

### The Problem

- Students and professionals face escalating stress, burnout, and emotional exhaustion
- People struggle silently, without tools to recognize patterns in their own emotional behavior
- Traditional journaling offers reflection but no analysis
- Most wellness apps are either superficial or inaccessible to non-clinical users

### The Solution

MindMirror acts as your **digital emotional mirror** — reflecting patterns you might miss on your own:

- AI-powered emotion detection using state-of-the-art LLMs
- Real-time trend analysis across your emotional journey
- Personalized insights derived from your unique data
- Bank-grade encrypted, fully private journal storage
- Interactive dashboards with clean, meaningful visualizations

<br/>

---

## Features

<br/>

### Security & Authentication

| Feature | Details |
|---|---|
| JWT Authentication | Stateless, secure token-based auth |
| Google OAuth 2.0 | One-click login via Google |
| Password Security | bcrypt hashing with salt rounds |
| Route Protection | Middleware-level API route guarding |
| Session Management | Automatic expiration and token refresh |

<br/>

### Intelligent Journaling

Write freely. The AI handles the rest.

- Rich-text journal entry creation with a distraction-free editor
- Real-time emotion classification — Happy, Sad, Stressed, Neutral
- Emotional valence scoring on a -1.0 to +1.0 scale
- Intensity and energy level tracking per entry
- Confidence scores indicating AI certainty for each prediction

<br/>

### Advanced Analytics

Turn raw journal data into actionable self-knowledge:

- **Emotion Distribution** — Visual breakdown of your emotional states over time
- **Mood Trend Graphs** — Track how your emotional landscape shifts across weeks and months
- **Volatility Analysis** — Measure your emotional consistency and identify turbulent periods
- **Weekly AI Summaries** — Automatically generated mental health recaps every week
- **Stability Index** — A composite wellness score from 0 to 100
- **Risk Assessment** — Early warning indicators for emotional distress

<br/>

### AI Chat Companion

- Real-time WebSocket-based conversational interface
- Context-aware emotional support powered by LLaMA 3.1
- Persistent conversation history across sessions
- Available 24/7 — no wait times, no judgment

<br/>

### Data Visualization

- Pie charts for emotion distribution
- Line graphs for mood trends over time
- Bar charts for weekly emotion breakdowns
- Live dashboard metrics that update as you journal

<br/>

---

## Tech Stack

### Backend

| Layer | Technology |
|---|---|
| Framework | FastAPI (Python) |
| Database | MongoDB Atlas |
| Authentication | JWT + OAuth 2.0 + Passlib (bcrypt) |
| AI / LLM | Groq API (LLaMA 3.1), LangChain |
| Real-time | WebSockets |
| Docs | Auto-generated OpenAPI / Swagger |

### Frontend

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| State | React Context API |
| Routing | React Router DOM v6 |
| Animations | Framer Motion |
| Charts | Recharts |
| HTTP | Axios |
| Effects | TSParticles |

### DevOps & Tooling

| Tool | Purpose |
|---|---|
| Git | Version control |
| Python venv | Isolated backend environment |
| Node.js / npm | Frontend package management |
| python-dotenv | Environment variable management |

<br/>

---

## Project Structure

```
MindMirror-AI/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── database.py             # MongoDB connection & collections
│   ├── auth.py                 # JWT authentication logic
│   ├── ai_service.py           # AI/LLM integration services
│   ├── chat_ws.py              # WebSocket chat handler
│   ├── requirements.txt        # Python dependencies
│   └── routes/
│       ├── auth_routes.py      # Authentication endpoints
│       ├── user.py             # User management endpoints
│       └── journal.py          # Journal CRUD & analytics
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...
│   │   ├── pages/              # Application pages
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Journal.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── LICENSE
└── README.md
```

<br/>

---

## Installation

### Prerequisites

Before you begin, ensure you have the following:

- Python 3.9 or higher
- Node.js 16 or higher
- A MongoDB Atlas account (or local MongoDB instance)
- Groq API Key — [Get it here](https://console.groq.com)
- Google OAuth Client ID — [Get it here](https://console.cloud.google.com/) *(required for Google login)*

<br/>

### Backend Setup

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/MindMirror-AI.git
cd MindMirror-AI
```

**2. Create and activate a virtual environment**

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
pip install "uvicorn[standard]"
```

**4. Configure environment variables**

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
GROQ_API_KEY=your_groq_api_key_here
MODEL_NAME=llama-3.1-8b-instant
JWT_SECRET_KEY=your_jwt_secret_key_here
SECRET_KEY=your_secret_key_here
JWT_ALGORITHM=HS256
GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
```

**5. Start the backend server**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be live at `http://localhost:8000`  
Auto-generated docs: `http://localhost:8000/docs`

<br/>

### Frontend Setup

**1. Navigate to the frontend directory**

```bash
cd ../frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment (optional)**

Create a `.env` file in the `frontend/` directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
```

**4. Start the development server**

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

<br/>

---

## Usage

**Step 1 — Register**  
Create an account using email/password or log in via Google OAuth. Your session is secured with short-lived JWT tokens.

**Step 2 — Write Journal Entries**  
Navigate to the Journal page and write freely. The AI analyzes your text in real time and surfaces emotion data, confidence levels, and valence scores the moment you save.

**Step 3 — Explore Your Dashboard**  
Track emotional patterns across time, view your Stability Index, and spot risk signals before they compound.

**Step 4 — Generate Reports**  
Access the Reports page for AI-generated weekly summaries and personalized mental health insights. Data can be exported for personal records.

**Step 5 — Chat with the AI Companion**  
Use the Chat interface for real-time emotional support. The companion is context-aware, empathetic, and available at any hour.

<br/>

---

## API Documentation

### Authentication

**Register**

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Login**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

// Response
{
  "access_token": "jwt_token",
  "token_type": "bearer"
}
```

<br/>

### Journal

**Create Entry**

```http
POST /journal
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My Day",
  "content": "Today was a great day..."
}

// Response
{
  "message": "Journal saved successfully",
  "emotion": "Happy",
  "confidence": 0.92,
  "valence": 0.8,
  "intensity": 0.7,
  "energy_level": "High"
}
```

**Other Journal Endpoints**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/journal/history` | Fetch all past entries |
| GET | `/journal/analytics` | Emotion analytics overview |
| GET | `/journal/trend` | Mood trends over time |
| GET | `/journal/weekly-summary` | AI-generated weekly report |
| GET | `/journal/stability-index` | Composite wellness score |
| GET | `/journal/advice` | Personalized AI recommendations |

All endpoints require `Authorization: Bearer {token}`.

<br/>

### WebSocket — Real-time Chat

```javascript
const token = localStorage.getItem('token');
const ws = new WebSocket(`ws://localhost:8000/ws/chat?token=${token}`);

ws.onopen = () => {
  ws.send('Hello, I need some support today.');
};

ws.onmessage = (event) => {
  const response = JSON.parse(event.data);
  console.log(response.content);
};
```

<br/>

---

## AI Intelligence Layer

### Emotion Detection

Each journal entry is analyzed across five dimensions:

| Dimension | Range | Meaning |
|---|---|---|
| Primary Emotion | Happy / Sad / Stressed / Neutral | Dominant emotional state |
| Confidence Score | 0.0 — 1.0 | AI certainty level |
| Valence | -1.0 — +1.0 | Negative to positive sentiment |
| Intensity | 0.0 — 1.0 | Strength of the emotion |
| Energy Level | Low / Medium / High | Emotional energy expressed |

<br/>

### Stability Index Formula

```
Stability Index = (1 - Volatility) × 50 + ((Valence + 1) / 2) × 30 + Intensity × 20
```

| Score Range | Interpretation |
|---|---|
| 0 — 30 | High Emotional Risk |
| 31 — 50 | Needs Attention |
| 51 — 75 | Generally Stable |
| 76 — 100 | Emotionally Strong |

<br/>

### Risk Assessment

Risk levels are computed by evaluating:

- Average emotional valence across recent entries
- Percentage of entries classified as negative states
- Emotional volatility patterns over time
- Intensity of emotional expressions

<br/>

---

## Security & Privacy

| Mechanism | Implementation |
|---|---|
| Data in Transit | HTTPS encryption end-to-end |
| Authentication | Stateless JWT with expiration |
| Password Storage | bcrypt with per-user salt |
| API Protection | CORS restricted to known origins |
| Data Ownership | User data is never sold or shared |

<br/>

---

## Roadmap

### Phase 1 — Completed

- [x] FastAPI backend with full REST API
- [x] MongoDB Atlas integration
- [x] JWT authentication + Google OAuth 2.0
- [x] AI-powered emotion detection
- [x] Journal CRUD operations
- [x] Analytics and trend endpoints
- [x] React frontend with Vite
- [x] Dashboard with data visualizations
- [x] WebSocket AI chat with auto-reconnect
- [x] Persistent conversation history
- [x] Profile management and logout

### Phase 2 — In Progress

- [ ] Cloud deployment (AWS / Vercel / Render)
- [ ] Enhanced mobile responsiveness
- [ ] Dark / Light theme toggle
- [ ] Export journal entries as PDF or CSV
- [ ] Email digests with weekly insights

### Phase 3 — Planned

- [ ] Native mobile app (React Native)
- [ ] Voice journaling via speech-to-text
- [ ] Multi-language support
- [ ] Wearable integration (heart rate, sleep data)
- [ ] Anonymous community sharing
- [ ] Therapist collaboration portal
- [ ] Fine-tuned emotion detection models

<br/>

---

## Contributing

Contributions are welcome and encouraged. Here is how to get involved:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "Add: brief description of your change"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request against main
```

**Contribution Standards**

- Follow PEP 8 for all Python code
- Use ESLint + Prettier for JavaScript and JSX
- Write clear, meaningful commit messages
- Add tests for any new functionality
- Keep documentation in sync with code changes

<br/>

---

## Known Issues

- Dashboard may experience slower load times with large journal histories — optimization is planned for Phase 2
- Timezone handling for date-based analytics requires refinement for users across regions

Report bugs via [GitHub Issues](https://github.com/student-yashsingh/MindMirror-AI/issues).

<br/>

---

## Acknowledgments

- **Groq** — for blazing-fast LLM inference that makes real-time emotion detection possible
- **MongoDB Atlas** — for reliable, scalable cloud database infrastructure
- **FastAPI** — for an exceptional developer experience and automatic API documentation
- **React** — for a component model that made building a dynamic frontend intuitive
- Every contributor and beta tester who helped shape this project

<br/>

---

## License

This project is licensed under the **Apache License 2.0**.  
See the [LICENSE](LICENSE) file for full terms.

```
Copyright 2024 Yash Singh

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

<br/>

---

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/student-yashsingh/MindMirror-AI?style=for-the-badge)
&nbsp;
![GitHub forks](https://img.shields.io/github/forks/student-yashsingh/MindMirror-AI?style=for-the-badge)
&nbsp;
![GitHub issues](https://img.shields.io/github/issues/student-yashsingh/MindMirror-AI?style=for-the-badge)

<br/>

**Built by Yash Singh**

*Your journey to emotional clarity starts here.*

<br/>

</div>
