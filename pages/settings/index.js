import { useState, useEffect } from "react";
import styles from "./settings.module.css";

const Settings = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <>
      <h1 className={styles.settingsTitle}>Settings</h1>
      <label htmlFor="theme-select" className={styles.label}>
        Select Theme:
      </label>
      <select
        id="theme-select"
        className={styles.themeSelect}
        value={theme}
        onChange={handleThemeChange}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </>
  );
};

export default Settings;
