import styles from "./AgentStats.module.css";
import { useEffect, useState } from "react";

const AgentStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get agentId from localStorage
    const agentId = localStorage.getItem("agentId");
    if (!agentId) {
      setError("No agent ID found. Please log in.");
      setLoading(false);
      return;
    }
    // Fetch call data for this agent
    fetch(`/api/calls?agentId=${agentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.calls)) {
          setError("No call data found.");
          setLoading(false);
          return;
        }
        // Calculate averages
        const totalCalls = data.calls.length;
        const totalDuration = data.calls.reduce(
          (sum, call) => sum + (call.callDuration || 0),
          0
        );
        const totalHoldCount = data.calls.reduce(
          (sum, call) => sum + (call.holdCount || 0),
          0
        );
        setStats({
          totalCalls,
          avgDuration: totalCalls ? (totalDuration / totalCalls).toFixed(2) : 0,
          avgHoldCount: totalCalls
            ? (totalHoldCount / totalCalls).toFixed(2)
            : 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch stats.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className={styles.statsLoading}>Loading agent stats...</div>;
  if (error) return <div className={styles.statsError}>{error}</div>;

  return (
    <div>
      <h1>Agent Stats</h1>
      {/* Message with agent name below heading */}
      <div
        style={{
          marginBottom: 16,
          color: "#222",
          fontWeight: 500,
          fontSize: "1.05em",
        }}
      >
        Call statistics for the agent:{" "}
        {typeof window !== "undefined"
          ? localStorage.getItem("agentName") || "Unknown"
          : ""}
      </div>
      <div className={styles.statsContainer}>
        <h3>Call Statistics</h3>
        <div className={styles.statsRow}>
          <span className={styles.statsLabel}>Total Calls:</span>
          <span className={styles.statsValue}>{stats.totalCalls}</span>
        </div>
        <div className={styles.statsRow}>
          <span className={styles.statsLabel}>Average Call Duration:</span>
          <span className={styles.statsValue}>{stats.avgDuration} seconds</span>
        </div>
        <div className={styles.statsRow}>
          <span className={styles.statsLabel}>Average On Hold Count:</span>
          <span className={styles.statsValue}>{stats.avgHoldCount}</span>
        </div>
      </div>
    </div>
  );
};

export default AgentStats;
