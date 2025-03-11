// C:\Users\Mikaela\FYP-Frontend\pages\add-client\index.js

import { useRef } from "react";
import { useRouter } from "next/router";
import classes from "./AddClient.module.css";

function AddCustomerPage() {
  const router = useRouter();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();

  async function addCustomerHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const customerData = {
      customerName: enteredName,
      customerPhone: enteredPhone,
      customerEmail: enteredEmail,
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
      <div className={classes.actions}>
        <button type="submit">Add Customer</button>
      </div>
    </form>
  );
}

export default AddCustomerPage;
