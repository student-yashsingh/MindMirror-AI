<div align="center">

#  MindMirror AI

### *Your Digital Emotional Intelligence Companion*

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.135.1-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

##  Overview

**MindMirror AI** is an intelligent mental wellness platform that combines journaling with advanced AI-powered emotional analytics. By leveraging natural language processing and machine learning, MindMirror helps users understand their emotional patterns, track mental health trends, and receive personalized insights for better emotional well-being.

In today's fast-paced world, mental health awareness is more critical than ever. MindMirror bridges the gap between traditional journaling and modern AI technology, providing users with actionable insights into their emotional landscape.

###  The Problem

- Students and professionals face overwhelming stress and burnout
- People struggle silently with anxiety and emotional confusion
- Traditional journaling lacks intelligent pattern recognition
- Mental wellness tools are either too basic or not data-driven

###  The Solution

MindMirror AI acts as your **digital emotional mirror**, providing:
- **AI-Powered Emotion Detection** using state-of-the-art LLMs
- **Real-time Pattern Analysis** of your emotional journey
- **Personalized Insights** based on your unique emotional data
- **Secure & Private** journal entries with bank-level encryption
- **Interactive Dashboards** with beautiful data visualizations

---

##  Features

###  **Security & Authentication**
- JWT-based secure authentication system
- Google OAuth 2.0 integration for seamless login
- Encrypted password storage using bcrypt
- Protected API routes with token validation
- User session management

###  **Intelligent Journaling**
- Rich text journal entry creation
- Real-time AI emotion detection (Happy, Sad, Stressed, Neutral)
- Emotional valence scoring (-1 to 1 scale)
- Intensity and energy level tracking
- Confidence scores for emotion predictions

###  **Advanced Analytics**
- **Emotion Distribution**: Visual breakdown of emotional states
- **Mood Trends**: Track emotional changes over time
- **Volatility Analysis**: Measure emotional stability
- **Weekly Summaries**: AI-generated weekly mental health reports
- **Stability Index**: Comprehensive mental wellness score (0-100)
- **Risk Assessment**: Early warning system for emotional distress

###  **AI Chat Companion**
- Real-time WebSocket-based AI chat
- Supportive mental health companion powered by LLaMA 3.1
- Context-aware emotional support
- 24/7 availability for instant guidance

###  **Beautiful UI/UX**
- Modern gradient-based design system
- Responsive layout for all devices
- Smooth animations with Framer Motion
- Interactive charts and visualizations using Recharts
- Particle effects for immersive experience

###  **Data Visualization**
- Pie charts for emotion distribution
- Line graphs for mood trends
- Bar charts for weekly emotion analysis
- Custom dashboard metrics
- Real-time data updates

---

##  Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB Atlas
- **Authentication**: JWT, OAuth 2.0, Passlib (bcrypt)
- **AI/ML**: Groq API (LLaMA models), LangChain
- **WebSockets**: Real-time chat functionality
- **API Documentation**: Automatic OpenAPI/Swagger docs

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Effects**: TSParticles for background animations

### DevOps & Tools
- **Version Control**: Git
- **Environment**: Python virtual environments, Node.js
- **Package Management**: pip, npm
- **Configuration**: python-dotenv

---

##  Project Structure

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
│   │   ├── context/            # React Context providers
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # React entry point
│   ├── public/                 # Static assets
│   ├── package.json            # Node dependencies
│   ├── vite.config.js          # Vite configuration
│   └── tailwind.config.js      # Tailwind CSS config
│
├── LICENSE
└── README.md
```

---

##  Installation

### Prerequisites

- **Python** 3.9 or higher
- **Node.js** 16 or higher
- **MongoDB Atlas** account (or local MongoDB instance)
- **Groq API Key** ([Get it here](https://console.groq.com))
- **Google OAuth Client ID** ([Get it here](https://console.cloud.google.com/)) — required for Google login

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MindMirror-AI.git
   cd MindMirror-AI
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   pip install "uvicorn[standard]"
   ```

5. **Configure environment variables**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
   GROQ_API_KEY=your_groq_api_key_here
   MODEL_NAME=llama-3.1-8b-instant
   JWT_SECRET_KEY=your_secret_key_here
   SECRET_KEY=your_secret_key_here
   JWT_ALGORITHM=HS256
   GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
   ```

6. **Run the backend server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`
   
   API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**
   
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

---

##  Usage

### 1. **User Registration**
- Visit the app and click "Register"
- Create an account with email/password or use Google OAuth
- Your account is secured with JWT tokens

### 2. **Create Journal Entries**
- Navigate to the Journal page
- Write about your day, thoughts, or feelings
- AI automatically analyzes emotions in real-time
- View detected emotion, confidence level, and emotional metrics

### 3. **Explore Dashboard**
- View comprehensive analytics of your emotional patterns
- Track mood trends over time
- Understand your emotional stability index
- Identify risk levels and patterns

### 4. **Generate Reports**
- Access the Reports page for deeper insights
- Get weekly AI-generated summaries
- Receive personalized mental health advice
- Export data for personal records

### 5. **Chat with AI Companion**
- Use the Chat feature for instant support
- Discuss feelings, concerns, or seek guidance
- Get empathetic, real-time responses
- Available 24/7 for emotional support

---

