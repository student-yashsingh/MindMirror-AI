// import { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import Layout from "../components/Layout";
// import { motion } from "framer-motion";

// export default function Journal(){

//   const { token } = useContext(AuthContext);

//   const [title,setTitle] = useState("");
//   const [content,setContent] = useState("");
//   const [history,setHistory] = useState([]);
//   const [analysis,setAnalysis] = useState(null);
//   const [advice,setAdvice] = useState(null);
//   const [loading,setLoading] = useState(false);


//   async function submitJournal(){

//     if(!title.trim() || !content.trim()) return;

//     try{

//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:8000/journal",
//         {
//           title:title,
//           content:content
//         },
//         {
//           headers:{
//             Authorization:`Bearer ${token}`,
//             "Content-Type":"application/json"
//           }
//         }
//       );

//       setAnalysis(res.data);

//       setTitle("");
//       setContent("");

//       await loadHistory();
//       await loadAdvice();

//     }catch(err){
//       console.log("Save error:",err.response?.data || err.message);
//     }finally{
//       setLoading(false);
//     }

//   }


//   async function loadHistory(){

//     if(!token) return;

//     try{

//       const res = await axios.get(
//         "http://localhost:8000/journal/history",
//         {
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         }
//       );

//       setHistory(res.data?.journals || []);

//     }catch(err){
//       console.log("History error:",err.response?.data || err.message);
//     }
//   }


//   async function loadAdvice(){

//     if(!token) return;

//     try{

//       const res = await axios.get(
//         "http://localhost:8000/journal/advice",
//         {
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         }
//       );

//       setAdvice(res.data);

//     }catch(err){
//       console.log("Advice error:",err.response?.data || err.message);
//     }

//   }


//   useEffect(()=>{
//     if(token){
//       loadHistory();
//       loadAdvice();
//     }
//   },[token]);


//   return(

//     <Layout>

//       <motion.h1
//         initial={{opacity:0,y:-20}}
//         animate={{opacity:1,y:0}}
//         className="text-5xl font-bold mb-10
//         bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
//         bg-clip-text text-transparent"
//       >
//         Emotional Journal
//       </motion.h1>



//       {/* JOURNAL INPUT */}

//       <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl mb-10">

//         <input
//         value={title}
//         onChange={(e)=>setTitle(e.target.value)}
//         placeholder="Journal Title"
//         className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/10 outline-none"
//         />

//         <textarea
//         value={content}
//         onChange={(e)=>setContent(e.target.value)}
//         placeholder="Write about your thoughts or emotions..."
//         rows={5}
//         className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/10 outline-none"
//         />

//         <button
//         onClick={submitJournal}
//         disabled={loading}
//         className="px-6 py-3 rounded-lg
//         bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
//         hover:scale-105 transition disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Save Journal"}
//         </button>

//       </div>



//       {/* AI EMOTION RESULT */}

//       {analysis && (

//       <motion.div
//       initial={{opacity:0,y:10}}
//       animate={{opacity:1,y:0}}
//       className="bg-white/5 border border-purple-500/20 backdrop-blur-xl
//       p-6 rounded-2xl mb-10"
//       >

//         <h2 className="text-xl font-semibold mb-4
//         bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
//         bg-clip-text text-transparent">
//         AI Emotion Analysis
//         </h2>

//         <div className="grid grid-cols-2 gap-6 text-sm">

//           <div>
//             <p className="text-gray-400">Emotion</p>
//             <p className="text-lg">{analysis.emotion}</p>
//           </div>

//           <div>
//             <p className="text-gray-400">Confidence</p>
//             <p>{analysis.confidence?.toFixed(2)}</p>
//           </div>

//           <div>
//             <p className="text-gray-400">Valence</p>
//             <p>{analysis.valence}</p>
//           </div>

//           <div>
//             <p className="text-gray-400">Intensity</p>
//             <p>{analysis.intensity}</p>
//           </div>

//           <div>
//             <p className="text-gray-400">Energy Level</p>
//             <p>{analysis.energy_level}</p>
//           </div>

//         </div>

//       </motion.div>

//       )}



//       {/* AI ADVICE */}

//       {advice && advice.ai_advice && (

//       <motion.div
//       initial={{opacity:0,y:10}}
//       animate={{opacity:1,y:0}}
//       className="bg-white/5 border border-indigo-500/20 backdrop-blur-xl
//       p-6 rounded-2xl mb-12"
//       >

//         <h2 className="text-xl font-semibold mb-3
//         bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400
//         bg-clip-text text-transparent">
//         AI Mental Health Advice
//         </h2>

