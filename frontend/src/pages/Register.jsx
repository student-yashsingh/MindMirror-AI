// import NeuralBackground from "../components/NeuralBackground";
// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google";
// import { motion } from "framer-motion";

// export default function Register() {

//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");

//   const { setToken } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleRegister = async (e)=>{
//     e.preventDefault();

//     try{
//       const res = await axios.post(
//         "http://localhost:8000/register",
//         {
//           username:name,
//           email,
//           password
//         }
//       );

//       if(res.data.access_token){
//         setToken(res.data.access_token);
//         navigate("/");
//       }else{
//         alert("Account created. Please login.");
//         navigate("/login");
//       }

//     }catch(err){
//       console.log(err);
//       alert("Registration failed");
//     }
//   };

//   const handleGoogleSignup = async (credentialResponse)=>{
//     try{
//       const res = await axios.post(
//         "http://localhost:8000/google-login",
//         {
//           token:credentialResponse.credential
//         }
//       );

//       setToken(res.data.access_token);
//       navigate("/dashboard");

//     }catch(err){
//       console.log(err);
//       alert("Google signup failed");
//     }
//   };

//   return (

//     <div className="relative min-h-screen overflow-hidden text-white">

//       {/* Background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.35),transparent_45%),linear-gradient(135deg,#0b0018,#05010a,#140028)]"></div>

//       <div className="absolute w-[700px] h-[700px] bg-purple-600 rounded-full blur-[260px] opacity-30 top-[-250px] left-[-200px]"></div>
//       <div className="absolute w-[550px] h-[550px] bg-indigo-600 rounded-full blur-[260px] opacity-25 bottom-[-200px] right-[-200px]"></div>

//       <div className="relative z-10 flex min-h-screen">

//         {/* LEFT SECTION */}
//         <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 space-y-10 relative">

//           {/* neural mesh */}
//           <div className="absolute left-[12%] top-[12%] opacity-20 pointer-events-none">
//             <svg width="260" height="260" viewBox="0 0 200 200">
//               <circle cx="70" cy="60" r="3" fill="#a855f7"/>
//               <circle cx="110" cy="50" r="3" fill="#6366f1"/>
//               <circle cx="130" cy="90" r="3" fill="#a855f7"/>
//               <circle cx="90" cy="120" r="3" fill="#6366f1"/>
//               <circle cx="60" cy="100" r="3" fill="#a855f7"/>

//               <line x1="70" y1="60" x2="110" y2="50" stroke="#a855f7"/>
//               <line x1="110" y1="50" x2="130" y2="90" stroke="#6366f1"/>
//               <line x1="130" y1="90" x2="90" y2="120" stroke="#a855f7"/>
//               <line x1="90" y1="120" x2="60" y2="100" stroke="#6366f1"/>
//               <line x1="60" y1="100" x2="70" y2="60" stroke="#a855f7"/>
//             </svg>
//           </div>

//           {/* Heading */}
//           <motion.h1
//             initial={{ opacity:0, y:-30 }}
//             animate={{ opacity:1, y:0 }}
//             transition={{ duration:0.7 }}
//             className="text-7xl font-extrabold tracking-tight
//             bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#1e1b4b]
//             bg-clip-text text-transparent"
//             style={{
//               textShadow:`
//               0px 3px 0px #0f072a,
//               0px 6px 12px rgba(0,0,0,0.7),
//               0px 10px 25px rgba(76,29,149,0.6)
//               `
//             }}
//           >
//             MindMirror AI
//           </motion.h1>

//           {/* UPDATED DESCRIPTION */}
//           <motion.p
//             initial={{opacity:0}}
//             animate={{opacity:1}}
//             transition={{delay:0.3}}
//             className="text-lg max-w-xl leading-relaxed
//             bg-gradient-to-r from-purple-200 via-indigo-200 to-fuchsia-200
//             bg-clip-text text-transparent"
//           >
//             A <span className="text-purple-400 font-semibold">next-generation AI companion </span>
//             that helps you <span className="text-indigo-300 font-semibold">understand emotions</span>,
//             uncover hidden <span className="text-fuchsia-300 font-semibold">mental patterns</span>,
//             and generate meaningful insights to support
//             <span className="text-purple-300 font-semibold"> mental clarity and growth.</span>
//           </motion.p>

//           {/* FEATURES */}
//           <div className="grid grid-cols-1 gap-6">

