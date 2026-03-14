



import NeuralBackground from "../components/NeuralBackground";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e)=>{
    e.preventDefault();

    try{
      const res = await axios.post(
        "http://localhost:8000/register",
        {
          username:name,
          email,
          password
        }
      );

      if(res.data.access_token){
        setToken(res.data.access_token);
        navigate("/");
      }else{
        alert("Account created. Please login.");
        navigate("/login");
      }

    }catch(err){
      console.log(err);
      alert("Registration failed");
    }
  };

  const handleGoogleSignup = async (credentialResponse)=>{
    try{
      const res = await axios.post(
        "http://localhost:8000/google-login",
        {
          token:credentialResponse.credential
        }
      );

      setToken(res.data.access_token);
      navigate("/dashboard");

    }catch(err){
      console.log(err);
      alert("Google signup failed");
    }
  };

  return (

    <div className="relative min-h-screen overflow-hidden text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.35),transparent_45%),linear-gradient(135deg,#0b0018,#05010a,#140028)]"></div>

      <div className="absolute w-[700px] h-[700px] bg-purple-600 rounded-full blur-[260px] opacity-30 top-[-250px] left-[-200px]"></div>
      <div className="absolute w-[550px] h-[550px] bg-indigo-600 rounded-full blur-[260px] opacity-25 bottom-[-200px] right-[-200px]"></div>

      <div className="relative z-10 flex min-h-screen">

        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 space-y-10 relative">

          {/* neural mesh */}
          <div className="absolute left-[12%] top-[12%] opacity-20 pointer-events-none">
            <svg width="260" height="260" viewBox="0 0 200 200">
              <circle cx="70" cy="60" r="3" fill="#a855f7"/>
              <circle cx="110" cy="50" r="3" fill="#6366f1"/>
              <circle cx="130" cy="90" r="3" fill="#a855f7"/>
              <circle cx="90" cy="120" r="3" fill="#6366f1"/>
              <circle cx="60" cy="100" r="3" fill="#a855f7"/>

              <line x1="70" y1="60" x2="110" y2="50" stroke="#a855f7"/>
              <line x1="110" y1="50" x2="130" y2="90" stroke="#6366f1"/>
              <line x1="130" y1="90" x2="90" y2="120" stroke="#a855f7"/>
              <line x1="90" y1="120" x2="60" y2="100" stroke="#6366f1"/>
              <line x1="60" y1="100" x2="70" y2="60" stroke="#a855f7"/>
            </svg>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity:0, y:-30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7 }}
            className="text-7xl font-extrabold tracking-tight
            bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#1e1b4b]
            bg-clip-text text-transparent"
            style={{
              textShadow:`
              0px 3px 0px #0f072a,
              0px 6px 12px rgba(0,0,0,0.7),
              0px 10px 25px rgba(76,29,149,0.6)
              `
            }}
          >
            MindMirror AI
          </motion.h1>

          {/* UPDATED DESCRIPTION */}
          <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.3}}
            className="text-lg max-w-xl leading-relaxed
            bg-gradient-to-r from-purple-200 via-indigo-200 to-fuchsia-200
            bg-clip-text text-transparent"
          >
            A <span className="text-purple-400 font-semibold">next-generation AI companion </span>
            that helps you <span className="text-indigo-300 font-semibold">understand emotions</span>,
            uncover hidden <span className="text-fuchsia-300 font-semibold">mental patterns</span>,
            and generate meaningful insights to support
            <span className="text-purple-300 font-semibold"> mental clarity and growth.</span>
          </motion.p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 gap-6">

            <motion.div
              whileHover={{ scale:1.06, rotateX:6, rotateY:-6 }}
              transition={{ type:"spring", stiffness:200 }}
              className="flex items-center gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_rgba(168,85,247,0.5)] transform-gpu"
            >
              <span className="text-3xl">🧠</span>
              <div>
                <h3 className="font-semibold text-lg">AI Emotion Analysis</h3>
                <p className="text-sm text-gray-400">
                  Detect emotional tone and mental state from journals.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale:1.06, rotateX:6, rotateY:-6 }}
              transition={{ type:"spring", stiffness:200 }}
              className="flex items-center gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_rgba(99,102,241,0.5)] transform-gpu"
            >
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-semibold text-lg">Mood Pattern Tracking</h3>
                <p className="text-sm text-gray-400">
                  Visualize emotional trends over time.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale:1.06, rotateX:6, rotateY:-6 }}
              transition={{ type:"spring", stiffness:200 }}
              className="flex items-center gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_rgba(147,51,234,0.5)] transform-gpu"
            >
              <span className="text-3xl">💡</span>
              <div>
                <h3 className="font-semibold text-lg">AI Wellness Insights</h3>
                <p className="text-sm text-gray-400">
                  Personalized suggestions to improve clarity.
                </p>
              </div>
            </motion.div>

          </div>
          {/* INFO BLOCKS */}