##  API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: { "access_token": "jwt_token", "token_type": "bearer" }
```

### Journal Endpoints

#### Create Journal Entry
```http
POST /journal
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My Day",
  "content": "Today was a great day..."
}

Response: {
  "message": "Journal saved successfully",
  "emotion": "Happy",
  "confidence": 0.92,
  "valence": 0.8,
  "intensity": 0.7,
  "energy_level": "High"
}
```

#### Get Journal History
```http
GET /journal/history
Authorization: Bearer {token}
```

#### Get Analytics
```http
GET /journal/analytics
Authorization: Bearer {token}
```

#### Get Mood Trends
```http
GET /journal/trend
Authorization: Bearer {token}
```

#### Get Weekly Summary
```http
GET /journal/weekly-summary
Authorization: Bearer {token}
```

#### Get Stability Index
```http
GET /journal/stability-index
Authorization: Bearer {token}
```

#### Get AI Advice
```http
GET /journal/advice
Authorization: Bearer {token}
```

### WebSocket Endpoint

#### Real-time Chat
```javascript
const token = localStorage.getItem('token');
const ws = new WebSocket(`ws://localhost:8000/ws/chat?token=${token}`);

ws.onopen = () => {
  ws.send('Hello, I need some emotional support');
};

ws.onmessage = (event) => {
  const response = JSON.parse(event.data);
  console.log(response.content);
};
```

---

##  Key AI Features

### Emotion Detection Algorithm
The system uses advanced NLP to analyze journal entries and detect:
- **Primary Emotion**: Happy, Sad, Stressed, or Neutral
- **Confidence Score**: 0.0 to 1.0 (AI's certainty level)
- **Valence**: -1.0 (negative) to 1.0 (positive)
- **Intensity**: 0.0 (low) to 1.0 (high)
- **Energy Level**: Low, Medium, or High

### Stability Index Calculation
```
Stability Index = (1 - Volatility) × 50 + ((Valence + 1) / 2) × 30 + Intensity × 20
```
- **0-30**: High Emotional Risk
- **31-50**: Needs Attention
- **51-75**: Generally Stable
- **76-100**: Emotionally Strong

### Risk Assessment
The system evaluates risk based on:
- Average emotional valence over recent entries
- Percentage of negative emotional states
- Emotional volatility patterns
- Intensity of emotional experiences

---

##  Design Philosophy

MindMirror AI's interface is built around:
- **Calming Color Palette**: Purples, indigos, and blues promote tranquility
- **Smooth Animations**: Reduce cognitive load with gentle transitions
- **Clear Hierarchy**: Important information is immediately visible
- **Responsive Design**: Seamless experience across all devices
- **Accessibility**: WCAG-compliant design principles

---

##  Security & Privacy

- **End-to-End Encryption**: All data transmitted securely via HTTPS
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **CORS Protection**: Configured for specific origins
- **Data Privacy**: User data never shared or sold
- **Secure Sessions**: Automatic token expiration and refresh

---

##  Roadmap

### Phase 1 (Completed)
- [x] Backend API with FastAPI
- [x] MongoDB integration
- [x] JWT authentication
- [x] Google OAuth 2.0 login
- [x] AI emotion detection
- [x] Journal CRUD operations
- [x] Analytics endpoints
- [x] React frontend
- [x] Dashboard with visualizations
- [x] WebSocket chat with auto-reconnect
- [x] Conversation history in AI chat
- [x] Profile page with logout

### Phase 2 (In Progress)
- [ ] Deployment to cloud (AWS/Heroku/Vercel)
- [ ] Mobile responsiveness improvements
- [ ] Dark/Light theme toggle
- [ ] Export journal entries (PDF/CSV)
- [ ] Email notifications for insights

### Phase 3 (Planned)
- [ ] Mobile app (React Native)
- [ ] Voice journal entries with speech-to-text
- [ ] Multi-language support
- [ ] Integration with wearables (heart rate, sleep data)
- [ ] Community features (anonymous sharing)
- [ ] Therapist collaboration tools
- [ ] Advanced ML models for better predictions

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow PEP 8 for Python code
- Use ESLint/Prettier for JavaScript
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## Known Issues

- Large journal history may slow down dashboard loading
- Date/time timezone handling requires refinement

Please report bugs via [GitHub Issues](https://github.com/student-yashsingh/MindMirror-AI/issues).

---

##  Acknowledgments

- **Groq** for providing lightning-fast LLM inference
- **MongoDB Atlas** for reliable cloud database hosting
- **FastAPI** community for excellent documentation
- **React** team for the amazing frontend framework
- All contributors and testers who helped shape this project

---

##  Support

If you find this project helpful, please consider:
-  Starring the repository
-  Reporting bugs
-  Suggesting new features
-  Sharing with others who might benefit

---

##  Project Stats

![GitHub stars](https://img.shields.io/github/stars/student-yashsingh/MindMirror-AI?style=social)
![GitHub forks](https://img.shields.io/github/forks/student-yashsingh/MindMirror-AI?style=social)
![GitHub issues](https://img.shields.io/github/issues/student-yashsingh/MindMirror-AI)
![GitHub pull requests](https://img.shields.io/github/issues-pr/student-yashsingh/MindMirror-AI)

---

<div align="center">

**Made with ❤️ by yash**

*Your journey to emotional wellness starts here.*

</div>