//             <motion.div
//               whileHover={{ scale:1.06, rotateX:6, rotateY:-6 }}
//               transition={{ type:"spring", stiffness:200 }}
//               className="flex items-center gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_rgba(168,85,247,0.5)] transform-gpu"
//             >
//               <span className="text-3xl">🧠</span>
//               <div>
//                 <h3 className="font-semibold text-lg">AI Emotion Analysis</h3>
//                 <p className="text-sm text-gray-400">
//                   Detect emotional tone and mental state from journals.
//                 </p>
//               </div>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale:1.06, rotateX:6, rotateY:-6 }}
//               transition={{ type:"spring", stiffness:200 }}
//               className="flex items-center gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_rgba(99,102,241,0.5)] transform-gpu"
//             >
//               <span className="text-3xl">📊</span>
//               <div>
//                 <h3 className="font-semibold text-lg">Mood Pattern Tracking</h3>
//                 <p className="text-sm text-gray-400">
//                   Visualize emotional trends over time.
//                 </p>
//               </div>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale:1.06, rotateX:6, rotateY:-6 }}
//               transition={{ type:"spring", stiffness:200 }}
//               className="flex items-center gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_rgba(147,51,234,0.5)] transform-gpu"
//             >
//               <span className="text-3xl">💡</span>
//               <div>
//                 <h3 className="font-semibold text-lg">AI Wellness Insights</h3>
//                 <p className="text-sm text-gray-400">
//                   Personalized suggestions to improve clarity.
//                 </p>
//               </div>
//             </motion.div>

//           </div>
//           {/* INFO BLOCKS */}
// <div className="grid grid-cols-3 gap-6 pt-4">

// <motion.div
//   whileHover={{ scale:1.07, rotateX:6 }}
//   className="bg-gradient-to-br from-white/10 to-white/5
//   backdrop-blur-xl
//   p-6 rounded-2xl
//   border border-white/10
//   text-center
//   shadow-[0_20px_60px_rgba(0,0,0,0.7)]
//   hover:shadow-[0_30px_80px_rgba(168,85,247,0.4)]"
// >
//   <h3 className="text-xl font-semibold text-purple-400">Privacy First</h3>
//   <p className="text-sm text-gray-400">
//     Your journals stay secure and private.
//   </p>
// </motion.div>

// <motion.div
//   whileHover={{ scale:1.07, rotateX:6 }}
//   className="bg-gradient-to-br from-white/10 to-white/5
//   backdrop-blur-xl
//   p-6 rounded-2xl
//   border border-white/10
//   text-center
//   shadow-[0_20px_60px_rgba(0,0,0,0.7)]
//   hover:shadow-[0_30px_80px_rgba(99,102,241,0.4)]"
// >
//   <h3 className="text-xl font-semibold text-indigo-400">AI Powered</h3>
//   <p className="text-sm text-gray-400">
//     Intelligent emotional analysis.
//   </p>
// </motion.div>

// <motion.div
//   whileHover={{ scale:1.07, rotateX:6 }}
//   className="bg-gradient-to-br from-white/10 to-white/5
//   backdrop-blur-xl
//   p-6 rounded-2xl
//   border border-white/10
//   text-center
//   shadow-[0_20px_60px_rgba(0,0,0,0.7)]
//   hover:shadow-[0_30px_80px_rgba(147,51,234,0.4)]"
// >
//   <h3 className="text-xl font-semibold text-purple-400">Daily Growth</h3>
//   <p className="text-sm text-gray-400">
//     Build healthier mental habits.
//   </p>
// </motion.div>

// </div>

//         </div>


//         {/* RIGHT SIDE FORM */}
//         <div className="flex flex-1 items-center justify-center px-6">

//           <motion.div
//             initial={{opacity:0,y:40}}
//             animate={{opacity:1,y:0}}
//             transition={{duration:0.6}}
//             whileHover={{ scale:1.03 }}

//             onMouseMove={(e)=>{
//               const rect = e.currentTarget.getBoundingClientRect()
//               const x = e.clientX - rect.left
//               const y = e.clientY - rect.top

//               const rotateX = -(y - rect.height/2) / 15
//               const rotateY = (x - rect.width/2) / 15

//               e.currentTarget.style.transform =
//                 `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
//             }}

//             onMouseLeave={(e)=>{
//               e.currentTarget.style.transform =
//                 "perspective(900px) rotateX(0deg) rotateY(0deg)"
//             }}

//             className="w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] hover:shadow-[0_35px_120px_rgba(168,85,247,0.5)] transition-all duration-200"
//           >

//             <h2 className="text-3xl font-semibold text-center mb-6">
//               Create Account
//             </h2>

//             <form onSubmit={handleRegister} className="flex flex-col gap-4">

//               <input
//                 type="text"
//                 placeholder="Name"
//                 onChange={(e)=>setName(e.target.value)}
//                 className="p-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-purple-500"
//               />

//               <input
//                 type="email"
//                 placeholder="Email"
//                 onChange={(e)=>setEmail(e.target.value)}
//                 className="p-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-purple-500"
//               />

//               <input
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e)=>setPassword(e.target.value)}
//                 className="p-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-purple-500"
//               />