//         <p className="text-gray-300 leading-relaxed">
// {typeof advice.ai_advice === "string"
//   ? advice.ai_advice
//   : JSON.stringify(advice.ai_advice)}
// </p>

//       </motion.div>

//       )}



//       {/* JOURNAL HISTORY */}

//       <div className="space-y-6">

//         {history.length === 0 && (
//           <p className="text-gray-400">
//             No journal entries yet.
//           </p>
//         )}

//         {history.map((j,i)=>(
//           <motion.div
//           key={i}
//           whileHover={{scale:1.02}}
//           className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl"
//           >

//             <h3 className="text-xl font-semibold mb-2">
//               {j.title}
//             </h3>

//             <p className="text-gray-400 mb-3">
//               {j.content}
//             </p>

//             <div className="flex gap-6 text-sm text-gray-400 flex-wrap">

//               <span>
//                 Emotion: {j.emotion}
//               </span>

//               <span>
//                 Confidence: {j.confidence?.toFixed(2)}
//               </span>

//               <span>
//                 {j.created_at
//                   ? new Date(j.created_at).toLocaleDateString()
//                   : ""}
//               </span>

//             </div>

//           </motion.div>
//         ))}

//       </div>

//     </Layout>

//   );
// }



import { useState, useContext, useEffect } from "react";
import axios from "axios";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";

