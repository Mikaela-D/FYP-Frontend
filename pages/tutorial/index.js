import styles from "./tutorial.module.css"; // ✅ Correct CSS Module Import
import { useState, useEffect } from "react";

const platformColors = {
  sf: "#5798d9",
  generic: "#46b6c6",
  sn: "#ac75ff",
  zendesk: "#e55ecd",
  default: "#ccc",
};

const Tutorial = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [filteredComponents, setFilteredComponents] = useState([]);

  const handlePlatformFilter = (platform) => {
    setSelectedPlatform(platform);
  };

  const components = [
    {
      id: 1,
      link: "station-selection",
      platforms: ["generic"],
      name: "Station Selection",
      image: "/path/to/station-selection.png",
      description: "Manage and assign workstations efficiently.",
    },
    {
      id: 2,
      link: "agent-stats",
      platforms: ["sf", "generic"],
      name: "Agent Stats",
      image: "/path/to/agent-stats.png",
      description: "Monitor agent performance and metrics.",
    },
    {
      id: 3,
      link: "queue-activation",
      platforms: ["zendesk", "sn"],
      name: "Queue Activation",
      image: "/path/to/queue-activation.png",
      description: "Activate and manage customer service queues.",
    },
    {
      id: 4,
      link: "call-controls",
      platforms: ["sf", "generic", "zendesk"],
      name: "Call Controls",
      image: "/call-controls-1.png",
      description: "Control and manage live calls efficiently.",
    }
    
  ];

  useEffect(() => {
    const filtered =
      selectedPlatform === "all"
        ? components
        : components.filter((component) =>
            component.platforms.includes(selectedPlatform)
          );
    setFilteredComponents(filtered);
  }, [selectedPlatform]);

  const getBorderColor = (platforms) => {
    for (const platform of platforms) {
      if (platformColors[platform]) {
        return platformColors[platform];
      }
    }
    return platformColors.default;
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
