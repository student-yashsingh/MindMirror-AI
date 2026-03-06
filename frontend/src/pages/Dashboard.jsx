// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { motion } from "framer-motion";
// import Layout from "../components/Layout";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend
// } from "recharts";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid
// } from "recharts";
// const COLORS = [
//   "#a855f7", // purple
//   "#6366f1", // indigo
//   "#ec4899", // pink
//   "#22d3ee", // cyan
//   "#facc15", // yellow
// ];

// export default function Dashboard(){

//   const { token } = useContext(AuthContext);
//   const [data,setData] = useState(null);

//   useEffect(()=>{

//     async function loadData(){
//       try{

//         const res = await axios.get(
//           "http://localhost:8000/journal/dashboard-summary",
//           {
//             headers:{
//               Authorization:`Bearer ${token}`
//             }
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
//     return(
//       <Layout>
//         <div className="flex items-center justify-center text-white">
//           Loading dashboard...
//         </div>
//       </Layout>
//     );
//   }


//   const emotionData = Object.entries(data.emotion_distribution).map(
//     ([emotion,value])=>({
//       name:emotion,
//       value:value
//     })
//   );
//   const moodTrendData = [
//     { day: "Mon", mood: 0.2 },
//     { day: "Tue", mood: -0.1 },
//     { day: "Wed", mood: 0.5 },
//     { day: "Thu", mood: -0.3 },
//     { day: "Fri", mood: 0.4 },
//     { day: "Sat", mood: 0.1 },
//     { day: "Sun", mood: 0.6 }
//   ];



//   return(

//     <Layout>

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
//         p-8 rounded-2xl">

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
//         p-8 rounded-2xl">

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
//         p-8 rounded-2xl">

//           <p className="text-fuchsia-400 text-sm">
//             Risk Score
//           </p>

//           <h2 className="text-3xl font-semibold mt-1">
//             {data.risk?.score}
//           </h2>

//         </motion.div>

//       </div>



//       {/* PIE CHART */}

// <div className="bg-gradient-to-br from-purple-900/20 via-black/40 to-indigo-900/20
// border border-white/10 backdrop-blur-xl
// p-10 rounded-2xl mb-12
// shadow-[0_0_80px_rgba(168,85,247,0.15)]">

//   <h2 className="text-2xl font-semibold mb-6
//   bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
//   bg-clip-text text-transparent">
//     Emotion Distribution
//   </h2>

//   <div className="h-[360px]">

//     <ResponsiveContainer width="100%" height="100%">

//       <PieChart>

//         <Pie
//           data={emotionData}
//           cx="50%"
//           cy="50%"
//           innerRadius={70}
//           outerRadius={120}
//           paddingAngle={5}
//           dataKey="value"
//           label={({ name, value }) => `${name}: ${value}`}
//           labelLine={false}
//           stroke="rgba(255,255,255,0.1)"
//         >
//           {emotionData.map((entry,index)=>(
//             <Cell
//               key={index}
//               fill={COLORS[index % COLORS.length]}
//             />
//           ))}
//         </Pie>

//         <Tooltip
//           contentStyle={{
//             background:"#111827",
//             border:"1px solid rgba(255,255,255,0.15)",
//             borderRadius:"10px",
//             color:"#fff",
//             fontWeight:"500"
//           }}
//           labelStyle={{ color:"#fff" }}
//           itemStyle={{ color:"#fff" }}
//         />

//         <Legend
//           iconType="circle"
//           wrapperStyle={{
//             color:"#e5e7eb",
//             fontSize:"15px",
//             paddingTop:"10px"
//           }}
//         />

//       </PieChart>
//       {/* MOOD TREND */}

// <div className="bg-gradient-to-br from-purple-900/20 via-black/40 to-indigo-900/20
// border border-white/10 backdrop-blur-xl
// p-10 rounded-2xl mb-20
// shadow-[0_0_80px_rgba(168,85,247,0.12)]">

