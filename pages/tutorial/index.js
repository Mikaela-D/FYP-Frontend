// pages/tutorial/index.js
import "./tutorial.module.css";
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

  // Dummy component data for example purposes
  const components = [
    {
      id: 1,
      link: "salesforce-component",
      platforms: ["sf"],
      name: "Salesforce Component",
      image: "/path/to/salesforce-image.png",
      description: "A Salesforce component description.",
    },
    {
      id: 2,
      link: "generic-component",
      platforms: ["generic"],
      name: "Generic Component",
      image: "/path/to/generic-image.png",
      description: "A generic component description.",
    },
  ];

  // Update filteredComponents when selectedPlatform changes
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
      <div className="container">
        <div className="filter-buttons">
          <button
            className={
              selectedPlatform === "all" ? "selected white" : "default"
            }
            onClick={() => handlePlatformFilter("all")}
          >
            All Platforms
          </button>
          <button
            className={selectedPlatform === "sf" ? "selected blue" : "blue"}
            onClick={() => handlePlatformFilter("sf")}
          >
            Salesforce
          </button>
          <button
            className={
              selectedPlatform === "generic" ? "selected green" : "green"
            }
            onClick={() => handlePlatformFilter("generic")}
          >
            Standard
          </button>
          <button
            className={selectedPlatform === "sn" ? "selected red" : "red"}
            onClick={() => handlePlatformFilter("sn")}
          >
            ServiceNow
          </button>
          <button
            className={
              selectedPlatform === "zendesk" ? "selected yellow" : "yellow"
            }
            onClick={() => handlePlatformFilter("zendesk")}
          >
            Zendesk
          </button>
        </div>
      </div>

      <div className="scroll-container">
        <div className="content">
          {filteredComponents.length > 0 && (
            <div className="component-container">
              {filteredComponents.map((component) => (
                <div key={component.id} className="component">
                  <a href={"/" + component.link} className="component">
                    <div
                      className="platform-color"
                      style={{
                        backgroundColor: getBorderColor(component.platforms),
                      }}
                    />
                    <div className="image-container">
                      <img src={component.image} className="component-image" />
                    </div>
                    <h2 className="component-name">{component.name}</h2>
                    <div className="description">{component.description}</div>
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
