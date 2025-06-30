import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./new-call.module.css";

import { PhoneCall, PhoneOff, Pause, Mic, Circle, Flag } from "lucide-react";

const CallControls = ({ selectedCustomer, onCallSummary }) => {
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [holdCount, setHoldCount] = useState(0);
  const [onHold, setOnHold] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState(null);
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
      setStartTimestamp(null);
    }
  }, [callActive]);

  const handleCall = () => {
    if (selectedCustomer) {
      setCallActive(true);
      setHoldCount(0);
      setOnHold(false);
      setStartTimestamp(new Date().toISOString());
    } else {
      alert("Please select a customer to call.");
    }
  };

  const handleEndCall = async () => {
    if (!callActive) return;
    const endTimestamp = new Date().toISOString();
    const agentId = localStorage.getItem("agentId") || null;
    const callData = {
      customerId: selectedCustomer,
      callDuration,
      startTimestamp,
      endTimestamp,
      agentId,
      holdCount,
    };
    try {
      const res = await fetch("/api/calls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(callData),
      });
      const result = await res.json();
      if (onCallSummary) {
        onCallSummary({
          ...callData,
          callId: result.callId || (result.call && result.call._id),
        });
      }
    } catch (err) {
      if (onCallSummary) {
        onCallSummary(null);
      }
      console.error("Failed to save call data", err);
    }
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
        <div
          className={
            styles.statusPill +
            (onHold ? " " + styles.onHold : " " + styles.active)
          }
        >
          <Pause className={styles.statusIcon} />
          {onHold ? "On Hold" : "Active"}
        </div>
      )}
    </div>
  );
};

const NewCallPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [lastCallSummary, setLastCallSummary] = useState(null);

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

  // Handler to reset dropdown and summary
  const handleSummaryOk = () => {
    setShowSummary(false);
    setSelectedCustomer("");
  };

  // Handler to receive summary from CallControls
  const handleCallSummary = (summary) => {
    setLastCallSummary(summary);
    setShowSummary(true);
  };

  return (
    <>
      <Head>
        <title>New Call</title>
      </Head>
      <div className={styles.topCenterControlsWrapper}>
        <CallControls
          selectedCustomer={selectedCustomer}
          onCallSummary={handleCallSummary}
        />
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
      {/* Centered call summary below the dropdown, not inside the wrapper */}
      {showSummary && lastCallSummary && (
        <div className={styles.centeredSummaryContainer}>
          <div className={styles.callSummary}>
            <h4>Call Saved!</h4>
            <div>Call ID: {lastCallSummary.callId}</div>
            <div>Customer ID: {lastCallSummary.customerId}</div>
            <div>Duration: {lastCallSummary.callDuration} seconds</div>
            <div>Start: {lastCallSummary.startTimestamp}</div>
            <div>End: {lastCallSummary.endTimestamp}</div>
            <div>Agent ID: {lastCallSummary.agentId}</div>
            <div>On Hold Count: {lastCallSummary.holdCount}</div>
            <button className={styles.button} onClick={handleSummaryOk}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewCallPage;