//               <button className="mt-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:scale-105 hover:shadow-[0_10px_40px_rgba(168,85,247,0.6)] transition transform p-3 rounded-lg font-semibold">
//                 Create Account
//               </button>

//             </form>

//             <div className="flex items-center my-6">
//               <div className="flex-1 h-[1px] bg-gray-700"></div>
//               <span className="px-3 text-gray-400 text-sm">OR</span>
//               <div className="flex-1 h-[1px] bg-gray-700"></div>
//             </div>

//             <div className="flex justify-center">
//               <GoogleLogin
//                 text="signup_with"
//                 onSuccess={handleGoogleSignup}
//                 onError={()=>console.log("Google signup failed")}
//               />
//             </div>

//             <p className="mt-6 text-center text-gray-400">
//               Already have an account?
//               <span
//                 onClick={()=>navigate("/login")}
//                 className="text-purple-400 ml-2 cursor-pointer hover:underline"
//               >
//                 Login
//               </span>
//             </p>

//           </motion.div>

//         </div>

//       </div>

//     </div>
//   );
// }




import NeuralBackground from "../components/NeuralBackground";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/register", {
        username: name,
        email,
        password,
      });
      if (res.data.access_token) {
        setToken(res.data.access_token);
        navigate("/");
      } else {
        alert("Account created. Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:8000/google-login", {
        token: credentialResponse.credential,
      });
      setToken(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Google signup failed");
    }
  };

  const featureCards = [
    {
      icon: "🧠",
      title: "AI Emotion Analysis",
      desc: "Detect emotional tone and mental state from journals.",
      glow: "rgba(168,85,247,0.5)",
    },
    {
      icon: "📊",
      title: "Mood Pattern Tracking",
      desc: "Visualize emotional trends over time.",
      glow: "rgba(99,102,241,0.5)",
    },
    {
      icon: "💡",
      title: "AI Wellness Insights",
      desc: "Personalized suggestions to improve clarity.",
      glow: "rgba(147,51,234,0.5)",
    },
  ];

  const infoCards = [
    { label: "Privacy First", color: "#c084fc", desc: "Your journals stay secure and private." },
    { label: "AI Powered", color: "#818cf8", desc: "Intelligent emotional analysis." },
    { label: "Daily Growth", color: "#e879f9", desc: "Build healthier mental habits." },
  ];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        color: "white",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;800&display=swap');

        * { box-sizing: border-box; }

        .input-field {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }

        .input-field::placeholder { color: rgba(255,255,255,0.35); }

        .input-field:focus {
          border-color: rgba(168,85,247,0.7);
          background: rgba(168,85,247,0.07);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.15);
        }

        .register-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #7c3aed, #9333ea, #4f46e5);
          color: white;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
        }

        .register-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(124,58,237,0.6);
        }

        .register-btn:hover::before { opacity: 1; }

        .feature-card {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 20px 24px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: default;
        }

        .feature-card:hover {
          transform: translateY(-3px) scale(1.02);
        }

        .info-card {
          padding: 22px 16px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: default;
        }

        .info-card:hover {
          transform: translateY(-3px);
        }

        .form-card {
          width: 100%;
          max-width: 420px;
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 44px 40px;
          border-radius: 28px;
          box-shadow: 0 30px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: box-shadow 0.3s;
        }

        .form-card:hover {
          box-shadow: 0 40px 120px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(168,85,247,0.15);
          animation: spin-slow linear infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 1024px) {
          .left-section { display: none !important; }
        }
      `}</style>

      {/* === BACKGROUND === */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #050010 0%, #0a0020 50%, #030015 100%)",
      }} />

      {/* Ambient blobs */}
      <div style={{
        position: "absolute", width: 700, height: 700,
        background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
        top: -200, left: -200, borderRadius: "50%",
        animation: "pulse-glow 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)",
        bottom: -150, right: -150, borderRadius: "50%",
        animation: "pulse-glow 5s ease-in-out infinite 1s",
      }} />
      <div style={{
        position: "absolute", width: 300, height: 300,
        background: "radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)",
        top: "40%", left: "40%", borderRadius: "50%",
        animation: "pulse-glow 6s ease-in-out infinite 2s",
      }} />

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* === MAIN LAYOUT === */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", minHeight: "100vh",
      }}>

        {/* ===== LEFT SECTION ===== */}
        <div className="left-section" style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "60px 56px",
          width: "52%", gap: 40, position: "relative",
        }}>

          {/* Orbit decoration */}
          <div className="orbit-ring" style={{
            width: 350, height: 350,
            top: "5%", left: "-80px",
            animationDuration: "25s",
          }} />
          <div className="orbit-ring" style={{
            width: 200, height: 200,
            bottom: "15%", left: "30px",
            animationDuration: "18s",
            animationDirection: "reverse",
          }} />

          {/* Neural SVG */}
          <div style={{
            position: "absolute", left: "8%", top: "8%",
            opacity: 0.25, pointerEvents: "none",
          }}>
            <svg width="300" height="300" viewBox="0 0 200 200">
              {[
                [70,60],[110,50],[140,85],[120,130],[80,140],[50,105]
              ].map(([cx,cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3.5" fill={i%2===0?"#a855f7":"#6366f1"} opacity="0.9"/>
              ))}
              {[
                [[70,60],[110,50]],[[110,50],[140,85]],[[140,85],[120,130]],
                [[120,130],[80,140]],[[80,140],[50,105]],[[50,105],[70,60]],
                [[70,60],[140,85]],[[110,50],[80,140]],
              ].map(([[x1,y1],[x2,y2]], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={i%2===0?"rgba(168,85,247,0.6)":"rgba(99,102,241,0.6)"} strokeWidth="0.8"/>
              ))}
            </svg>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(124,58,237,0.4)",
              borderRadius: 100, padding: "6px 16px",
              fontSize: 13, color: "#c084fc", width: "fit-content",
              letterSpacing: "0.5px",
            }}
          >
            <span style={{ width: 6, height: 6, background: "#a855f7", borderRadius: "50%", display: "inline-block" }} />
            Next-gen mental wellness
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(52px, 5vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: 0,
              background: "linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 40%, #c4b5fd 70%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 24px rgba(168,85,247,0.4))",
            }}>
              Mind<br />Mirror<span style={{
                background: "linear-gradient(135deg, #a855f7, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}> AI</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{
              fontSize: 16, lineHeight: 1.75, maxWidth: 460,
              color: "rgba(220,215,255,0.7)", margin: 0,
            }}
          >
            A next-generation AI companion that helps you{" "}
            <span style={{ color: "#c084fc", fontWeight: 600 }}>understand emotions</span>,
            uncover hidden{" "}
            <span style={{ color: "#a5b4fc", fontWeight: 600 }}>mental patterns</span>, and
            generate meaningful insights for{" "}
            <span style={{ color: "#e879f9", fontWeight: 600 }}>mental clarity and growth</span>.
          </motion.p>

          {/* Feature cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {featureCards.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="feature-card"
                style={{ "--glow": f.glow }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px ${f.glow}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <span style={{
                  fontSize: 28, width: 52, height: 52,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 14, flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>{f.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, marginBottom: 3, color: "rgba(255,255,255,0.95)" }}>{f.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}
          >
            {infoCards.map((c, i) => (
              <div
                key={i}
                className="info-card"
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 16px 40px ${c.color}33`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <h3 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 600, color: c.color }}>{c.label}</h3>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ===== RIGHT FORM ===== */}
        <div style={{
          flex: 1, display: "flex",
          alignItems: "center", justifyContent: "center",
          padding: "40px 24px",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="form-card"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const rotateX = -(y - rect.height / 2) / 20;
              const rotateY = (x - rect.width / 2) / 20;
              e.currentTarget.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";
            }}
          >
            {/* Form header */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(79,70,229,0.3))",
                border: "1px solid rgba(168,85,247,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px", fontSize: 22,
              }}>✨</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28, fontWeight: 700, margin: "0 0 6px",
                background: "linear-gradient(135deg, #f5f3ff, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Create Account</h2>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                Begin your wellness journey today
              </p>
            </div>

            {/* Form fields */}
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                  fontSize: 15, opacity: 0.4, pointerEvents: "none",
                }}>👤</span>
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: 44 }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                  fontSize: 15, opacity: 0.4, pointerEvents: "none",
                }}>✉️</span>
                <input
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: 44 }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                  fontSize: 15, opacity: 0.4, pointerEvents: "none",
                }}>🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: 44 }}
                />
              </div>

              <button type="submit" className="register-btn" style={{ marginTop: 6 }}>
                Create Account →
              </button>
            </form>

            {/* Divider */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, margin: "24px 0",
            }}>
              <div className="divider-line" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap", letterSpacing: 1 }}>
                OR CONTINUE WITH
              </span>
              <div className="divider-line" />
            </div>

            {/* Google Login */}
            <div style={{
              display: "flex", justifyContent: "center",
              padding: "4px 0",
            }}>
              <GoogleLogin
                text="signup_with"
                onSuccess={handleGoogleSignup}
                onError={() => console.log("Google signup failed")}
              />
            </div>

            {/* Footer */}
            <p style={{
              marginTop: 24, textAlign: "center",
              fontSize: 14, color: "rgba(255,255,255,0.35)",
            }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{
                  color: "#a78bfa", cursor: "pointer", fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = "#c084fc"}
                onMouseLeave={e => e.target.style.color = "#a78bfa"}
              >
                Sign in
              </span>
            </p>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
