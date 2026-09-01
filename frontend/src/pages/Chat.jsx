// import { useState, useRef, useEffect } from "react";
// import Layout from "../components/Layout";

// export default function Chat(){

//   const [message,setMessage] = useState("");
//   const [messages,setMessages] = useState([]);

//   const socketRef = useRef(null);
//   const chatEndRef = useRef(null);

//   useEffect(()=>{

//     const saved = localStorage.getItem("mindmirror_chat");
//     if(saved){
//       setMessages(JSON.parse(saved));
//     }

//   },[]);

//   useEffect(()=>{
//     localStorage.setItem("mindmirror_chat", JSON.stringify(messages));
//   },[messages]);

//   useEffect(()=>{

//     socketRef.current = new WebSocket("ws://localhost:8000/ws/chat");

//     socketRef.current.onmessage = (event)=>{

//       const data = JSON.parse(event.data);

//       if(data.type === "message"){

//         setMessages(prev => [
//           ...prev,
//           { role:"assistant", content:data.content }
//         ]);

//       }

//     };

//     return ()=>{
//       socketRef.current.close();
//     }

//   },[]);

//   useEffect(()=>{
//     chatEndRef.current?.scrollIntoView({behavior:"smooth"});
//   },[messages]);

//   const sendMessage = ()=>{

//     if(!message.trim()) return;

//     const userMessage = { role:"user", content:message };

//     setMessages(prev => [...prev, userMessage]);

//     if(socketRef.current.readyState === WebSocket.OPEN){
//       socketRef.current.send(message);
//     }

//     setMessage("");
//   };

//   const clearChat = ()=>{
//     localStorage.removeItem("mindmirror_chat");
//     setMessages([]);
//   };