<div className="grid grid-cols-3 gap-6 pt-4">

<motion.div
  whileHover={{ scale:1.07, rotateX:6 }}
  className="bg-gradient-to-br from-white/10 to-white/5
  backdrop-blur-xl
  p-6 rounded-2xl
  border border-white/10
  text-center
  shadow-[0_20px_60px_rgba(0,0,0,0.7)]
  hover:shadow-[0_30px_80px_rgba(168,85,247,0.4)]"
>
  <h3 className="text-xl font-semibold text-purple-400">Privacy First</h3>
  <p className="text-sm text-gray-400">
    Your journals stay secure and private.
  </p>
</motion.div>

<motion.div
  whileHover={{ scale:1.07, rotateX:6 }}
  className="bg-gradient-to-br from-white/10 to-white/5
  backdrop-blur-xl
  p-6 rounded-2xl
  border border-white/10
  text-center
  shadow-[0_20px_60px_rgba(0,0,0,0.7)]
  hover:shadow-[0_30px_80px_rgba(99,102,241,0.4)]"
>
  <h3 className="text-xl font-semibold text-indigo-400">AI Powered</h3>
  <p className="text-sm text-gray-400">
    Intelligent emotional analysis.
  </p>
</motion.div>

<motion.div
  whileHover={{ scale:1.07, rotateX:6 }}
  className="bg-gradient-to-br from-white/10 to-white/5
  backdrop-blur-xl
  p-6 rounded-2xl
  border border-white/10
  text-center
  shadow-[0_20px_60px_rgba(0,0,0,0.7)]
  hover:shadow-[0_30px_80px_rgba(147,51,234,0.4)]"
>
  <h3 className="text-xl font-semibold text-purple-400">Daily Growth</h3>
  <p className="text-sm text-gray-400">
    Build healthier mental habits.
  </p>
</motion.div>

</div>

        </div>


        {/* RIGHT SIDE FORM */}
        <div className="flex flex-1 items-center justify-center px-6">

          <motion.div
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6}}
            whileHover={{ scale:1.03 }}

            onMouseMove={(e)=>{
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top

              const rotateX = -(y - rect.height/2) / 15
              const rotateY = (x - rect.width/2) / 15

              e.currentTarget.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            }}

            onMouseLeave={(e)=>{
              e.currentTarget.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg)"
            }}

            className="w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] hover:shadow-[0_35px_120px_rgba(168,85,247,0.5)] transition-all duration-200"
          >

            <h2 className="text-3xl font-semibold text-center mb-6">
              Create Account
            </h2>

            <form onSubmit={handleRegister} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Name"
                onChange={(e)=>setName(e.target.value)}
                className="p-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-purple-500"
              />

              <input
                type="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                className="p-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-purple-500"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                className="p-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-purple-500"
              />

              <button className="mt-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:scale-105 hover:shadow-[0_10px_40px_rgba(168,85,247,0.6)] transition transform p-3 rounded-lg font-semibold">
                Create Account
              </button>

            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-[1px] bg-gray-700"></div>
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-[1px] bg-gray-700"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                text="signup_with"
                onSuccess={handleGoogleSignup}
                onError={()=>console.log("Google signup failed")}
              />
            </div>

            <p className="mt-6 text-center text-gray-400">
              Already have an account?
              <span
                onClick={()=>navigate("/login")}
                className="text-purple-400 ml-2 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>

          </motion.div>

        </div>

      </div>

    </div>
  );
}