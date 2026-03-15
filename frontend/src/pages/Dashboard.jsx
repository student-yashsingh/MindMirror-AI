import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

const COLORS = ["#a855f7","#6366f1","#ec4899","#22d3ee"];

export default function Dashboard(){

const { token } = useContext(AuthContext);

const [data,setData] = useState(null);
const [trend,setTrend] = useState([]);
const [weekly,setWeekly] = useState([]);

useEffect(()=>{

async function load(){

try{

const summary = await axios.get(
"http://localhost:8000/journal/dashboard-summary",
{headers:{Authorization:`Bearer ${token}`}}
);

setData(summary.data);

const trendRes = await axios.get(
"http://localhost:8000/journal/trend",
{headers:{Authorization:`Bearer ${token}`}}
);

const trendFormatted = trendRes.data.trend.map(t=>({
day:new Date(t.date).toLocaleDateString("en-US",{weekday:"short"}),
mood:t.valence
}));

setTrend(trendFormatted);

const historyRes = await axios.get(
"http://localhost:8000/journal/history",
{headers:{Authorization:`Bearer ${token}`}}
);

const journals = historyRes.data.journals;

const weekMap={
Mon:{happy:0,sad:0,stressed:0},
Tue:{happy:0,sad:0,stressed:0},
Wed:{happy:0,sad:0,stressed:0},
Thu:{happy:0,sad:0,stressed:0},
Fri:{happy:0,sad:0,stressed:0},
Sat:{happy:0,sad:0,stressed:0},
Sun:{happy:0,sad:0,stressed:0}
};

journals.forEach(j=>{

const day=new Date(j.created_at).toLocaleDateString(
"en-US",{weekday:"short"}
);

const emotion=j.emotion?.toLowerCase();

if(weekMap[day]){

if(emotion==="happy")weekMap[day].happy+=1;
if(emotion==="sad")weekMap[day].sad+=1;
if(emotion==="stressed")weekMap[day].stressed+=1;

}

});

const weeklyResult = Object.keys(weekMap).map(day=>({
day,
...weekMap[day]
}));

setWeekly(weeklyResult);

}catch(err){
console.log(err);
}

}

if(token) load();

},[token]);

if(!data){
return(
<Layout>
<div className="flex items-center justify-center text-white h-[400px]">
Loading dashboard...
</div>
</Layout>
);
}

const emotionData = Object.entries(data.emotion_distribution).map(
([emotion,value])=>({name:emotion,value})
);

return(

<Layout>

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="mb-12"
>

<h1 className="text-5xl font-bold
bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
bg-clip-text text-transparent">

MindMirror AI Dashboard

</h1>

<p className="text-gray-400 mt-2">
AI-powered insights about your emotional patterns
</p>

</motion.div>


<div className="grid grid-cols-3 gap-8 mb-12">

<motion.div
whileHover={{scale:1.05}}
className="bg-gradient-to-br from-purple-900/20 to-black/40
border border-purple-500/20 backdrop-blur-xl
p-8 rounded-2xl">

<p className="text-purple-400 text-sm">Total Journals</p>

<h2 className="text-4xl font-bold mt-1">
{data.total_entries}
</h2>

</motion.div>


<motion.div
whileHover={{scale:1.05}}
className="bg-gradient-to-br from-indigo-900/20 to-black/40
border border-indigo-500/20 backdrop-blur-xl
p-8 rounded-2xl">

<p className="text-indigo-400 text-sm">Risk Level</p>

<h2 className="text-3xl font-semibold mt-1">
{data.risk?.risk_level || "Low"}
</h2>

</motion.div>


<motion.div
whileHover={{scale:1.05}}
className="bg-gradient-to-br from-fuchsia-900/20 to-black/40
border border-fuchsia-500/20 backdrop-blur-xl
p-8 rounded-2xl">

<p className="text-fuchsia-400 text-sm">Risk Score</p>

<h2 className="text-3xl font-semibold mt-1">
{data.stability?.stability_index ?? 0}
</h2>

</motion.div>

</div>


<div className="bg-gradient-to-br from-white/5 to-white/0
border border-white/10 backdrop-blur-xl
p-10 rounded-2xl mb-20">

<h2 className="text-2xl font-semibold mb-6">
Emotion Distribution
</h2>

<div className="h-[380px]">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
data={emotionData}
innerRadius={70}
outerRadius={120}
dataKey="value"
label>

{emotionData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]}/>
))}

</Pie>

<Tooltip/>
<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

</div>


<div className="bg-gradient-to-br from-purple-900/20 to-black/40
border border-white/10 backdrop-blur-xl
p-10 rounded-2xl mb-20">

<h2 className="text-2xl font-semibold mb-6">
Mood Trend (Weekly)
</h2>

<div className="h-[420px]">

<ResponsiveContainer width="100%" height="100%">

<LineChart data={trend}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day"/>

<YAxis domain={[-1,1]}/>

<Tooltip/>

<Line
type="monotone"
dataKey="mood"
stroke="#a855f7"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>


<div className="bg-gradient-to-br from-indigo-900/20 to-black/40
border border-white/10 backdrop-blur-xl
p-10 rounded-2xl mb-20">

<h2 className="text-2xl font-semibold mb-6">
Weekly Emotion Analysis
</h2>

<div className="h-[420px]">

<ResponsiveContainer width="100%" height="100%">

<BarChart data={weekly}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>
<Legend/>

<Bar dataKey="happy" fill="#a855f7"/>
<Bar dataKey="sad" fill="#6366f1"/>
<Bar dataKey="stressed" fill="#ec4899"/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</Layout>

);
}