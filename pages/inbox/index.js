// C:\Users\Mikaela\FYP-Frontend\pages\inbox\index.js

import { useState, useEffect } from "react";
import { Voicemail, FileAudio, MessageSquare } from "lucide-react";
import styles from "./inbox.module.css";

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("direct-message");
  const [activeChat, setActiveChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [chats, setChats] = useState({});
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("/api/customers");
        const data = await response.json();
        if (data) {
          setContacts(data);
          const initialChats = data.reduce((acc, customer) => {
            acc[customer._id] = [];
            return acc;
          }, {});
          setChats(initialChats);
        } else {
          console.error("No customers found in the response");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    fetchContacts();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || activeChat === null) return;

    const userMessage = { sender: "agent", text: newMessage };
    setChats((prevChats) => ({
      ...prevChats,
      [activeChat]: [...prevChats[activeChat], userMessage],
    }));

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      const aiReply = { sender: "customer", text: data.reply };
      setChats((prevChats) => ({
        ...prevChats,
        [activeChat]: [...prevChats[activeChat], aiReply],
      }));
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles["inbox-container"]}>
      <div className={styles["tab-bar"]}>
        <div className={styles["inbox-label"]}>Inbox</div>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "direct-message" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("direct-message")}
          title="Direct Messages"
        >
          <MessageSquare size={20} />
        </button>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "voicemail" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("voicemail")}
          title="Voicemails"
        >
          <Voicemail size={20} />
        </button>
        <button
          className={`${styles["tab-button"]} ${
            activeTab === "recordings" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("recordings")}
          title="Recordings"
        >
          <FileAudio size={20} />
        </button>
      </div>
      <div className={styles["tab-content"]}>
        {activeTab === "direct-message" && (
          <div className={styles["chat-container"]}>
            <div className={styles["contacts-list"]}>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className={`${styles["contact"]} ${
                      activeChat === contact._id ? styles["active-contact"] : ""
                    }`}
                    onClick={() => setActiveChat(contact._id)}
                  >
                    {contact.customerName}
                  </div>
                ))
              ) : (
                <p>No contacts available</p>
              )}
            </div>
            <div className={styles["chat-content"]}>
              {activeChat !== null ? (
                <>
                  <div className={styles["messages"]}>
                    {chats[activeChat].map((msg, index) => (
                      <div
                        key={index}
                        className={`${styles["message"]} ${
                          msg.sender === "agent"
                            ? styles["agent"]
                            : styles["customer"]
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                  <div className={styles["message-input"]}>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                  </div>
                </>
              ) : (
                <p>Select a contact to start chatting</p>
              )}
            </div>
          </div>
        )}
        {activeTab === "voicemail" && <p>Voice Mail</p>}
        {activeTab === "recordings" && <p>Recordings</p>}
      </div>
    </div>
  );
}
