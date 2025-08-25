import { useState, useEffect } from "react";
import styles from "./queue-activation.module.css";

const QueueActivation = () => {
  const [active, setActive] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("queueActive");
      return stored === null ? true : stored === "true";
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("queueActive", active);
    }
  }, [active]);

  return (
    <div className={styles.container}>
      <h1>Queue Activation</h1>
      <div className={styles.toggleRow}>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={active}
            onChange={() => setActive((prev) => !prev)}
            className={styles.switchInput}
          />
          <span className={styles.switchSlider}></span>
        </label>
        <span className={styles.statusText}>
          {active
            ? "You are On Queue (You can place calls)"
            : "You are Off Queue (You cannot place calls)"}
        </span>
      </div>
    </div>
  );
};

export default QueueActivation;
