import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          "http://localhost:8000/journal/dashboard-summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadData();
  }, []);

  if (!data) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>MindMirror AI Dashboard</h1>

      <h3>Total Journal Entries</h3>
      <p>{data.total_entries}</p>

      <h3>Emotion Distribution</h3>
      <pre>{JSON.stringify(data.emotion_distribution, null, 2)}</pre>

      <h3>Average Emotional Metrics</h3>
      <pre>{JSON.stringify(data.averages, null, 2)}</pre>

      <h3>Risk Status</h3>
      <pre>{JSON.stringify(data.risk, null, 2)}</pre>
    </div>
  );
}