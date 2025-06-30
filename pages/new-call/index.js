import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./new-call.module.css";

import { PhoneCall, PhoneOff, Pause, Mic, Circle, Flag } from "lucide-react";

const CallControls = ({ selectedCustomer }) => {
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

const NewCallPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    // Fetch customers from backend
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        // Handle both array and object response
        if (Array.isArray(data)) {
          setCustomers(data);
        } else if (Array.isArray(data.customers)) {
          setCustomers(data.customers);
        } else {
          setCustomers([]);
        }
      })
      .catch((err) => {
        setCustomers([]);
        console.error("Failed to fetch customers", err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>New Call</title>
      </Head>
      <div className={styles.customerSelectWrapper}>
        <label htmlFor="customerSelect">Select Customer:</label>
        <select
          id="customerSelect"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">-- Choose a customer --</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <CallControls selectedCustomer={selectedCustomer} />
    </>
  );
};

export default NewCallPage;
