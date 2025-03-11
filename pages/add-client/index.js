// C:\Users\Mikaela\FYP-Frontend\pages\add-client\index.js

import { useRef } from "react";
import { useRouter } from "next/router";

function AddClientPage() {
  const router = useRouter();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();

  async function addClientHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const clientData = {
      customerName: enteredName,
      customerPhone: enteredPhone,
      customerEmail: enteredEmail,
    };

    const response = await fetch("/api/create-client", {
      method: "POST",
      body: JSON.stringify(clientData),
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
    <form onSubmit={addClientHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required ref={nameInputRef} />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" required ref={phoneInputRef} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required ref={emailInputRef} />
      </div>
      <button type="submit">Add Client</button>
    </form>
  );
}

export default AddClientPage;
