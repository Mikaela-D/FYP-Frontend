import styles from "./settings.module.css";

const Settings = ({ theme, setTheme }) => {
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme); // Calls global function in _app.js
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
