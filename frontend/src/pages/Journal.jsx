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

//   async function submitJournal(){

//     if(!title || !content) return;

//     try{

//       await axios.post(
//         "http://localhost:8000/journal",
//         {
//           title: title,
//           content: content
//         },
//         {
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         }
//       );

//       setTitle("");
//       setContent("");

//       loadHistory();

//     }catch(err){
//       console.log(err);
//     }
//   }

//   async function loadHistory(){

//     try{

//       const res = await axios.get(
//         "http://localhost:8000/journal/history",
//         {
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         }
//       );

//       setHistory(res.data.journals);

//     }catch(err){
//       console.log(err);
//     }
//   }

//   useEffect(()=>{
//     loadHistory();
//   },[]);

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

//       <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl mb-12">

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
//         className="px-6 py-3 rounded-lg
//         bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
//         hover:scale-105 transition"
//         >
//           Save Journal
//         </button>

//       </div>


//       {/* JOURNAL HISTORY */}

//       <div className="space-y-6">

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

//             <div className="flex gap-6 text-sm text-gray-400">

//               <span>
//                 Emotion: {j.emotion}
//               </span>

//               <span>
//                 Confidence: {j.confidence?.toFixed(2)}
//               </span>

//               <span>
//                 {new Date(j.created_at).toLocaleDateString()}
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
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

export default function Journal(){

  const { token } = useContext(AuthContext);

  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [history,setHistory] = useState([]);
  const [analysis,setAnalysis] = useState(null);
  const [advice,setAdvice] = useState(null);
  const [loading,setLoading] = useState(false);


  async function submitJournal(){

    if(!title.trim() || !content.trim()) return;

    try{

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/journal",
        {
          title:title,
          content:content
        },
        {
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        }
      );

      setAnalysis(res.data);

      setTitle("");
      setContent("");

      await loadHistory();
      await loadAdvice();

    }catch(err){
      console.log("Save error:",err.response?.data || err.message);
    }finally{
      setLoading(false);
    }

  }


  async function loadHistory(){

    if(!token) return;

    try{

      const res = await axios.get(
        "http://localhost:8000/journal/history",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setHistory(res.data?.journals || []);

    }catch(err){
      console.log("History error:",err.response?.data || err.message);
    }
  }


  async function loadAdvice(){

    if(!token) return;

    try{

      const res = await axios.get(
        "http://localhost:8000/journal/advice",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setAdvice(res.data);

    }catch(err){
      console.log("Advice error:",err.response?.data || err.message);
    }

  }


  useEffect(()=>{
    if(token){
      loadHistory();
      loadAdvice();
    }
  },[token]);


  return(

    <Layout>

      <motion.h1
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        className="text-5xl font-bold mb-10
        bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
        bg-clip-text text-transparent"
      >
        Emotional Journal
      </motion.h1>



      {/* JOURNAL INPUT */}

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl mb-10">

        <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Journal Title"
        className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/10 outline-none"
        />

        <textarea
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        placeholder="Write about your thoughts or emotions..."
        rows={5}
        className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/10 outline-none"
        />

        <button
        onClick={submitJournal}
        disabled={loading}
        className="px-6 py-3 rounded-lg
        bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
        hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Journal"}
        </button>

      </div>



      {/* AI EMOTION RESULT */}

      {analysis && (

      <motion.div
      initial={{opacity:0,y:10}}
      animate={{opacity:1,y:0}}
      className="bg-white/5 border border-purple-500/20 backdrop-blur-xl
      p-6 rounded-2xl mb-10"
      >

        <h2 className="text-xl font-semibold mb-4
        bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
        bg-clip-text text-transparent">
        AI Emotion Analysis
        </h2>

        <div className="grid grid-cols-2 gap-6 text-sm">

          <div>
            <p className="text-gray-400">Emotion</p>
            <p className="text-lg">{analysis.emotion}</p>
          </div>

          <div>
            <p className="text-gray-400">Confidence</p>
            <p>{analysis.confidence?.toFixed(2)}</p>
          </div>

          <div>
            <p className="text-gray-400">Valence</p>
            <p>{analysis.valence}</p>
          </div>

          <div>
            <p className="text-gray-400">Intensity</p>
            <p>{analysis.intensity}</p>
          </div>

          <div>
            <p className="text-gray-400">Energy Level</p>
            <p>{analysis.energy_level}</p>
          </div>

        </div>

      </motion.div>

      )}



      {/* AI ADVICE */}

      {advice && advice.ai_advice && (

      <motion.div
      initial={{opacity:0,y:10}}
      animate={{opacity:1,y:0}}
      className="bg-white/5 border border-indigo-500/20 backdrop-blur-xl
      p-6 rounded-2xl mb-12"
      >

        <h2 className="text-xl font-semibold mb-3
        bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400
        bg-clip-text text-transparent">
        AI Mental Health Advice
        </h2>

        <p className="text-gray-300 leading-relaxed">
{typeof advice.ai_advice === "string"
  ? advice.ai_advice
  : JSON.stringify(advice.ai_advice)}
</p>

      </motion.div>

      )}



      {/* JOURNAL HISTORY */}

      <div className="space-y-6">

        {history.length === 0 && (
          <p className="text-gray-400">
            No journal entries yet.
          </p>
        )}

        {history.map((j,i)=>(
          <motion.div
          key={i}
          whileHover={{scale:1.02}}
          className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl"
          >

            <h3 className="text-xl font-semibold mb-2">
              {j.title}
            </h3>

            <p className="text-gray-400 mb-3">
              {j.content}
            </p>

            <div className="flex gap-6 text-sm text-gray-400 flex-wrap">

              <span>
                Emotion: {j.emotion}
              </span>

              <span>
                Confidence: {j.confidence?.toFixed(2)}
              </span>

              <span>
                {j.created_at
                  ? new Date(j.created_at).toLocaleDateString()
                  : ""}
              </span>

            </div>

          </motion.div>
        ))}

      </div>

    </Layout>

  );
}