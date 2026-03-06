import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import JournalCard from "../components/JournalCard";

export default function Journal(){

  const { token } = useContext(AuthContext);

  const [text,setText] = useState("");
  const [entries,setEntries] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    loadEntries();
  },[]);

  async function loadEntries(){
    try{
      const res = await axios.get(
        "http://localhost:8000/journal",
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );
      setEntries(res.data);
    }catch(err){
      console.log(err);
    }
  }

  async function createEntry(){

    if(!text.trim()) return;

    try{

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/journal/analyze",
        { text },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      setEntries([res.data,...entries]);
      setText("");

    }catch(err){
      console.log(err);
    }

    setLoading(false);
  }

  return(

    <div className="min-h-screen bg-[#05010a] text-white p-12">

      {/* HEADER */}

      <motion.h1
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        className="text-5xl font-bold mb-10
        bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
        bg-clip-text text-transparent"
      >
        Journal Reflection
      </motion.h1>


      {/* WRITE JOURNAL */}

      <div className="bg-gradient-to-br from-white/5 to-white/0
      border border-white/10
      backdrop-blur-xl
      rounded-2xl p-8 mb-12">

        <h2 className="text-xl mb-4">
          Write your thoughts
        </h2>

        <textarea
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Write what happened today..."
          className="w-full h-40 bg-black/40
          border border-white/10
          rounded-xl p-4
          outline-none
          focus:border-purple-400"
        />

        <button
          onClick={createEntry}
          className="mt-4
          bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
          px-6 py-3 rounded-lg font-semibold
          hover:scale-105 transition"
        >
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>

      </div>


      {/* JOURNAL LIST */}

      <div className="grid grid-cols-3 gap-6">

        {entries.map((entry)=>(
          <JournalCard key={entry.id} entry={entry}/>
        ))}

      </div>

    </div>

  );
}