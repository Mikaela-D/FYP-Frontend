import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./new-call.module.css";

import { PhoneCall, PhoneOff, Pause, Mic, Circle, Flag } from "lucide-react";

const CallControls = () => {
  const [activeButton, setActiveButton] = useState("call");
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.pickUp} ${
          activeButton === "call" ? styles.active : ""
        }`}
        onClick={() => setActiveButton("call")}
        title="Pick Up"
      >
        <PhoneCall className={styles.icon} />
      </button>
      <button className={`${styles.button} ${styles.endCall}`} title="End Call">
        <PhoneOff className={styles.icon} />
      </button>

      <button className={styles.buttonDisabled} disabled title="Pause">
        <Pause className={styles.iconDisabled} />
      </button>
      <button className={styles.buttonDisabled} disabled title="Mute">
        <Mic className={styles.iconDisabled} />
      </button>
      <button className={styles.buttonDisabled} disabled title="Record">
        <Circle className={styles.iconDisabled} />
      </button>
      <button className={styles.buttonDisabled} disabled title="Report">
        <Flag className={styles.iconDisabled} />
      </button>
    </div>
  );
};

export default CallControls;
