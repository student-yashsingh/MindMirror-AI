import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {

return(

<Layout>

{/* FULL PAGE BACKGROUND WRAPPER */}
<div className="relative min-h-screen w-full">

{/* PARTICLE BACKGROUND */}
<div className="absolute inset-0 z-0">

</div>


{/* BACKGROUND GLOW EFFECT */}
<div className="absolute inset-0 pointer-events-none z-0">

<div className="absolute -top-40 -left-40 w-96 h-96
bg-purple-600/30 blur-[140px] rounded-full"/>

<div className="absolute top-60 -right-40 w-96 h-96
bg-indigo-600/30 blur-[140px] rounded-full"/>

</div>


{/* MAIN CONTENT */}
<div className="relative z-10">

{/* HERO */}

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="mb-20"
>

<h1 className="text-6xl font-bold mb-6
bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
bg-clip-text text-transparent">

MindMirror AI

</h1>

<p className="text-gray-400 text-lg max-w-2xl">

AI powered emotional journaling that helps you understand
your feelings, track emotional patterns, and receive
personalized mental insights.

</p>

<div className="flex gap-4 mt-8">

<Link
to="/journal"
className="px-7 py-3 rounded-lg
bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
hover:scale-105 transition"
>
Start Journaling
</Link>

<Link
to="/dashboard"
className="px-7 py-3 rounded-lg
bg-white/10 border border-white/20
hover:bg-white/20 transition"
>
View Dashboard
</Link>

</div>

</motion.div>



{/* FEATURE SECTION */}

<div className="grid grid-cols-3 gap-8 mb-20">

<motion.div
whileHover={{scale:1.05}}
className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
>

<h3 className="text-xl font-semibold mb-3">
AI Emotion Detection
</h3>

<p className="text-gray-400 text-sm">
Your journal entries are analyzed by AI to detect emotional states
such as happiness, sadness, stress, and neutrality.
</p>

</motion.div>



<motion.div
whileHover={{scale:1.05}}
className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
>

<h3 className="text-xl font-semibold mb-3">
Emotional Analytics
</h3>

<p className="text-gray-400 text-sm">
Visualize emotional patterns with charts, emotion distributions,
and emotional stability metrics.
</p>

</motion.div>



<motion.div
whileHover={{scale:1.05}}
className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
>

<h3 className="text-xl font-semibold mb-3">
AI Mental Insights
</h3>

<p className="text-gray-400 text-sm">
Receive intelligent insights and advice based on your recent
emotional activity.
</p>

</motion.div>

</div>



{/* HOW IT WORKS */}

<div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-2xl mb-20">

<h2 className="text-2xl font-semibold mb-8">
How MindMirror Works
</h2>

<div className="grid grid-cols-3 gap-8">

<div>
<h3 className="text-lg font-semibold mb-2">
1. Write
</h3>
<p className="text-gray-400 text-sm">
Write your thoughts and emotions in your personal journal.
</p>
</div>

<div>
<h3 className="text-lg font-semibold mb-2">
2. AI Analysis
</h3>
<p className="text-gray-400 text-sm">
AI detects emotional tone, valence, intensity, and patterns.
</p>
</div>

<div>
<h3 className="text-lg font-semibold mb-2">
3. Insights
</h3>
<p className="text-gray-400 text-sm">
View emotional analytics and get personalized mental advice.
</p>
</div>

</div>

</div>



{/* QUICK NAVIGATION */}

<div className="grid grid-cols-4 gap-6">

<Link
to="/journal"
className="bg-white/5 border border-white/10
p-6 rounded-xl hover:scale-105 transition text-center"
>
Write Journal
</Link>

<Link
to="/dashboard"
className="bg-white/5 border border-white/10
p-6 rounded-xl hover:scale-105 transition text-center"
>
Dashboard
</Link>

<Link
to="/reports"
className="bg-white/5 border border-white/10
p-6 rounded-xl hover:scale-105 transition text-center"
>
Reports
</Link>

<Link
to="/chat"
className="bg-white/5 border border-white/10
p-6 rounded-xl hover:scale-105 transition text-center"
>
AI Chat
</Link>

</div>

</div>
</div>

</Layout>

);
}