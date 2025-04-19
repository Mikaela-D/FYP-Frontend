import { useState } from "react";
import styles from "./login.module.css";

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/register-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Registration successful! You can now log in.");
        setIsRegistering(false);
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering agent:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to the Call Centre CRM</h1>
      {isRegistering ? (
        <div className={styles.registerForm}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister} className={styles.button}>
            Submit
          </button>
          <button onClick={() => setIsRegistering(false)} className={styles.button}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <p>Please log in or register to continue.</p>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Login</button>
            <button
              className={styles.button}
              onClick={() => setIsRegistering(true)}
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
