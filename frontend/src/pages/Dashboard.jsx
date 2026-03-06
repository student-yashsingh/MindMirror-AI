// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { motion } from "framer-motion";

// export default function Dashboard() {

//   const { token } = useContext(AuthContext);
//   const [data,setData] = useState(null);

//   useEffect(()=>{

//     async function loadData(){
//       try{
//         const res = await axios.get(
//           "http://localhost:8000/journal/dashboard-summary",
//           {
//             headers:{ Authorization:`Bearer ${token}` }
//           }
//         );
//         setData(res.data);
//       }catch(err){
//         console.log(err);
//       }
//     }

//     loadData();

//   },[token]);

//   if(!data){
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-[#05010a]">
//         Loading dashboard...
//       </div>
//     );
//   }

//   return (

//     <div className="min-h-screen bg-[#05010a] text-white p-12">

//       {/* HEADER */}

//       <motion.div
//         initial={{opacity:0,y:-20}}
//         animate={{opacity:1,y:0}}
//         className="mb-12"
//       >
//         <h1 className="text-5xl font-bold
//         bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
//         bg-clip-text text-transparent">
//           MindMirror AI Dashboard
//         </h1>

//         <p className="text-gray-400 mt-2">
//           AI-powered insights about your emotional patterns
//         </p>
//       </motion.div>


//       {/* STATS */}

//       <div className="grid grid-cols-3 gap-8 mb-12">

//         <motion.div
//         whileHover={{scale:1.05}}
//         className="bg-gradient-to-br from-purple-900/20 to-black/40
//         border border-purple-500/20 backdrop-blur-xl
//         p-8 rounded-2xl shadow-[0_10px_40px_rgba(168,85,247,0.25)]">

//           <p className="text-purple-400 text-sm">
//             Total Journals
//           </p>

//           <h2 className="text-4xl font-bold mt-1">
//             {data.total_entries}
//           </h2>

//         </motion.div>


//         <motion.div
//         whileHover={{scale:1.05}}
//         className="bg-gradient-to-br from-indigo-900/20 to-black/40
//         border border-indigo-500/20 backdrop-blur-xl
//         p-8 rounded-2xl shadow-[0_10px_40px_rgba(99,102,241,0.25)]">

//           <p className="text-indigo-400 text-sm">
//             Risk Level
//           </p>

//           <h2 className="text-3xl font-semibold mt-1">
//             {data.risk?.level}
//           </h2>

//         </motion.div>


//         <motion.div
//         whileHover={{scale:1.05}}
//         className="bg-gradient-to-br from-fuchsia-900/20 to-black/40
//         border border-fuchsia-500/20 backdrop-blur-xl
//         p-8 rounded-2xl shadow-[0_10px_40px_rgba(217,70,239,0.25)]">

//           <p className="text-fuchsia-400 text-sm">
//             Risk Score
//           </p>

//           <h2 className="text-3xl font-semibold mt-1">
//             {data.risk?.score}
//           </h2>

//         </motion.div>

//       </div>


//       {/* EMOTION DISTRIBUTION */}

//       <div className="bg-gradient-to-br from-white/5 to-white/0
//       border border-white/10 backdrop-blur-xl
//       p-10 rounded-2xl mb-12">

//         <h2 className="text-2xl font-semibold mb-6">
//           Emotion Distribution
//         </h2>

//         <div className="grid grid-cols-4 gap-6">

//           {Object.entries(data.emotion_distribution).map(([emotion,value])=>{

//             const colors={
//               happy:"text-green-400",
//               sad:"text-blue-400",
//               stressed:"text-red-400",
//               neutral:"text-gray-400"
//             };

//             return(

//               <motion.div
//               key={emotion}
//               whileHover={{scale:1.07}}
//               className="bg-black/40
//               border border-white/10
//               p-6 rounded-xl
//               hover:border-purple-400/40
//               transition">

//                 <p className={`capitalize text-sm ${colors[emotion]}`}>
//                   {emotion}
//                 </p>

//                 <p className="text-3xl font-semibold mt-1">
//                   {value}
//                 </p>

//               </motion.div>

//             );

//           })}

//         </div>

//       </div>


//       {/* METRICS */}

//       <div className="bg-gradient-to-br from-white/5 to-white/0
//       border border-white/10 backdrop-blur-xl
//       p-10 rounded-2xl">

//         <h2 className="text-2xl font-semibold mb-6">
//           Average Emotional Metrics
//         </h2>

//         <div className="grid grid-cols-2 gap-6">

//           {Object.entries(data.averages).map(([metric,value])=>(

//             <motion.div
//             key={metric}
//             whileHover={{scale:1.07}}
//             className="bg-black/40 border border-white/10
//             p-6 rounded-xl hover:border-indigo-400/40 transition">

//               <p className="text-gray-400 text-sm capitalize">
//                 {metric}
//               </p>

//               <p className="text-3xl font-semibold mt-1">
//                 {value.toFixed(2)}
//               </p>

//             </motion.div>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }




import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

  const { token } = useContext(AuthContext);
  const [data,setData] = useState(null);

  useEffect(()=>{

    async function loadData(){
      try{
        const res = await axios.get(
          "http://localhost:8000/journal/dashboard-summary",
          {
            headers:{ Authorization:`Bearer ${token}` }
          }
        );
        setData(res.data);
      }catch(err){
        console.log(err);
      }
    }

    loadData();

  },[token]);

  if(!data){
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#05010a]">
        Loading dashboard...
      </div>
    );
  }

  return (

    <div className="flex min-h-screen bg-[#05010a] text-white">

      {/* SIDEBAR */}
      <Sidebar/>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-12">

        {/* HEADER */}

        <motion.div
          initial={{opacity:0,y:-20}}
          animate={{opacity:1,y:0}}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold
          bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
          bg-clip-text text-transparent">
            MindMirror AI Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            AI-powered insights about your emotional patterns
          </p>
        </motion.div>


        {/* STATS */}

        <div className="grid grid-cols-3 gap-8 mb-12">

          <motion.div
          whileHover={{scale:1.05}}
          className="bg-gradient-to-br from-purple-900/20 to-black/40
          border border-purple-500/20 backdrop-blur-xl
          p-8 rounded-2xl shadow-[0_10px_40px_rgba(168,85,247,0.25)]">

            <p className="text-purple-400 text-sm">
              Total Journals
            </p>

            <h2 className="text-4xl font-bold mt-1">
              {data.total_entries}
            </h2>

          </motion.div>


          <motion.div
          whileHover={{scale:1.05}}
          className="bg-gradient-to-br from-indigo-900/20 to-black/40
          border border-indigo-500/20 backdrop-blur-xl
          p-8 rounded-2xl shadow-[0_10px_40px_rgba(99,102,241,0.25)]">

            <p className="text-indigo-400 text-sm">
              Risk Level
            </p>

            <h2 className="text-3xl font-semibold mt-1">
              {data.risk?.level}
            </h2>

          </motion.div>


          <motion.div
          whileHover={{scale:1.05}}
          className="bg-gradient-to-br from-fuchsia-900/20 to-black/40
          border border-fuchsia-500/20 backdrop-blur-xl
          p-8 rounded-2xl shadow-[0_10px_40px_rgba(217,70,239,0.25)]">

            <p className="text-fuchsia-400 text-sm">
              Risk Score
            </p>

            <h2 className="text-3xl font-semibold mt-1">
              {data.risk?.score}
            </h2>

          </motion.div>

        </div>


        {/* EMOTION DISTRIBUTION */}

        <div className="bg-gradient-to-br from-white/5 to-white/0
        border border-white/10 backdrop-blur-xl
        p-10 rounded-2xl mb-12">

          <h2 className="text-2xl font-semibold mb-6">
            Emotion Distribution
          </h2>

          <div className="grid grid-cols-4 gap-6">

            {Object.entries(data.emotion_distribution).map(([emotion,value])=>{

              const colors={
                happy:"text-green-400",
                sad:"text-blue-400",
                stressed:"text-red-400",
                neutral:"text-gray-400"
              };

              return(

                <motion.div
                key={emotion}
                whileHover={{scale:1.07}}
                className="bg-black/40
                border border-white/10
                p-6 rounded-xl
                hover:border-purple-400/40
                transition">

                  <p className={`capitalize text-sm ${colors[emotion]}`}>
                    {emotion}
                  </p>

                  <p className="text-3xl font-semibold mt-1">
                    {value}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>


        {/* METRICS */}

        <div className="bg-gradient-to-br from-white/5 to-white/0
        border border-white/10 backdrop-blur-xl
        p-10 rounded-2xl">

          <h2 className="text-2xl font-semibold mb-6">
            Average Emotional Metrics
          </h2>

          <div className="grid grid-cols-2 gap-6">

            {Object.entries(data.averages).map(([metric,value])=>(

              <motion.div
              key={metric}
              whileHover={{scale:1.07}}
              className="bg-black/40 border border-white/10
              p-6 rounded-xl hover:border-indigo-400/40 transition">

                <p className="text-gray-400 text-sm capitalize">
                  {metric}
                </p>

                <p className="text-3xl font-semibold mt-1">
                  {value.toFixed(2)}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}