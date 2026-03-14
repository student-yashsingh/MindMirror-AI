// import { useState, useContext, useRef, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import Layout from "../components/Layout";

// export default function Chat(){

//   const { token } = useContext(AuthContext);

//   const [message,setMessage] = useState("");
//   const [messages,setMessages] = useState([]);
//   const [loading,setLoading] = useState(false);

//   const chatEndRef = useRef(null);

//   useEffect(()=>{
//     chatEndRef.current?.scrollIntoView({behavior:"smooth"});
//   },[messages]);

//   async function sendMessage(){

//     if(!message.trim()) return;

//     const userMsg={
//       role:"user",
//       text:message
//     };

//     setMessages(prev=>[...prev,userMsg]);
//     setMessage("");
//     setLoading(true);

//     try{

//       const res = await axios.post(
//         "http://localhost:8000/chat",
//         { message:userMsg.text },
//         {
//           headers:{ Authorization:`Bearer ${token}` }
//         }
//       );

//       const aiMsg={
//         role:"ai",
//         text:res.data.reply
//       };

//       setMessages(prev=>[...prev,aiMsg]);

//     }catch(err){
//       console.log(err);
//     }

//     setLoading(false);
//   }

//   return(

//     <Layout>

//       <div className="flex flex-col h-[85vh]">

//         <h1 className="text-4xl font-bold mb-6
//         bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
//         bg-clip-text text-transparent">
//           AI Mental Companion
//         </h1>


//         {/* CHAT WINDOW */}

//         <div className="flex-1 overflow-y-auto
//         bg-white/5 backdrop-blur-xl border border-white/10
//         rounded-2xl p-6 mb-6 shadow-[0_10px_50px_rgba(0,0,0,0.6)]">

//           {messages.length===0 && (

//             <div className="text-center text-gray-500 mt-24">
//               Start a conversation with your AI emotional assistant.
//             </div>

//           )}

//           {messages.map((m,i)=>(

//             <div
//             key={i}
//             className={`mb-5 flex
//             ${m.role==="user" ? "justify-end":"justify-start"}`}>

//               <div
//               className={`max-w-md px-4 py-3 rounded-2xl text-sm
//               shadow-lg
//               ${m.role==="user"
//                 ? "bg-gradient-to-r from-purple-600 to-indigo-600"
//                 : "bg-gray-800 border border-white/10"
//               }`}>

//                 {m.text}

//               </div>

//             </div>

//           ))}

//           {loading && (
//             <div className="text-gray-400 text-sm">
//               AI is typing...
//             </div>
//           )}

//           <div ref={chatEndRef}></div>

//         </div>



//         {/* INPUT */}

//         <div className="flex gap-4">

//           <input
//           value={message}
//           onChange={(e)=>setMessage(e.target.value)}
//           onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
//           placeholder="Ask about your emotions..."
//           className="flex-1 p-4 rounded-xl bg-black/40
//           border border-white/10 outline-none
//           focus:border-purple-400"
//           />

//           <button
//           onClick={sendMessage}
//           className="px-7 py-3 rounded-xl font-semibold
//           bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
//           hover:scale-105 transition shadow-lg">

//             Send

//           </button>

//         </div>

//       </div>

//     </Layout>

//   );
// }




import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

export default function Chat(){

  const { token } = useContext(AuthContext);

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);
  const [loading,setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  const sendMessage = async ()=>{

    if(!message.trim()) return;

    const userMessage = {
      role:"user",
      content:message
    };

    setMessages(prev=>[...prev,userMessage]);
    setMessage("");
    setLoading(true);

    try{

      const res = await axios.post(
        "http://localhost:8000/chat",
        {message: userMessage.content},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const aiMessage = {
        role:"assistant",
        content:res.data.reply
      };

      setMessages(prev=>[...prev,aiMessage]);

    }catch(err){

      console.log(err);

      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:"AI response failed. Please try again."
        }
      ]);

    }

    setLoading(false);
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

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-6
        bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
        bg-clip-text text-transparent">

          AI Mental Companion

        </h1>

        {/* CHAT BOX */}
        <div className="flex-1 overflow-y-auto
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-6 space-y-4">

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
                  ?
                  "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  :
                  "bg-white/10 text-gray-200"
                }`}
              >
                {msg.content}
              </div>

            </div>

          ))}

          {loading && (

            <div className="bg-white/10 p-3 rounded-lg w-fit">
              AI is typing...
            </div>

          )}

          <div ref={chatEndRef}></div>

        </div>

        {/* INPUT AREA */}
        <div className="flex gap-4 mt-4">

          <input
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your emotions..."
            className="flex-1 p-3
            rounded-lg
            bg-black/40
            border border-white/10
            outline-none"
          />

          <button
            onClick={sendMessage}
            className="px-6 py-3
            rounded-lg
            bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
            hover:scale-105 transition"
          >
            Send
          </button>

        </div>

      </div>

    </Layout>

  );
}