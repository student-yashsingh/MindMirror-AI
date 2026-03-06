import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import NeuralBackground from "../components/NeuralBackground";

export default function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:8000/login",
        new URLSearchParams({
          username: email,
          password: password
        }),
        {
          headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          }
        }
      );

      setToken(res.data.access_token);
      navigate("/dashboard");

    }catch(err){
      console.log(err);
      alert("Login failed");
    }
  };

  const handleGoogleLogin = async (credentialResponse)=>{
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
      alert("Google login failed");
    }
  };

  return(

    <div className="relative min-h-screen overflow-hidden text-white">

<NeuralBackground/>

<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.35),transparent_45%),linear-gradient(135deg,#0b0018,#05010a,#140028)]"></div>

<div className="absolute w-[700px] h-[700px] bg-purple-600 rounded-full blur-[260px] opacity-30 top-[-250px] left-[-200px]"></div>

<div className="absolute w-[550px] h-[550px] bg-indigo-600 rounded-full blur-[260px] opacity-25 bottom-[-200px] right-[-200px]"></div>
<div className="absolute w-[700px] h-[700px] bg-purple-700 blur-[300px] opacity-20 top-[-200px] left-[-200px]"></div>

<div className="absolute w-[600px] h-[600px] bg-indigo-700 blur-[300px] opacity-18 bottom-[-200px] right-[-200px]"></div>
      <div className="relative z-10 flex min-h-screen">

        {/* LOGIN CARD */}
        <div className="flex w-1/2 items-center justify-center px-10">

          <motion.div
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6}}

            whileHover={{scale:1.02}}

            onMouseMove={(e)=>{
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top

              const rotateX = -(y - rect.height/2) / 18
              const rotateY = (x - rect.width/2) / 18

              e.currentTarget.style.transform =
              `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            }}

            onMouseLeave={(e)=>{
              e.currentTarget.style.transform =
              "perspective(900px) rotateX(0deg) rotateY(0deg)"
            }}

            className="w-full max-w-md
            bg-gradient-to-br from-white/10 to-white/5
            backdrop-blur-xl
            border border-white/10
            p-10 rounded-2xl
            shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
          >

            <h2 className="text-3xl font-bold text-center mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-400 text-center mb-6 text-sm">
              Continue exploring your AI-powered emotional insights
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">

              <input
                type="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                className="p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-purple-500 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                className="p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-purple-500 outline-none"
              />

              <button
                className="mt-2
                bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
                hover:scale-105
                hover:shadow-[0_10px_40px_rgba(168,85,247,0.6)]
                transition
                p-3 rounded-lg font-semibold"
              >
                Login
              </button>

            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-[1px] bg-gray-700"></div>
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-[1px] bg-gray-700"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={()=>console.log("Google login failed")}
              />
            </div>

            <p className="mt-6 text-center text-gray-400">
              Don't have an account?
              <span
                onClick={()=>navigate("/register")}
                className="text-purple-400 ml-2 cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>

          </motion.div>

        </div>


        {/* RIGHT CONTENT */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 space-y-10">

          <motion.h1
            initial={{opacity:0,y:-30}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.7}}
            className="text-7xl font-extrabold
            bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
            bg-clip-text text-transparent
            drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]"
          >
            MindMirror AI
          </motion.h1>

          <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
            An intelligent reflection system that transforms your thoughts
            into actionable emotional insights using advanced AI analysis.
          </p>

          <div className="grid grid-cols-2 gap-6">

            <motion.div
              whileHover={{scale:1.05}}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10"
            >
              <h3 className="text-purple-400 font-semibold mb-2">
                Emotion Detection
              </h3>
              <p className="text-sm text-gray-400">
                Identify emotional signals hidden in your daily reflections.
              </p>
            </motion.div>

            <motion.div
              whileHover={{scale:1.05}}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10"
            >
              <h3 className="text-indigo-400 font-semibold mb-2">
                Pattern Insights
              </h3>
              <p className="text-sm text-gray-400">
                Discover recurring emotional patterns using AI.
              </p>
            </motion.div>

            <motion.div
              whileHover={{scale:1.05}}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10"
            >
              <h3 className="text-fuchsia-400 font-semibold mb-2">
                AI Guidance
              </h3>
              <p className="text-sm text-gray-400">
                Receive personalized suggestions for mental clarity.
              </p>
            </motion.div>

            <motion.div
              whileHover={{scale:1.05}}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10"
            >
              <h3 className="text-purple-400 font-semibold mb-2">
                Privacy First
              </h3>
              <p className="text-sm text-gray-400">
                Your thoughts remain secure and completely private.
              </p>
            </motion.div>

          </div>

        </div>

      </div>

    </div>
  );
}