//   <h2 className="text-2xl font-semibold mb-6
//   bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
//   bg-clip-text text-transparent">
//     Mood Trend (Weekly)
//   </h2>

//   <div className="h-[420px]">

//     <ResponsiveContainer width="100%" height="100%">

//     <LineChart
//   data={moodTrendData}
//   margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
// >

//         <CartesianGrid
//           strokeDasharray="3 3"
//           stroke="rgba(255,255,255,0.05)"
//         />

//         <XAxis
//           dataKey="day"
//           stroke="#9ca3af"
//         />

//         <YAxis
//           stroke="#9ca3af"
//           domain={[-1,1]}
//         />

//         <Tooltip
//           contentStyle={{
//             background:"#111827",
//             border:"1px solid rgba(255,255,255,0.15)",
//             borderRadius:"10px",
//             color:"#fff"
//           }}
//         />

//         <Line
//           type="monotone"
//           dataKey="mood"
//           stroke="#a855f7"
//           strokeWidth={3}
//           dot={{ r:5 }}
//           activeDot={{ r:8 }}
//         />

//       </LineChart>

//     </ResponsiveContainer>

//   </div>

// </div>

//     </ResponsiveContainer>

//   </div>

// </div>



//       {/* EMOTION CARDS */}

//       <div className="bg-gradient-to-br from-white/5 to-white/0
//       border border-white/10 backdrop-blur-xl
//       p-10 rounded-2xl mb-12">

//         <h2 className="text-2xl font-semibold mb-6">
//           Emotion Breakdown
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
//               className="bg-black/40 border border-white/10
//               p-6 rounded-xl">

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
//             p-6 rounded-xl">

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

//     </Layout>

//   );
// }



import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

const COLORS = [
  "#a855f7",
  "#6366f1",
  "#ec4899",
  "#22d3ee"
];

