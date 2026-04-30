// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import Layout from "../components/Layout";
// import axios from "axios";
// import { motion } from "framer-motion";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   LineChart,
//   Line
// } from "recharts";

// const COLORS = ["#a855f7","#6366f1","#ec4899","#22d3ee"];

// export default function Reports(){

// const { token } = useContext(AuthContext);

// const [monthlyEmotionData,setMonthlyEmotionData] = useState([]);
// const [weeklyEmotionData,setWeeklyEmotionData] = useState([]);
// const [moodTrend,setMoodTrend] = useState([]);
// const [advice,setAdvice] = useState(null);

// useEffect(()=>{
//   if(token){
//     loadMonthly();
//     loadTrend();
//     loadWeekly();
//     loadAdvice();
//   }
// },[token]);

// async function loadMonthly(){

//   const res = await axios.get(
//     "http://localhost:8000/journal/analytics",
//     {headers:{Authorization:`Bearer ${token}`}}
//   );

//   const dist = res.data.emotion_distribution;

//   setMonthlyEmotionData([
//     {name:"Happy",value:dist.Happy},
//     {name:"Sad",value:dist.Sad},
//     {name:"Stressed",value:dist.Stressed},
//     {name:"Neutral",value:dist.Neutral}
//   ]);

// }

// async function loadTrend(){

//   const res = await axios.get(
//     "http://localhost:8000/journal/trend",
//     {headers:{Authorization:`Bearer ${token}`}}
//   );

//   const formatted = res.data.trend.map(item=>({
//     day:new Date(item.date).toLocaleDateString("en-US",{weekday:"short"}),
//     mood:item.valence
//   }));

//   setMoodTrend(formatted);

// }

// async function loadWeekly(){

//   const res = await axios.get(
//     "http://localhost:8000/journal/history",
//     {headers:{Authorization:`Bearer ${token}`}}
//   );

//   const journals = res.data.journals;

//   const today = new Date();
//   const sevenDaysAgo = new Date();
//   sevenDaysAgo.setDate(today.getDate() - 6);

//   const weekMap = {
//     Mon:{happy:0,sad:0,stressed:0},
//     Tue:{happy:0,sad:0,stressed:0},
//     Wed:{happy:0,sad:0,stressed:0},
//     Thu:{happy:0,sad:0,stressed:0},
//     Fri:{happy:0,sad:0,stressed:0},
//     Sat:{happy:0,sad:0,stressed:0},
//     Sun:{happy:0,sad:0,stressed:0}
//   };

//   journals.forEach(j=>{

//     const entryDate = new Date(j.created_at);

//     if(entryDate >= sevenDaysAgo && entryDate <= today){

//       const day = entryDate.toLocaleDateString(
//         "en-US",
//         {weekday:"short"}
//       );

//       const emotion = j.emotion?.toLowerCase();

//       if(weekMap[day]){

//         if(emotion === "happy") weekMap[day].happy += 1;
//         if(emotion === "sad") weekMap[day].sad += 1;
//         if(emotion === "stressed") weekMap[day].stressed += 1;

//       }

//     }

//   });

//   const result = Object.keys(weekMap).map(day=>({
//     day,
//     ...weekMap[day]
//   }));

//   setWeeklyEmotionData(result);

// }

// async function loadAdvice(){

//   const res = await axios.get(
//     "http://localhost:8000/journal/advice",
//     {headers:{Authorization:`Bearer ${token}`}}
//   );

//   setAdvice(res.data);

// }

// return(

// <Layout>

// <motion.div
// initial={{opacity:0,y:-20}}
// animate={{opacity:1,y:0}}
// className="mb-12">

// <h1 className="text-5xl font-bold
// bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
// bg-clip-text text-transparent">

// Emotion Analytics Report

// </h1>

// <p className="text-gray-400 mt-2">
// Deep insights into your emotional patterns
// </p>

// </motion.div>


// {/* MONTHLY PIE */}

// <div className="bg-white/5 backdrop-blur-xl border border-white/10
// p-10 rounded-2xl mb-12">

// <h2 className="text-2xl font-semibold mb-6">
// Monthly Emotion Distribution
// </h2>

// <div className="h-[350px]">

// <ResponsiveContainer width="100%" height="100%">

// <PieChart>

// <Pie
// data={monthlyEmotionData}
// innerRadius={70}
// outerRadius={120}
// dataKey="value"
// label>