//   const handleKeyDown = (e)=>{
//     if(e.key==="Enter"){
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return(

//     <Layout>

//       <div className="flex flex-col h-[80vh]">

//         <div className="flex justify-between items-center mb-6">

//           <h1 className="text-4xl font-bold
//           bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
//           bg-clip-text text-transparent">

//             AI Mental Companion

//           </h1>

//           <button
//             onClick={clearChat}
//             className="px-4 py-2 rounded-lg bg-red-500 text-white"
//           >
//             Clear Chat
//           </button>

//         </div>

//         <div className="flex-1 overflow-y-auto
//         bg-white/5 border border-white/10
//         backdrop-blur-xl
//         rounded-2xl p-6 space-y-4">

//           {messages.map((msg,index)=>(
//             <div
//               key={index}
//               className={`flex ${
//                 msg.role==="user"
//                 ? "justify-end"
//                 : "justify-start"
//               }`}
//             >

//               <div
//                 className={`max-w-[65%] p-4 rounded-xl ${
//                   msg.role==="user"
//                   ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
//                   : "bg-white/10 text-gray-200"
//                 }`}
//               >
//                 {msg.content}
//               </div>

//             </div>
//           ))}

//           <div ref={chatEndRef}></div>

//         </div>

//         <div className="flex gap-4 mt-4">

//           <input
//             value={message}
//             onChange={(e)=>setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask about your emotions..."
//             className="flex-1 p-3 rounded-lg
//             bg-black/40 border border-white/10
//             outline-none text-white"
//           />

//           <button
//             onClick={sendMessage}
//             className="px-6 py-3 rounded-lg
//             bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600"
//           >
//             Send
//           </button>

//         </div>

//       </div>

//     </Layout>
//   );
// }


import { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("mindmirror_chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("mindmirror_chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    let ws;
    let reconnectTimer;
    let destroyed = false;

    function connect() {
      const token = localStorage.getItem("token");
      const wsBase = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000")
        .replace(/^http/, "ws");
      ws = new WebSocket(`${wsBase}/ws/chat?token=${token}`);
      socketRef.current = ws;

      ws.onopen = () => {
        if (!destroyed) setIsConnected(true);
      };

      ws.onclose = () => {
        if (!destroyed) {
          setIsConnected(false);
          // Auto-reconnect after 3 seconds
          reconnectTimer = setTimeout(() => {
            if (!destroyed) connect();
          }, 3000);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        ws.close();
      };

      ws.onmessage = (event) => {
        if (destroyed) return;
        try {
          const data = JSON.parse(event.data);
          if (data.type === "message") {
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: data.content },
            ]);
          }
        } catch (e) {
          console.error("Failed to parse message:", e);
        }
      };
    }

    connect();

    return () => {
      destroyed = true;
      clearTimeout(reconnectTimer);
      if (ws) ws.close();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!message.trim()) return;

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      alert("Not connected to server. Please wait and try again.");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    socketRef.current.send(message);
    setIsTyping(true);
    setMessage("");
    inputRef.current?.focus();
  };

  const clearChat = () => {
    localStorage.removeItem("mindmirror_chat");
    setMessages([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); sendMessage(); }
  };

  const quickPrompts = [
    "I'm feeling overwhelmed today",
    "Help me manage my anxiety",
    "I need some motivation",
    "I'm struggling to focus",
  ];

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

        * { box-sizing: border-box; }
        .chat-page { font-family: 'DM Sans', sans-serif; }

        @keyframes pulse-glow  { 0%,100%{opacity:0.3} 50%{opacity:0.65} }
        @keyframes shimmer     { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes typing-dot  { 0%,80%,100%{transform:scale(0.6);opacity:0.3} 40%{transform:scale(1);opacity:1} }
        @keyframes blink-ring  { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.5)} 50%{box-shadow:0 0 0 5px rgba(74,222,128,0)} }
        @keyframes fade-up     { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes msg-pop-r   { from{opacity:0;transform:translateX(16px) scale(0.96)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes msg-pop-l   { from{opacity:0;transform:translateX(-16px) scale(0.96)} to{opacity:1;transform:translateX(0) scale(1)} }

        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.25); border-radius: 100px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.45); }

        .glass-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
          backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 22px;
          box-shadow: 0 16px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .msg-user {
          background: linear-gradient(135deg, #7c3aed, #6d28d9, #4f46e5);
          border-radius: 20px 20px 4px 20px;
          padding: 12px 18px;
          font-size: 14px; line-height: 1.7;
          color: rgba(255,255,255,0.92);
          box-shadow: 0 8px 24px rgba(124,58,237,0.4);
          animation: msg-pop-r 0.3s ease forwards;
          max-width: 65%;
          position: relative; overflow: hidden;
        }

        .msg-user::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          pointer-events: none;
        }

        .msg-ai {
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px 20px 20px 4px;
          padding: 12px 18px;
          font-size: 14px; line-height: 1.8;
          color: rgba(220,215,255,0.82);
          animation: msg-pop-l 0.3s ease forwards;
          max-width: 70%;
          backdrop-filter: blur(12px);
        }

        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(168,85,247,0.7);
          animation: typing-dot 1.2s infinite ease-in-out;
          display: inline-block;
        }

        .send-btn {
          width: 48px; height: 48px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          cursor: pointer; font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, box-shadow 0.3s;
          flex-shrink: 0; position: relative; overflow: hidden;
        }

        .send-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 30px rgba(124,58,237,0.6);
        }

        .send-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%);
        }

        .send-btn:hover::after { animation: shimmer 0.55s ease forwards; }

        .chat-input {
          flex: 1; padding: 13px 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; outline: none;
          color: white; font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }

        .chat-input::placeholder { color: rgba(255,255,255,0.28); }

        .chat-input:focus {
          border-color: rgba(168,85,247,0.55);
          background: rgba(168,85,247,0.06);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.12);
        }

        .clear-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 12px; border: none; cursor: pointer;
          font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          color: #fca5a5;
          transition: background 0.25s, border-color 0.25s, transform 0.2s;
        }

        .clear-btn:hover {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.4);
          transform: translateY(-1px);
        }

        .quick-chip {
          padding: 7px 14px; border-radius: 100px;
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(124,58,237,0.25);
          color: rgba(196,181,253,0.8); font-size: 12px;
          cursor: pointer; white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .quick-chip:hover {
          background: rgba(124,58,237,0.22);
          border-color: rgba(124,58,237,0.45);
          transform: translateY(-1px);
          color: #e9d5ff;
        }
      `}</style>

      <div className="chat-page" style={{ display: "flex", flexDirection: "column", height: "82vh" }}>

        {/* Ambient blob */}
        <div style={{
          position: "absolute", width: 450, height: 450,
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          top: -80, right: -80, borderRadius: "50%", pointerEvents: "none",
          animation: "pulse-glow 5s ease-in-out infinite", zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", gap: 16 }}>

          {/* ===== HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}
          >
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(124,58,237,0.18)",
                border: "1px solid rgba(124,58,237,0.35)",
                borderRadius: 100, padding: "4px 12px",
                fontSize: 11, color: "#c084fc", fontWeight: 500,
                letterSpacing: "0.5px", marginBottom: 8,
              }}>
                <span style={{
                  width: 6, height: 6, background: isConnected ? "#4ade80" : "#f87171",
                  borderRadius: "50%",
                  animation: isConnected ? "blink-ring 2s infinite" : "none",
                }} />
                {isConnected ? "Connected" : "Disconnected"}
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 800, margin: 0,
                background: "linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 40%, #c4b5fd 70%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 20px rgba(168,85,247,0.3))",
              }}>
                AI Mental Companion
              </h1>
            </div>

            <button className="clear-btn" onClick={clearChat}>
              🗑️ Clear Chat
            </button>
          </motion.div>

          {/* ===== CHAT WINDOW ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-card chat-scroll"
            style={{
              flex: 1, overflowY: "auto",
              padding: "24px 24px",
              display: "flex", flexDirection: "column", gap: 16,
              minHeight: 0,
            }}
          >
            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 24, right: 24, height: 2,
              background: "linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)",
              borderRadius: 100,
            }} />

            {/* Empty state */}
            {messages.length === 0 && (
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 16, padding: "32px 0",
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(79,70,229,0.2))",
                  border: "1px solid rgba(124,58,237,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32,
                }}>🧠</div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                    Your AI companion is ready
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.28)" }}>
                    Share how you're feeling — no judgment, just support
                  </p>
                </div>

                {/* Quick prompts */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 8 }}>
                  {quickPrompts.map((q, i) => (
                    <button
                      key={i}
                      className="quick-chip"
                      onClick={() => { setMessage(q); inputRef.current?.focus(); }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: 10,
                }}
              >
                {/* AI avatar */}
                {msg.role === "assistant" && (
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(79,70,229,0.3))",
                    border: "1px solid rgba(124,58,237,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14,
                  }}>🧠</div>
                )}

                <div className={msg.role === "user" ? "msg-user" : "msg-ai"}>
                  {msg.content}
                </div>

                {/* User avatar */}
                {msg.role === "user" && (
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "white",
                  }}>U</div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  style={{ display: "flex", alignItems: "flex-end", gap: 10 }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(79,70,229,0.3))",
                    border: "1px solid rgba(124,58,237,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, flexShrink: 0,
                  }}>🧠</div>
                  <div style={{
                    padding: "14px 18px",
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "20px 20px 20px 4px",
                    display: "flex", gap: 5, alignItems: "center",
                  }}>
                    {[0, 0.18, 0.36].map((delay, i) => (
                      <span key={i} className="typing-dot" style={{ animationDelay: `${delay}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </motion.div>

          {/* ===== INPUT BAR ===== */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ flexShrink: 0 }}
          >
            {/* Quick prompts (shown when there are messages) */}
            {messages.length > 0 && (
              <div style={{
                display: "flex", gap: 8, marginBottom: 10,
                overflowX: "auto", paddingBottom: 2,
              }}>
                {quickPrompts.map((q, i) => (
                  <button
                    key={i}
                    className="quick-chip"
                    onClick={() => { setMessage(q); inputRef.current?.focus(); }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div style={{
              display: "flex", gap: 10, alignItems: "center",
              padding: "12px 14px",
              background: "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 18,
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}>
              <input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share how you're feeling..."
                className="chat-input"
              />

              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={!message.trim()}
                style={{ opacity: message.trim() ? 1 : 0.45 }}
                title="Send message"
              >
                ➤
              </button>
            </div>

            <p style={{
              margin: "8px 0 0", textAlign: "center",
              fontSize: 11, color: "rgba(255,255,255,0.2)",
            }}>
              Press Enter to send · Your conversations are private
            </p>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
}
