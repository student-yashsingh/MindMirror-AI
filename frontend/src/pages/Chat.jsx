import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function Chat(){

  const { token } = useContext(AuthContext);

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

  async function sendMessage(){

    if(!message.trim()) return;

    const userMsg={
      role:"user",
      text:message
    };

    setMessages([...messages,userMsg]);
    setMessage("");

    try{

      const res = await axios.post(
        "http://localhost:8000/chat",
        { message:userMsg.text },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      const aiMsg={
        role:"ai",
        text:res.data.reply
      };

      setMessages(prev=>[...prev,aiMsg]);

    }catch(err){
      console.log(err);
    }

  }

  return(

    <div className="flex min-h-screen bg-[#05010a] text-white">

      <Sidebar/>

      <div className="flex-1 p-10 flex flex-col">

        <h1 className="text-4xl font-bold mb-8
        bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
        bg-clip-text text-transparent">
          AI Mental Companion
        </h1>

        {/* CHAT WINDOW */}

        <div className="flex-1 overflow-y-auto
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-xl p-6 mb-6">

          {messages.map((m,i)=>(

            <div
            key={i}
            className={`mb-4 flex
            ${m.role==="user" ? "justify-end":"justify-start"}`}>

              <div
              className={`max-w-md p-3 rounded-lg
              ${m.role==="user"
                ? "bg-purple-600"
                : "bg-gray-700"
              }`}>

                {m.text}

              </div>

            </div>

          ))}

        </div>

        {/* INPUT */}

        <div className="flex gap-4">

          <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Ask AI about your emotions..."
          className="flex-1 p-3 rounded-lg bg-black/40
          border border-white/10 outline-none
          focus:border-purple-400"
          />

          <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-lg
          bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
          hover:scale-105 transition">

            Send

          </button>

        </div>

      </div>

    </div>
  );
}