// {monthlyEmotionData.map((entry,index)=>(
// <Cell key={index} fill={COLORS[index % COLORS.length]} />
// ))}

// </Pie>

// <Tooltip/>
// <Legend/>

// </PieChart>

// </ResponsiveContainer>

// </div>

// </div>


// {/* WEEKLY BAR */}

// <div className="bg-white/5 backdrop-blur-xl border border-white/10
// p-10 rounded-2xl mb-12">

// <h2 className="text-2xl font-semibold mb-6">
// Weekly Emotion Analysis
// </h2>

// <div className="h-[350px]">

// <ResponsiveContainer width="100%" height="100%">

// <BarChart data={weeklyEmotionData}>

// <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>

// <XAxis dataKey="day" stroke="#9ca3af"/>

// <YAxis stroke="#9ca3af"/>

// <Tooltip/>
// <Legend/>

// <Bar dataKey="happy" fill="#a855f7"/>
// <Bar dataKey="sad" fill="#6366f1"/>
// <Bar dataKey="stressed" fill="#ec4899"/>

// </BarChart>

// </ResponsiveContainer>

// </div>

// </div>


// {/* MOOD TREND */}

// <div className="bg-white/5 backdrop-blur-xl border border-white/10
// p-10 rounded-2xl mb-12">

// <h2 className="text-2xl font-semibold mb-6">
// Mood Trend
// </h2>

// <div className="h-[350px]">

// <ResponsiveContainer width="100%" height="100%">

// <LineChart data={moodTrend}>

// <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>

// <XAxis dataKey="day" stroke="#9ca3af"/>

// <YAxis domain={[-1,1]} stroke="#9ca3af"/>

// <Tooltip/>

// <Line
// type="monotone"
// dataKey="mood"
// stroke="#a855f7"
// strokeWidth={3}
// dot={{r:5}}
// />

// </LineChart>

// </ResponsiveContainer>

// </div>

// </div>


// {/* AI INSIGHT */}

// {advice && advice.ai_advice && (

// <div className="bg-gradient-to-br from-purple-900/30 to-black/40
// border border-purple-500/20 backdrop-blur-xl
// p-10 rounded-2xl">

// <h2 className="text-2xl font-semibold mb-4">
// AI Emotional Insight
// </h2>

// <p className="text-gray-300 leading-relaxed">

// {typeof advice.ai_advice === "string"
// ? advice.ai_advice
// : JSON.stringify(advice.ai_advice)}

// </p>

// </div>

// )}

// </Layout>

// );
// }





import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import axios from "axios";
import { motion } from "framer-motion";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Area, AreaChart
} from "recharts";

const COLORS = ["#a855f7", "#6366f1", "#ec4899", "#22d3ee"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(15,7,40,0.95)",
        border: "1px solid rgba(168,85,247,0.3)",
        borderRadius: 12, padding: "10px 16px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
      }}>
        {label && <p style={{ margin: "0 0 6px", fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ margin: "2px 0", fontSize: 13, color: p.color || "#c4b5fd", fontWeight: 500 }}>
            {p.name}: <span style={{ color: "white" }}>{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
    {payload?.map((entry, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: entry.color, display: "inline-block" }} />
        {entry.value}
      </div>
    ))}
  </div>
);

