import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

const COLORS = ["#a855f7","#6366f1","#ec4899","#22d3ee"];

export default function Reports(){

const { token } = useContext(AuthContext);

const monthlyEmotionData = [
 {name:"Happy",value:12},
 {name:"Sad",value:7},
 {name:"Stressed",value:5},
 {name:"Neutral",value:3}
];

const weeklyEmotionData = [
 {day:"Mon",happy:2,sad:0,stressed:1},
 {day:"Tue",happy:1,sad:1,stressed:0},
 {day:"Wed",happy:2,sad:0,stressed:1},
 {day:"Thu",happy:0,sad:2,stressed:1},
 {day:"Fri",happy:1,sad:0,stressed:1},
 {day:"Sat",happy:3,sad:0,stressed:0},
 {day:"Sun",happy:2,sad:0,stressed:0}
];

const moodTrend = [
 {day:"Mon",mood:0.2},
 {day:"Tue",mood:-0.3},
 {day:"Wed",mood:0.5},
 {day:"Thu",mood:-0.2},
 {day:"Fri",mood:0.4},
 {day:"Sat",mood:0.6},
 {day:"Sun",mood:0.7}
];

return(

<Layout>

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="mb-12">

<h1 className="text-5xl font-bold
bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
bg-clip-text text-transparent">

Emotion Analytics Report

</h1>

<p className="text-gray-400 mt-2">
Deep insights into your emotional patterns
</p>

</motion.div>


{/* MONTHLY PIE */}

<div className="bg-white/5 backdrop-blur-xl border border-white/10
p-10 rounded-2xl mb-12">

<h2 className="text-2xl font-semibold mb-6">
Monthly Emotion Distribution
</h2>

<div className="h-[350px]">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
data={monthlyEmotionData}
innerRadius={70}
outerRadius={120}
dataKey="value"
label>

{monthlyEmotionData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Pie>

<Tooltip/>
<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

</div>


{/* WEEKLY BAR */}

<div className="bg-white/5 backdrop-blur-xl border border-white/10
p-10 rounded-2xl mb-12">

<h2 className="text-2xl font-semibold mb-6">
Weekly Emotion Analysis
</h2>

<div className="h-[350px]">

<ResponsiveContainer width="100%" height="100%">

<BarChart data={weeklyEmotionData}>

<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>

<XAxis dataKey="day" stroke="#9ca3af"/>

<YAxis stroke="#9ca3af"/>

<Tooltip/>
<Legend/>

<Bar dataKey="happy" fill="#a855f7"/>

<Bar dataKey="sad" fill="#6366f1"/>

<Bar dataKey="stressed" fill="#ec4899"/>

</BarChart>

</ResponsiveContainer>

</div>

</div>


{/* MOOD TREND */}

<div className="bg-white/5 backdrop-blur-xl border border-white/10
p-10 rounded-2xl mb-12">

<h2 className="text-2xl font-semibold mb-6">
Mood Trend
</h2>

<div className="h-[350px]">

<ResponsiveContainer width="100%" height="100%">

<LineChart data={moodTrend}>

<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>

<XAxis dataKey="day" stroke="#9ca3af"/>

<YAxis domain={[-1,1]} stroke="#9ca3af"/>

<Tooltip/>

<Line
type="monotone"
dataKey="mood"
stroke="#a855f7"
strokeWidth={3}
dot={{r:5}}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>


{/* AI INSIGHT */}

<div className="bg-gradient-to-br from-purple-900/30 to-black/40
border border-purple-500/20 backdrop-blur-xl
p-10 rounded-2xl">

<h2 className="text-2xl font-semibold mb-4">
AI Emotional Insight
</h2>

<p className="text-gray-300 leading-relaxed">

Your emotional data shows stress spikes during mid-week,
while weekends indicate higher happiness levels.  
Maintaining daily journaling will allow the AI to detect
patterns earlier and recommend mental wellness strategies.

</p>

</div>


</Layout>

);
}