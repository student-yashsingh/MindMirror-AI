import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function Chat(){

  const { token } = useContext(AuthContext);

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);
  const [loading,setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  async function sendMessage(){

    if(!message.trim()) return;

    const userMsg={
      role:"user",
      text:message
    };

    setMessages(prev=>[...prev,userMsg]);
    setMessage("");
    setLoading(true);

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

    setLoading(false);
  }

  return(

    <Layout>

      <div className="flex flex-col h-[85vh]">

        <h1 className="text-4xl font-bold mb-6
        bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
        bg-clip-text text-transparent">
          AI Mental Companion
        </h1>


        {/* CHAT WINDOW */}

        <div className="flex-1 overflow-y-auto
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-2xl p-6 mb-6 shadow-[0_10px_50px_rgba(0,0,0,0.6)]">

          {messages.length===0 && (

            <div className="text-center text-gray-500 mt-24">
              Start a conversation with your AI emotional assistant.
            </div>

          )}

          {messages.map((m,i)=>(

            <div
            key={i}
            className={`mb-5 flex
            ${m.role==="user" ? "justify-end":"justify-start"}`}>

              <div
              className={`max-w-md px-4 py-3 rounded-2xl text-sm
              shadow-lg
              ${m.role==="user"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                : "bg-gray-800 border border-white/10"
              }`}>

                {m.text}

              </div>

            </div>

          ))}

          {loading && (
            <div className="text-gray-400 text-sm">
              AI is typing...
            </div>
          )}

          <div ref={chatEndRef}></div>

        </div>



        {/* INPUT */}

        <div className="flex gap-4">

          <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
          placeholder="Ask about your emotions..."
          className="flex-1 p-4 rounded-xl bg-black/40
          border border-white/10 outline-none
          focus:border-purple-400"
          />

          <button
          onClick={sendMessage}
          className="px-7 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
          hover:scale-105 transition shadow-lg">

            Send

          </button>

        </div>

      </div>

    </Layout>

  );
}