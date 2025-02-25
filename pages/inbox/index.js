"use client";

import { useState } from "react";
import { Voicemail, FileAudio } from "lucide-react";
import styles from "./inbox.module.css";

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("voicemail");

  return (
    <div className={styles["inbox-container"]}>
      <div className={styles["tab-bar"]}>
        <div className={styles["inbox-label"]}>Inbox</div>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "voicemail" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("voicemail")}
        >
          <Voicemail size={20} />
        </button>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "recordings" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("recordings")}
        >
          <FileAudio size={20} />
        </button>
      </div>
      <div className={styles["tab-content"]}>
        {activeTab === "voicemail" && <p>Voice Mail</p>}
        {activeTab === "recordings" && <p>Recordings</p>}
      </div>
    </div>
  );
}