export default function Dashboard(){

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
    return(
      <Layout>
        <div className="flex items-center justify-center text-white h-[400px]">
          Loading dashboard...
        </div>
      </Layout>
    );
  }



  const emotionData = Object.entries(data.emotion_distribution).map(
    ([emotion,value])=>({
      name:emotion,
      value:value
    })
  );



  const moodTrendData = [
    { day:"Mon", mood:0.2 },
    { day:"Tue", mood:-0.1 },
    { day:"Wed", mood:0.4 },
    { day:"Thu", mood:-0.3 },
    { day:"Fri", mood:0.3 },
    { day:"Sat", mood:0.1 },
    { day:"Sun", mood:0.6 }
  ];



  const weeklyEmotionData = [
    { day:"Mon", happy:1, sad:0, stressed:1 },
    { day:"Tue", happy:0, sad:1, stressed:1 },
    { day:"Wed", happy:2, sad:0, stressed:0 },
    { day:"Thu", happy:0, sad:1, stressed:1 },
    { day:"Fri", happy:1, sad:0, stressed:1 },
    { day:"Sat", happy:2, sad:0, stressed:0 },
    { day:"Sun", happy:1, sad:0, stressed:0 }
  ];



  return(

    <Layout>

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
        p-8 rounded-2xl">

          <p className="text-purple-400 text-sm">Total Journals</p>

          <h2 className="text-4xl font-bold mt-1">
            {data.total_entries}
          </h2>

        </motion.div>



        <motion.div
        whileHover={{scale:1.05}}
        className="bg-gradient-to-br from-indigo-900/20 to-black/40
        border border-indigo-500/20 backdrop-blur-xl
        p-8 rounded-2xl">

          <p className="text-indigo-400 text-sm">Risk Level</p>

          <h2 className="text-3xl font-semibold mt-1">
            {data.risk?.level || "N/A"}
          </h2>

        </motion.div>



        <motion.div
        whileHover={{scale:1.05}}
        className="bg-gradient-to-br from-fuchsia-900/20 to-black/40
        border border-fuchsia-500/20 backdrop-blur-xl
        p-8 rounded-2xl">

          <p className="text-fuchsia-400 text-sm">Risk Score</p>

          <h2 className="text-3xl font-semibold mt-1">
            {data.risk?.score ?? "-"}
          </h2>

        </motion.div>

      </div>



      {/* PIE CHART */}

      <div className="relative
      bg-gradient-to-br from-white/5 to-white/0
      border border-white/10 backdrop-blur-xl
      p-10 rounded-2xl mb-20">

        <div className="absolute w-[400px] h-[400px]
        bg-purple-500/20 blur-[120px] rounded-full
        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>

        <h2 className="text-2xl font-semibold mb-6">
          Emotion Distribution
        </h2>

        <div className="h-[380px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={emotionData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                dataKey="value"
                label={({name,value})=>`${name}: ${value}`}
                labelLine={false}
              >

                {emotionData.map((entry,index)=>(
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip/>
              <Legend/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>



      {/* MOOD TREND */}

      <div className="bg-gradient-to-br from-purple-900/20 to-black/40
      border border-white/10 backdrop-blur-xl
      p-10 rounded-2xl mb-20">

        <h2 className="text-2xl font-semibold mb-6">
          Mood Trend (Weekly)
        </h2>

        <div className="h-[420px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart
              data={moodTrendData}
              margin={{top:20,right:30,left:0,bottom:10}}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />

              <XAxis dataKey="day" stroke="#9ca3af"/>

              <YAxis domain={[-1,1]} stroke="#9ca3af"/>

              <Tooltip/>

              <Line
                type="monotone"
                dataKey="mood"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{r:5}}
                activeDot={{r:8}}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>



      {/* WEEKLY BAR CHART */}

      <div className="bg-gradient-to-br from-indigo-900/20 to-black/40
      border border-white/10 backdrop-blur-xl
      p-10 rounded-2xl mb-20">

        <h2 className="text-2xl font-semibold mb-6">
          Weekly Emotion Analysis
        </h2>

        <div className="h-[420px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={weeklyEmotionData}>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>

              <XAxis dataKey="day" stroke="#9ca3af"/>

              <YAxis stroke="#9ca3af"/>

              <Tooltip/>

              <Legend/>

              <Bar dataKey="happy" fill="#a855f7"/>

              <Bar dataKey="sad" fill="#6366f1"/>

              <Bar dataKey="stressed" fill="#ec4899"/>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>



      {/* EMOTION BREAKDOWN */}

      <div className="bg-gradient-to-br from-white/5 to-white/0
      border border-white/10 backdrop-blur-xl
      p-10 rounded-2xl mb-12">

        <h2 className="text-2xl font-semibold mb-6">
          Emotion Breakdown
        </h2>

        <div className="grid grid-cols-4 gap-6">

          {Object.entries(data.emotion_distribution).map(([emotion,value])=>{

            return(

              <motion.div
              key={emotion}
              whileHover={{scale:1.07}}
              className="bg-black/40 border border-white/10
              p-6 rounded-xl">

                <p className="capitalize text-sm text-gray-400">
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
      p-10 rounded-2xl mb-20">

        <h2 className="text-2xl font-semibold mb-6">
          Average Emotional Metrics
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {Object.entries(data.averages).map(([metric,value])=>(

            <motion.div
            key={metric}
            whileHover={{scale:1.07}}
            className="bg-black/40 border border-white/10
            p-6 rounded-xl">

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



      {/* AI INSIGHT CARD */}

      <div className="bg-gradient-to-br from-purple-900/30 to-black/40
      border border-purple-500/20 backdrop-blur-xl
      p-10 rounded-2xl">

        <h2 className="text-2xl font-semibold mb-4">
          AI Insight
        </h2>

        <p className="text-gray-300 leading-relaxed">

          Your emotional data suggests mixed mood patterns this week.
          Stress appears mid-week while positive emotions increase
          toward the weekend. Maintaining journaling consistency
          helps AI detect emotional trends more accurately.

        </p>

      </div>

    </Layout>

  );
}