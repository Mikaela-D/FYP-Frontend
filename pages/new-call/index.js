import { useState } from "react";
import { useRouter } from "next/router";

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
        title="Pick Up"
      >
        <PhoneCall color="green" size={24} />
      </button>
      <button className={styles.button} title="End Call">
        <PhoneOff color="red" size={24} />
      </button>

      <button className={styles.buttonDisabled} disabled title="Pause">
        <Pause size={24} color="#ddd" />
      </button>
      <button className={styles.buttonDisabled} disabled title="Mute">
        <Mic size={24} color="#ddd" />
      </button>
      <button className={styles.buttonDisabled} disabled title="Record">
        <Circle size={24} color="#ddd" />
      </button>
      <button className={styles.buttonDisabled} disabled title="Report">
        <Flag size={24} color="#ddd" />
      </button>
    </div>
  );
};

export default CallControls;
