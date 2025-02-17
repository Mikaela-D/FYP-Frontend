import { useState, useEffect } from "react";
import styles from "./tutorial.module.css";

const Tutorial = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetch("/component-library.json")
      .then((response) => response.json())
      .then((data) => setComponents(data));
  }, []);

  useEffect(() => {
    const filtered =
      selectedPlatform === "all"
        ? components
        : components.filter((component) =>
            component.platforms.includes(selectedPlatform)
          );
    setFilteredComponents(filtered);
  }, [selectedPlatform, components]);

  const handlePlatformFilter = (platform) => {
    setSelectedPlatform(platform);
  };

  const getBorderColor = (platforms) => {
    if (platforms.includes("sf")) return "var(--sf-color)";
    if (platforms.includes("generic")) return "var(--generic-color)";
    if (platforms.includes("sn")) return "var(--sn-color)";
    if (platforms.includes("zendesk")) return "var(--zendesk-color)";
    return "var(--default-color)";
  };

  return (
    <div data-qa="library-page">
      <div className={styles.container}>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.button} ${
              selectedPlatform === "all" ? styles.selected : ""
            }`}
            onClick={() => handlePlatformFilter("all")}
          >
            All Platforms
          </button>
          <button
            className={`${styles.button} ${
              selectedPlatform === "sf" ? styles.selected : ""
            }`}
            onClick={() => handlePlatformFilter("sf")}
          >
            Salesforce
          </button>
          <button
            className={`${styles.button} ${
              selectedPlatform === "generic" ? styles.selected : ""
            }`}
            onClick={() => handlePlatformFilter("generic")}
          >
            Standard
          </button>
          <button
            className={`${styles.button} ${
              selectedPlatform === "sn" ? styles.selected : ""
            }`}
            onClick={() => handlePlatformFilter("sn")}
          >
            ServiceNow
          </button>
          <button
            className={`${styles.button} ${
              selectedPlatform === "zendesk" ? styles.selected : ""
            }`}
            onClick={() => handlePlatformFilter("zendesk")}
          >
            Zendesk
          </button>
        </div>
      </div>

      <div className={styles.scrollContainer}>
        <div className={styles.content}>
          {filteredComponents.length > 0 && (
            <div className={styles.componentContainer}>
              {filteredComponents.map((component) => (
                <div key={component.id} className={styles.component}>
                  <a
                    href={"/" + component.link}
                    className={styles.componentLink}
                  >
                    <div
                      className={styles.platformColor}
                      style={{
                        backgroundColor: getBorderColor(component.platforms),
                      }}
                    />
                    <div className={styles.imageContainer}>
                      <img
                        src={component.image}
                        className={styles.componentImage}
                      />
                    </div>
                    <h2 className={styles.componentName}>{component.name}</h2>
                    <div className={styles.description}>
                      {component.description}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
