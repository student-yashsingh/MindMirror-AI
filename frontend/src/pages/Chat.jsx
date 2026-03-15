import { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";

export default function Chat(){

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(()=>{

    const saved = localStorage.getItem("mindmirror_chat");
    if(saved){
      setMessages(JSON.parse(saved));
    }

  },[]);

  useEffect(()=>{
    localStorage.setItem("mindmirror_chat", JSON.stringify(messages));
  },[messages]);

  useEffect(()=>{

    socketRef.current = new WebSocket("ws://localhost:8000/ws/chat");

    socketRef.current.onmessage = (event)=>{

      const data = JSON.parse(event.data);

      if(data.type === "message"){

        setMessages(prev => [
          ...prev,
          { role:"assistant", content:data.content }
        ]);

      }

    };

    return ()=>{
      socketRef.current.close();
    }

  },[]);

  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  const sendMessage = ()=>{

    if(!message.trim()) return;

    const userMessage = { role:"user", content:message };

    setMessages(prev => [...prev, userMessage]);

    if(socketRef.current.readyState === WebSocket.OPEN){
      socketRef.current.send(message);
    }

    setMessage("");
  };

  const clearChat = ()=>{
    localStorage.removeItem("mindmirror_chat");
    setMessages([]);
  };

  const handleKeyDown = (e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      sendMessage();
    }
  };

  return(

    <Layout>

      <div className="flex flex-col h-[80vh]">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold
          bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
          bg-clip-text text-transparent">

            AI Mental Companion

          </h1>

          <button
            onClick={clearChat}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Clear Chat
          </button>

        </div>

        <div className="flex-1 overflow-y-auto
        bg-white/5 border border-white/10
        backdrop-blur-xl
        rounded-2xl p-6 space-y-4">

          {messages.map((msg,index)=>(
            <div
              key={index}
              className={`flex ${
                msg.role==="user"
                ? "justify-end"
                : "justify-start"
              }`}
            >

              <div
                className={`max-w-[65%] p-4 rounded-xl ${
                  msg.role==="user"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "bg-white/10 text-gray-200"
                }`}
              >
                {msg.content}
              </div>

            </div>
          ))}

          <div ref={chatEndRef}></div>

        </div>

        <div className="flex gap-4 mt-4">

          <input
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your emotions..."
            className="flex-1 p-3 rounded-lg
            bg-black/40 border border-white/10
            outline-none text-white"
          />

          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-lg
            bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600"
          >
            Send
          </button>

        </div>

      </div>

    </Layout>
  );
}