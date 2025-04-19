import styles from "./login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Call Centre CRM</h1>
      <p>Please log in or register to continue.</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Login</button>
        <button className={styles.button}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
