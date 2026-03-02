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
    background: #0b0f19;
    color: #f8fafc;
    line-height: 1.7;
}

header {
    background: linear-gradient(135deg, #111827, #1e3a8a);
    padding: 100px 20px;
    text-align: center;
}

header h1 {
    font-size: 3.8rem;
    margin: 0;
    background: linear-gradient(90deg, #60a5fa, #22d3ee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

header p {
    font-size: 1.4rem;
    margin-top: 20px;
    opacity: 0.9;
}

section {
    padding: 80px 10%;
}

h2 {
    font-size: 2.4rem;
    margin-bottom: 40px;
    text-align: center;
    color: #38bdf8;
}

.problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}

.card {
    background: #111827;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    transition: 0.3s ease;
}

.card:hover {
    transform: translateY(-8px);
}

.card img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 20px;
}

.highlight {
    color: #22d3ee;
    font-weight: bold;
}

.skills span {
    display: inline-block;
    background: #1f2937;
    padding: 10px 16px;
    margin: 6px;
    border-radius: 25px;
    font-size: 0.9rem;
}

.center {
    text-align: center;
}

footer {
    text-align: center;
    padding: 40px;
    background: #05080f;
    color: #94a3b8;
}
</style>
</head>

<body>

<header>
    <h1>🧠 MindMirror AI</h1>
    <p>AI-Powered Emotional Journal & Mental Wellness Intelligence Platform</p>
</header>

<section>
<h2>⚠ The Problem</h2>

<div class="problem-grid">

<div class="card">
<img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4" alt="Stressed Student">
<h3>Stressed Student</h3>
<p>Academic pressure, deadlines, exams and expectations often lead to mental exhaustion and anxiety.</p>
</div>

<div class="card">
<img src="https://images.unsplash.com/photo-1551434678-e076c223a692" alt="Frustrated Employee">
<h3>Frustrated Employee</h3>
<p>Work overload, burnout and constant pressure create emotional instability and stress.</p>
</div>

<div class="card">
<img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61" alt="Burnout">
<h3>Lost Focus & Burnout</h3>
<p>Overthinking, emotional confusion and lack of clarity impact productivity and well-being.</p>
</div>

</div>
</section>

<section>
<h2>💡 The Solution — MindMirror AI</h2>

<div class="card center">
<img src="https://images.unsplash.com/photo-1677442136019-21780ecad995" alt="AI Brain">
<p>
<span class="highlight">MindMirror AI</span> analyzes your journal entries using Artificial Intelligence,
detects emotional patterns, and provides personalized mental wellness insights.
</p>

<p>
It acts like a digital emotional mirror — reflecting your thoughts back with clarity,
security, and intelligent guidance.
</p>
</div>

</section>

<section>
<h2>🚀 What This Project Does</h2>

<div class="card">
<ul>
<li>Secure User Registration & Login</li>
<li>JWT Authentication & OAuth2 Authorization</li>
<li>Protected Routes with Bearer Token</li>
<li>User-Specific Journal Storage (MongoDB Atlas)</li>
<li>Password Hashing with bcrypt</li>
<li>AI Emotion Analysis (In Progress)</li>
<li>Future Next.js Animated Dashboard</li>
<li>Planned Cloud Deployment</li>
</ul>
</div>

</section>

<section>
<h2>🛠 Skills & Technologies Used</h2>

<div class="card skills center">
<span>Python</span>
<span>FastAPI</span>
<span>MongoDB Atlas</span>
<span>JWT Authentication</span>
<span>OAuth2</span>
<span>Passlib (bcrypt)</span>
<span>Backend Security</span>
<span>AI Integration</span>
<span>Next.js (Planned)</span>
</div>

</section>

<section>
<h2>👨‍💻 Developer</h2>

<div class="card center">
<p><strong>Built by:</strong> Yash Singh</p>
<p>Full Stack Developer & AI System Architect</p>
<p>Status: Backend Completed | AI & Frontend In Progress</p>
<p>Deployment Planned for Future Release</p>
</div>

</section>

<footer>
© 2026 MindMirror AI | Designed & Developed by Yash Singh
</footer>

</body>
</html>