export default function Journal() {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitJournal() {
    if (!title.trim() || !content.trim()) return;
    try {
      setLoading(true);
      const res = await api.post(
        "/journal",
        { title, content }
      );
      setAnalysis(res.data);
      setTitle("");
      setContent("");
      await loadHistory();
      await loadAdvice();
    } catch (err) {
      console.log("Save error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadHistory() {
    if (!token) return;
    try {
      const res = await api.get("/journal/history");
      setHistory(res.data?.journals || []);
    } catch (err) {
      console.log("History error:", err.response?.data || err.message);
    }
  }

  async function loadAdvice() {
    if (!token) return;
    try {
      const res = await api.get("/journal/advice");
      setAdvice(res.data);
    } catch (err) {
      console.log("Advice error:", err.response?.data || err.message);
    }
  }

  useEffect(() => {
    if (token) { loadHistory(); loadAdvice(); }
  }, [token]);

  const emotionMeta = {
    happy:     { icon: "😊", color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)" },
    sad:       { icon: "😢", color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.25)" },
    angry:     { icon: "😤", color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
    anxious:   { icon: "😰", color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)" },
    neutral:   { icon: "😐", color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.25)" },
    stressed:  { icon: "😫", color: "#f97316", bg: "rgba(249,115,22,0.1)",  border: "rgba(249,115,22,0.25)" },
  };

  const getEmotion = (e) => emotionMeta[e?.toLowerCase()] || emotionMeta.neutral;

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

        * { box-sizing: border-box; }
        .journal-page { font-family: 'DM Sans', sans-serif; }

        @keyframes pulse-glow  { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
        @keyframes shimmer     { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes spin-ring   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fade-in-up  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .glass-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
          backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 22px;
          box-shadow: 0 16px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: box-shadow 0.3s, transform 0.3s;
        }

        .journal-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          resize: none;
        }

        .journal-input::placeholder { color: rgba(255,255,255,0.28); }

        .journal-input:focus {
          border-color: rgba(168,85,247,0.6);
          background: rgba(168,85,247,0.06);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.12);
        }

        .save-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 14px; border: none;
          cursor: pointer; font-size: 15px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #7c3aed, #9333ea, #4f46e5);
          color: white; position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s, opacity 0.2s;
        }

        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(124,58,237,0.6);
        }

        .save-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }

        .save-btn:hover:not(:disabled)::after {
          animation: shimmer 0.6s ease forwards;
        }

        .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .stat-box {
          padding: 16px 18px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }

        .stat-box:hover {
          background: rgba(124,58,237,0.08);
          border-color: rgba(124,58,237,0.25);
          transform: translateY(-2px);
        }

        .history-card {
          padding: 24px 26px;
          border-radius: 20px;
          cursor: default;
          transition: transform 0.25s, box-shadow 0.3s;
        }

        .history-card:hover {
          transform: translateY(-3px);
        }

        .char-counter {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          text-align: right;
          margin-top: 4px;
        }

        .loading-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: white; animation: blink 1.2s infinite;
          display: inline-block;
        }
      `}</style>

      <div className="journal-page">

        {/* Ambient blob */}
        <div style={{
          position: "absolute", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          top: 0, right: -100, borderRadius: "50%", pointerEvents: "none",
          animation: "pulse-glow 6s ease-in-out infinite", zIndex: 0,
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
              Emotional Journaling
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 4vw, 54px)",
              fontWeight: 800, margin: "0 0 8px",
              background: "linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 40%, #c4b5fd 70%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 20px rgba(168,85,247,0.3))",
            }}>
              Emotional Journal
            </h1>

            <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.38)" }}>
              Write freely — AI will analyze your emotional state
            </p>
          </motion.div>

          {/* ===== JOURNAL INPUT ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
            style={{ padding: "36px 36px", marginBottom: 24 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
              }}>✍️</div>
              <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                  New Entry
                </h2>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="journal-input"
              style={{ padding: "14px 18px", marginBottom: 14, fontSize: 16, fontWeight: 500 }}
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write about your thoughts, feelings, or anything on your mind..."
              rows={6}
              className="journal-input"
              style={{ padding: "14px 18px", lineHeight: 1.75 }}
            />

            <div className="char-counter">{content.length} characters</div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
              <div style={{ display: "flex", gap: 10 }}>
                {["😊","😢","😤","😰","😐"].map((em, i) => (
                  <button key={i} style={{
                    width: 34, height: 34, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)", cursor: "pointer", fontSize: 16,
                    transition: "transform 0.2s, background 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                    onClick={() => setContent(c => c + em)}
                    title="Add emoji"
                  >{em}</button>
                ))}
              </div>

              <button
                onClick={submitJournal}
                disabled={loading || !title.trim() || !content.trim()}
                className="save-btn"
              >
                {loading ? (
                  <>
                    <span className="loading-dot" style={{ animationDelay: "0s" }} />
                    <span className="loading-dot" style={{ animationDelay: "0.2s" }} />
                    <span className="loading-dot" style={{ animationDelay: "0.4s" }} />
                  </>
                ) : (
                  <> ✨ Save Journal </>
                )}
              </button>
            </div>
          </motion.div>

          {/* ===== AI ANALYSIS RESULT ===== */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="glass-card"
                style={{
                  padding: "32px 36px", marginBottom: 20,
                  borderColor: "rgba(168,85,247,0.25)",
                  boxShadow: "0 16px 50px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Top accent */}
                <div style={{
                  position: "absolute", top: 0, left: 24, right: 24, height: 2,
                  background: "linear-gradient(to right, transparent, rgba(168,85,247,0.6), transparent)",
                  borderRadius: 100,
                }} />

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                  }}>🧠</div>
                  <div>
                    <h2 style={{
                      margin: 0, fontSize: 16, fontWeight: 700,
                      background: "linear-gradient(135deg, #e9d5ff, #c4b5fd)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>AI Emotion Analysis</h2>
                    <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      Detected from your journal entry
                    </p>
                  </div>

                  {/* Emotion badge */}
                  <div style={{ marginLeft: "auto" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "6px 14px", borderRadius: 100,
                      background: getEmotion(analysis.emotion).bg,
                      border: `1px solid ${getEmotion(analysis.emotion).border}`,
                      fontSize: 13, fontWeight: 600,
                      color: getEmotion(analysis.emotion).color,
                    }}>
                      {getEmotion(analysis.emotion).icon} {analysis.emotion}
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {[
                    { label: "Confidence", value: analysis.confidence?.toFixed(2), icon: "🎯" },
                    { label: "Valence", value: analysis.valence, icon: "⚡" },
                    { label: "Intensity", value: analysis.intensity, icon: "🔥" },
                    { label: "Energy Level", value: analysis.energy_level, icon: "💫" },
                  ].map((s, i) => (
                    <div key={i} className="stat-box">
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4, display: "flex", gap: 5 }}>
                        <span>{s.icon}</span> {s.label}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                        {s.value ?? "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===== AI ADVICE ===== */}
          <AnimatePresence>
            {advice && advice.ai_advice && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="glass-card"
                style={{
                  padding: "32px 36px", marginBottom: 48,
                  borderColor: "rgba(99,102,241,0.25)",
                  boxShadow: "0 16px 50px rgba(79,70,229,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 24, right: 24, height: 2,
                  background: "linear-gradient(to right, transparent, rgba(99,102,241,0.6), transparent)",
                  borderRadius: 100,
                }} />

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                  }}>💡</div>
                  <div>
                    <h2 style={{
                      margin: 0, fontSize: 16, fontWeight: 700,
                      background: "linear-gradient(135deg, #e0e7ff, #a5b4fc)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>AI Mental Health Advice</h2>
                    <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      Personalized insights based on your entries
                    </p>
                  </div>
                </div>

                {/* Decorative quote mark */}
                <div style={{
                  fontSize: 64, lineHeight: 1, color: "rgba(99,102,241,0.15)",
                  fontFamily: "Georgia, serif", marginBottom: -8, marginLeft: -4,
                }}>❝</div>

                <p style={{
                  margin: 0, fontSize: 15, lineHeight: 1.85,
                  color: "rgba(220,215,255,0.72)",
                  paddingLeft: 8,
                }}>
                  {typeof advice.ai_advice === "string"
                    ? advice.ai_advice
                    : advice.ai_advice?.advice || advice.ai_advice?.analysis || JSON.stringify(advice.ai_advice)}
                </p>

                {/* Risk level + analysis badges if available */}
                {advice.ai_advice && typeof advice.ai_advice === "object" && (
                  <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    {advice.ai_advice.analysis && (
                      <div style={{
                        padding: "10px 14px", borderRadius: 10,
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        fontSize: 13, color: "rgba(200,195,255,0.7)", lineHeight: 1.6,
                      }}>
                        <span style={{ fontWeight: 600, color: "#a5b4fc" }}>Pattern: </span>
                        {advice.ai_advice.analysis}
                      </div>
                    )}
                    {advice.ai_advice.risk_level && (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "5px 12px", borderRadius: 20, width: "fit-content",
                        background: advice.ai_advice.risk_level === "High"
                          ? "rgba(248,113,113,0.12)"
                          : advice.ai_advice.risk_level === "Moderate"
                            ? "rgba(251,191,36,0.12)"
                            : "rgba(74,222,128,0.12)",
                        border: `1px solid ${advice.ai_advice.risk_level === "High"
                          ? "rgba(248,113,113,0.3)"
                          : advice.ai_advice.risk_level === "Moderate"
                            ? "rgba(251,191,36,0.3)"
                            : "rgba(74,222,128,0.3)"}`,
                        fontSize: 12, fontWeight: 600,
                        color: advice.ai_advice.risk_level === "High"
                          ? "#f87171"
                          : advice.ai_advice.risk_level === "Moderate"
                            ? "#fbbf24"
                            : "#4ade80",
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                        {advice.ai_advice.risk_level} Risk
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===== HISTORY ===== */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div>
                <p style={{
                  margin: "0 0 4px", fontSize: 11, letterSpacing: "2px",
                  textTransform: "uppercase", color: "rgba(168,85,247,0.7)", fontWeight: 600,
                }}>Your entries</p>
                <h2 style={{
                  margin: 0, fontFamily: "'Playfair Display', serif",
                  fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,0.88)",
                }}>Journal History</h2>
              </div>

              {history.length > 0 && (
                <div style={{
                  padding: "5px 14px", borderRadius: 100,
                  background: "rgba(124,58,237,0.18)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  fontSize: 12, color: "#c084fc", fontWeight: 500,
                }}>
                  {history.length} {history.length === 1 ? "entry" : "entries"}
                </div>
              )}
            </div>

            {history.length === 0 ? (
              <div className="glass-card" style={{
                padding: "48px 36px", textAlign: "center",
              }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>📓</div>
                <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                  No journal entries yet
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.28)" }}>
                  Write your first entry above to get started
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {history.map((j, i) => {
                  const em = getEmotion(j.emotion);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="glass-card history-card"
                      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 24px 60px ${em.color}22`}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = ""}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, gap: 16 }}>
                        <h3 style={{
                          margin: 0, fontSize: 16, fontWeight: 600,
                          color: "rgba(255,255,255,0.9)", flex: 1,
                        }}>
                          {j.title}
                        </h3>

                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          {/* Emotion badge */}
                          <div style={{
                            display: "flex", alignItems: "center", gap: 5,
                            padding: "4px 12px", borderRadius: 100,
                            background: em.bg, border: `1px solid ${em.border}`,
                            fontSize: 12, fontWeight: 600, color: em.color,
                          }}>
                            {em.icon} {j.emotion}
                          </div>
                          {/* Date */}
                          <div style={{
                            fontSize: 11, color: "rgba(255,255,255,0.3)",
                            padding: "4px 10px", borderRadius: 100,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}>
                            {j.created_at ? new Date(j.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                          </div>
                        </div>
                      </div>

                      <p style={{
                        margin: "0 0 14px", fontSize: 14, lineHeight: 1.7,
                        color: "rgba(255,255,255,0.42)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                        {j.content}
                      </p>

                      {/* Footer strip */}
                      <div style={{
                        display: "flex", gap: 16, paddingTop: 12,
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}>
                        {[
                          { label: "Confidence", value: j.confidence?.toFixed(2) },
                          { label: "Valence", value: j.valence },
                          { label: "Intensity", value: j.intensity },
                        ].map((s, si) => s.value && (
                          <div key={si} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                            <span style={{ marginRight: 4 }}>{s.label}:</span>
                            <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
