import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./call-controls.module.css";
import { PhoneCall, PhoneOff, Pause, Mic, Circle, Flag } from "lucide-react";

const CallControls = () => {
  const [activeButton, setActiveButton] = useState("call");
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${
          activeButton === "call" ? styles.active : ""
        }`}
        onClick={() => setActiveButton("call")}
      >
        <PhoneCall color="green" size={24} />
      </button>
      <button className={styles.button}>
        <PhoneOff color="red" size={24} />
      </button>

      <button className={styles.buttonDisabled} disabled>
        <Pause size={24} color="#ddd" />
      </button>
      <button className={styles.buttonDisabled} disabled>
        <Mic size={24} color="#ddd" />
      </button>
      <button className={styles.buttonDisabled} disabled>
        <Circle size={24} color="#ddd" />
      </button>
      <button className={styles.buttonDisabled} disabled>
        <Flag size={24} color="#ddd" />
      </button>
    </div>
  );
};

export default CallControls;
