import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./new-call.module.css";

import { PhoneCall, PhoneOff, Pause, Mic, Circle, Flag } from "lucide-react";

const CallControls = ({ selectedCustomer }) => {
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [holdCount, setHoldCount] = useState(0);
  const [onHold, setOnHold] = useState(false);
  const timerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (callActive && !onHold) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [callActive, onHold]);

  useEffect(() => {
    if (!callActive) {
      setCallDuration(0);
      setHoldCount(0);
      setOnHold(false);
    }
  }, [callActive]);

  const handleCall = () => {
    if (selectedCustomer) {
      setCallActive(true);
      setHoldCount(0);
      setOnHold(false);
    } else {
      alert("Please select a customer to call.");
    }
  };

  const handleEndCall = () => {
    setCallActive(false);
  };

  const handlePause = () => {
    if (callActive) {
      if (!onHold) {
        setOnHold(true);
        setHoldCount((prev) => prev + 1);
      } else {
        setOnHold(false);
      }
    }
  };

  return (
    <div className={styles.callControlsWrapper}>
      <div className={styles.container}>
        <button
          className={
            callActive
              ? styles.buttonDisabled
              : `${styles.button} ${styles.pickUp}${
                  callActive ? " " + styles.active : ""
                }`
          }
          onClick={handleCall}
          title="Call"
          disabled={callActive}
        >
          <PhoneCall
            className={callActive ? styles.iconDisabled : styles.icon}
          />
        </button>
        <button
          className={
            callActive
              ? `${styles.button} ${styles.endCall}`
              : styles.buttonDisabled
          }
          title="End Call"
          onClick={handleEndCall}
          disabled={!callActive}
        >
          <PhoneOff
            className={callActive ? styles.icon : styles.iconDisabled}
          />
        </button>
        <button
          className={
            callActive
              ? `${styles.button} ${onHold ? styles.active : ""}`
              : styles.buttonDisabled
          }
          onClick={handlePause}
          title={onHold ? "Resume Call" : "Pause (Hold)"}
          disabled={!callActive}
        >
          <Pause className={callActive ? styles.icon : styles.iconDisabled} />
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
      {callActive && (
        <div className={styles.callDuration}>
          Call Duration:{" "}
          {Math.floor(callDuration / 60)
            .toString()
            .padStart(2, "0")}
          :{(callDuration % 60).toString().padStart(2, "0")}
        </div>
      )}
      {callActive && (
        <div className={styles.callDuration}>
          On Hold Count: {holdCount}
          {onHold ? " (On Hold)" : ""}
        </div>
      )}
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
        // Always expect { customers: [...] }
        if (Array.isArray(data.customers)) {
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
      <div className={styles.topCenterControlsWrapper}>
        <CallControls selectedCustomer={selectedCustomer} />
      </div>
      <div className={styles.customerSelectWrapper}>
        <label htmlFor="customerSelect">Select Customer:</label>
        <select
          id="customerSelect"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">-- Choose a customer --</option>
          {customers.length === 0 && (
            <option value="" disabled>
              No customers found
            </option>
          )}
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.customerName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default NewCallPage;
