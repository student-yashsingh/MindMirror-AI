import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const sampleData = [
  { emotion: "Happy", value: 3 },
  { emotion: "Sad", value: 3 },
  { emotion: "Stressed", value: 2 },
  { emotion: "Neutral", value: 0 }
];

export default function Reports(){

  return(

    <Layout>

      <h1 className="text-5xl font-bold mb-12
      bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
      bg-clip-text text-transparent">
        Emotional Reports
      </h1>

      <div className="bg-gradient-to-br from-purple-900/20 to-black/40
      border border-white/10 backdrop-blur-xl
      p-10 rounded-2xl shadow-[0_0_80px_rgba(168,85,247,0.15)]">

        <h2 className="text-2xl font-semibold mb-6">
          Emotion Distribution
        </h2>

        <div className="h-[400px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={sampleData}>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />

              <XAxis dataKey="emotion" stroke="#ccc"/>

              <YAxis stroke="#ccc"/>

              <Tooltip
                contentStyle={{
                  background:"#111827",
                  border:"1px solid rgba(255,255,255,0.1)",
                  borderRadius:"10px"
                }}
              />

              <Bar
                dataKey="value"
                fill="#a855f7"
                radius={[8,8,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </Layout>

  );
}