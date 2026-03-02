<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MindMirror AI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: #0f172a;
            color: #f1f5f9;
            line-height: 1.6;
        }

        header {
            background: linear-gradient(135deg, #6366f1, #0ea5e9);
            padding: 60px 20px;
            text-align: center;
        }

        header h1 {
            font-size: 3rem;
            margin: 0;
        }

        header p {
            font-size: 1.2rem;
            margin-top: 10px;
        }

        section {
            padding: 50px 10%;
        }

        h2 {
            color: #38bdf8;
            margin-bottom: 20px;
        }

        .card {
            background: #1e293b;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }

        .skills span {
            display: inline-block;
            background: #334155;
            padding: 8px 12px;
            border-radius: 20px;
            margin: 5px;
            font-size: 0.9rem;
        }

        .features li {
            margin-bottom: 10px;
        }

        footer {
            text-align: center;
            padding: 20px;
            background: #0b1120;
            font-size: 0.9rem;
            color: #94a3b8;
        }

        img {
            max-width: 100%;
            border-radius: 10px;
            margin-top: 15px;
        }

        .highlight {
            color: #22d3ee;
            font-weight: bold;
        }
    </style>
</head>
<body>

<header>
    <h1>🧠 MindMirror AI</h1>
    <p>An AI-Powered Emotional Journal & Mental Wellness Platform</p>
</header>

<section>
    <h2>📌 About The Project</h2>
    <div class="card">
        <p>
            <span class="highlight">MindMirror AI</span> is a secure, AI-driven journaling platform 
            designed to analyze emotions, track mental wellness, and provide intelligent insights 
            using advanced AI models.
        </p>
        <p>
            The system combines modern backend architecture with AI-powered analysis to create 
            a personalized emotional reflection experience.
        </p>
    </div>
</section>

<section>
    <h2>👨‍💻 Developer</h2>
    <div class="card">
        <p><strong>Name:</strong> Yash Singh</p>
        <p><strong>Role:</strong> Full Stack Developer & AI System Designer</p>
        <p><strong>Focus:</strong> Backend Architecture, AI Integration, Secure Authentication Systems</p>
    </div>
</section>

<section>
    <h2>⚙️ Tech Stack</h2>
    <div class="card skills">
        <span>FastAPI</span>
        <span>MongoDB Atlas</span>
        <span>JWT Authentication</span>
        <span>OAuth2</span>
        <span>Python</span>
        <span>Passlib (bcrypt)</span>
        <span>Next.js (Frontend Planned)</span>
        <span>AI Model Integration</span>
    </div>
</section>

<section>
    <h2>🔐 Current Backend Features</h2>
    <div class="card">
        <ul class="features">
            <li>Secure User Registration</li>
            <li>Password Hashing with bcrypt</li>
            <li>JWT Token Authentication</li>
            <li>OAuth2 Password Flow Integration</li>
            <li>Protected Routes using Bearer Token</li>
            <li>User-Specific Journal Storage</li>
            <li>MongoDB Cloud Database Integration</li>
        </ul>
    </div>
</section>

<section>
    <h2>🚀 Upcoming Features</h2>
    <div class="card">
        <ul class="features">
            <li>AI-Based Emotion Detection</li>
            <li>Sentiment Analysis Engine</li>
            <li>RAG Memory System</li>
            <li>Personalized Mood Insights</li>
            <li>Interactive Dashboard UI</li>
            <li>Animated Frontend using Next.js</li>
            <li>Deployment & Cloud Hosting</li>
        </ul>
    </div>
</section>

<section>
    <h2>📊 System Flow</h2>
    <div class="card">
        <p>
            Register → Login → JWT Token Generation → Authorize → 
            Protected Journal Entry → AI Analysis → Stored in Database
        </p>
    </div>
</section>

<section>
    <h2>🖼 Project Preview</h2>
    <div class="card">
        <p>Backend Swagger UI (Authentication & Protected Routes)</p>
        <img src="https://fastapi.tiangolo.com/img/index/index-01-swagger-ui-simple.png" alt="Swagger UI Preview">
    </div>
</section>

<footer>
    © 2026 MindMirror AI | Designed & Developed by Yash Singh
</footer>

</body>
</html>