export default function Reports() {
  const { token } = useContext(AuthContext);

  const [monthlyEmotionData, setMonthlyEmotionData] = useState([]);
  const [weeklyEmotionData, setWeeklyEmotionData] = useState([]);
  const [moodTrend, setMoodTrend] = useState([]);
  const [advice, setAdvice] = useState(null);

  useEffect(() => {
    if (token) { loadMonthly(); loadTrend(); loadWeekly(); loadAdvice(); }
  }, [token]);

  async function loadMonthly() {
    const res = await axios.get("http://localhost:8000/journal/analytics", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const dist = res.data.emotion_distribution;
    setMonthlyEmotionData([
      { name: "Happy", value: dist.Happy },
      { name: "Sad", value: dist.Sad },
      { name: "Stressed", value: dist.Stressed },
      { name: "Neutral", value: dist.Neutral },
    ]);
  }

  async function loadTrend() {
    const res = await axios.get("http://localhost:8000/journal/trend", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMoodTrend(res.data.trend.map(item => ({
      day: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
      mood: item.valence,
    })));
  }

  async function loadWeekly() {
    const res = await axios.get("http://localhost:8000/journal/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const journals = res.data.journals;
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    const weekMap = {
      Mon: { happy: 0, sad: 0, stressed: 0 },
      Tue: { happy: 0, sad: 0, stressed: 0 },
      Wed: { happy: 0, sad: 0, stressed: 0 },
      Thu: { happy: 0, sad: 0, stressed: 0 },
      Fri: { happy: 0, sad: 0, stressed: 0 },
      Sat: { happy: 0, sad: 0, stressed: 0 },
      Sun: { happy: 0, sad: 0, stressed: 0 },
    };
    journals.forEach(j => {
      const entryDate = new Date(j.created_at);
      if (entryDate >= sevenDaysAgo && entryDate <= today) {
        const day = entryDate.toLocaleDateString("en-US", { weekday: "short" });
        const emotion = j.emotion?.toLowerCase();
        if (weekMap[day]) {
          if (emotion === "happy") weekMap[day].happy += 1;
          if (emotion === "sad") weekMap[day].sad += 1;
          if (emotion === "stressed") weekMap[day].stressed += 1;
        }
      }
    });
    setWeeklyEmotionData(Object.keys(weekMap).map(day => ({ day, ...weekMap[day] })));
  }

  async function loadAdvice() {
    const res = await axios.get("http://localhost:8000/journal/advice", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdvice(res.data);
  }

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
        * { box-sizing: border-box; }
        .reports-page { font-family: 'DM Sans', sans-serif; }

        @keyframes pulse-glow { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
        @keyframes shimmer    { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes drift      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-15px)} }

        .glass-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
          backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 22px;
          box-shadow: 0 16px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08);
          position: relative; overflow: hidden;
        }

        .chart-section {
          padding: 36px 36px 28px;
          margin-bottom: 20px;
          transition: box-shadow 0.3s;
        }

        .chart-section:hover {
          box-shadow: 0 24px 70px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .section-label {
          font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(168,85,247,0.7); font-weight: 600;
          margin: 0 0 4px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          color: rgba(255,255,255,0.9); margin: 0 0 28px;
        }

        .top-accent {
          position: absolute; top: 0; left: 24px; right: 24px; height: 2px;
          background: linear-gradient(to right, transparent, rgba(168,85,247,0.55), transparent);
          border-radius: 100px;
        }

        .stat-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 100px; font-size: 12px; font-weight: 500;
        }
      `}</style>

      <div className="reports-page" style={{ position: "relative" }}>

        {/* Ambient blobs */}
        <div style={{
          position: "absolute", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          top: -100, right: -100, borderRadius: "50%", pointerEvents: "none",
          animation: "pulse-glow 6s ease-in-out infinite", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", width: 350, height: 350,
          background: "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)",
          bottom: 200, left: -80, borderRadius: "50%", pointerEvents: "none",
          animation: "drift 10s ease-in-out infinite", zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ===== HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 40 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(124,58,237,0.18)",
              border: "1px solid rgba(124,58,237,0.35)",
              borderRadius: 100, padding: "5px 14px",
              fontSize: 12, color: "#c084fc", fontWeight: 500,
              letterSpacing: "0.5px", marginBottom: 16,
            }}>
              <span style={{ width: 6, height: 6, background: "#a855f7", borderRadius: "50%", animation: "pulse-glow 2s infinite" }} />
              Emotional Analytics
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 4vw, 54px)",
              fontWeight: 800, margin: "0 0 8px",
              background: "linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 40%, #c4b5fd 70%, #a78bfa 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 20px rgba(168,85,247,0.3))",
            }}>
              Emotion Analytics Report
            </h1>

            <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.38)" }}>
              Deep insights into your emotional patterns over time
            </p>
          </motion.div>

          {/* ===== SUMMARY CHIPS ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}
          >
            {[
              { label: "Emotion Types", val: "4 Tracked", icon: "🎭", color: "#c084fc" },
              { label: "This Week", val: "7 Days", icon: "📅", color: "#818cf8" },
              { label: "Trend Analysis", val: "Active", icon: "📈", color: "#e879f9" },
              { label: "AI Insights", val: "Enabled", icon: "🧠", color: "#67e8f9" },
            ].map((s, i) => (
              <div key={i} className="stat-pill" style={{
                background: `${s.color}18`,
                border: `1px solid ${s.color}30`,
                color: s.color,
              }}>
                {s.icon} <span style={{ color: "rgba(255,255,255,0.5)", marginRight: 2 }}>{s.label}:</span> {s.val}
              </div>
            ))}
          </motion.div>

          {/* ===== PIE CHART — Monthly ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card chart-section"
          >
            <div className="top-accent" />
            <p className="section-label">Monthly Overview</p>
            <h2 className="section-title">Emotion Distribution</h2>

            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={monthlyEmotionData}
                    innerRadius={80}
                    outerRadius={130}
                    dataKey="value"
                    paddingAngle={3}
                    stroke="none"
                  >
                    {monthlyEmotionData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        opacity={0.9}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ===== BAR CHART — Weekly ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card chart-section"
          >
            <div className="top-accent" style={{
              background: "linear-gradient(to right, transparent, rgba(99,102,241,0.55), transparent)",
            }} />
            <p className="section-label">Past 7 Days</p>
            <h2 className="section-title">Weekly Emotion Breakdown</h2>

            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyEmotionData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="rgba(255,255,255,0.25)"
                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
                    axisLine={false} tickLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.25)"
                    tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                    axisLine={false} tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Legend content={<CustomLegend />} />
                  <Bar dataKey="happy"   fill="#a855f7" radius={[6,6,0,0]} />
                  <Bar dataKey="sad"     fill="#6366f1" radius={[6,6,0,0]} />
                  <Bar dataKey="stressed" fill="#ec4899" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ===== LINE CHART — Mood Trend ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card chart-section"
          >
            <div className="top-accent" style={{
              background: "linear-gradient(to right, transparent, rgba(236,72,153,0.5), transparent)",
            }} />
            <p className="section-label">Valence Over Time</p>
            <h2 className="section-title">Mood Trend</h2>

            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodTrend}>
                  <defs>
                    <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="rgba(255,255,255,0.25)"
                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
                    axisLine={false} tickLine={false}
                  />
                  <YAxis
                    domain={[-1, 1]}
                    stroke="rgba(255,255,255,0.25)"
                    tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                    axisLine={false} tickLine={false}
                    tickFormatter={v => v > 0 ? `+${v}` : v}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="#a855f7"
                    strokeWidth={3}
                    fill="url(#moodGrad)"
                    dot={{ r: 5, fill: "#a855f7", stroke: "#0f0728", strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: "#c084fc", stroke: "#0f0728", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Mood scale legend */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "12px 4px 0",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              marginTop: 16,
            }}>
              {[
                { label: "-1.0", desc: "Very Negative", color: "#f87171" },
                { label: "0.0",  desc: "Neutral",       color: "#94a3b8" },
                { label: "+1.0", desc: "Very Positive", color: "#4ade80" },
              ].map((m, i) => (
                <div key={i} style={{ textAlign: i === 1 ? "center" : i === 2 ? "right" : "left" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{m.label}</span>
                  <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ===== AI INSIGHT ===== */}
          {advice && advice.ai_advice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card"
              style={{
                padding: "36px 36px",
                borderColor: "rgba(99,102,241,0.25)",
                boxShadow: "0 16px 50px rgba(79,70,229,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 24, right: 24, height: 2,
                background: "linear-gradient(to right, transparent, rgba(99,102,241,0.6), transparent)",
                borderRadius: 100,
              }} />

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: "rgba(99,102,241,0.2)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>💡</div>
                <div>
                  <p className="section-label" style={{ marginBottom: 2 }}>Personalized</p>
                  <h2 style={{
                    margin: 0,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20, fontWeight: 700,
                    background: "linear-gradient(135deg, #e0e7ff, #a5b4fc)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>AI Emotional Insight</h2>
                </div>
              </div>

              <div style={{
                fontSize: 56, lineHeight: 1, color: "rgba(99,102,241,0.15)",
                fontFamily: "Georgia, serif", marginBottom: -8, marginLeft: -4,
              }}>❝</div>

              <p style={{
                margin: 0, fontSize: 15, lineHeight: 1.85,
                color: "rgba(220,215,255,0.7)", paddingLeft: 8,
              }}>
                {typeof advice.ai_advice === "string"
                  ? advice.ai_advice
                  : JSON.stringify(advice.ai_advice)}
              </p>
            </motion.div>
          )}

        </div>
      </div>
    </Layout>
  );
}
