// C:\Users\Mikaela\FYP-Frontend\pages\add-customer\index.js

import { useState, useRef } from "react";
import { useRouter } from "next/router";
import classes from "./AddCustomer.module.css";

function AddCustomerPage() {
  const router = useRouter();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const personaInputRef = useRef();
  const [showPersona, setShowPersona] = useState(false);

  async function addCustomerHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPersona = personaInputRef.current.value;

    const customerData = {
      customerName: enteredName,
      customerPhone: enteredPhone,
      customerEmail: enteredEmail,
      persona: enteredPersona,
    };

    const response = await fetch("/api/create-customer", {
      method: "POST",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.response === "success") {
      router.push("/");
    } else {
      alert(data.error);
    }
  }

  return (
    <form className={classes.form} onSubmit={addCustomerHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Customer Name</label>
        <input type="text" id="name" required ref={nameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="phone">Customer Phone</label>
        <input type="tel" id="phone" required ref={phoneInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Customer Email</label>
        <input type="email" id="email" required ref={emailInputRef} />
      </div>
      <div
        className={classes.actions}
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <button
          type="button"
          onClick={() => setShowPersona((prev) => !prev)}
          style={{
            background: showPersona ? "#e03e1a" : "#b6c2cf",
            color: showPersona ? "white" : "#253858",
            border: "none",
            borderRadius: 4,
            padding: "0.3rem 1.2rem",
            fontSize: "0.98em",
            marginRight: 8,
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {showPersona ? "Hide AI Persona" : "Show AI Persona"}
        </button>
      </div>
      {showPersona && (
        <div className={classes.personaAdmin}>
          <label htmlFor="persona">
            AI Persona{" "}
            <span style={{ fontWeight: 400, fontSize: "0.93em" }}>
              (user only, not visible to the agent)
            </span>
          </label>
          <textarea
            id="persona"
            ref={personaInputRef}
            rows={3}
            placeholder="e.g. You are a frustrated parent whose child's phone is stuck on a black screen..."
          />
        </div>
      )}
      <div className={classes.actions}>
        <button type="submit">Add Customer</button>
      </div>
    </form>
  );
}

export default AddCustomerPage;
