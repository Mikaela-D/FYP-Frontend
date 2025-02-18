import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./[componentLink].module.css";

const ComponentDetailPage = () => {
  const { query } = useRouter();
  const { componentLink } = query;
  const [componentData, setComponentData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!componentLink) return;
    fetch("/component-library.json")
      .then((res) => res.json())
      .then((data) =>
        setComponentData(
          data.find((comp) => comp.link === componentLink) || null
        )
      );
  }, [componentLink]);

  if (!componentData) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{componentData.name}</h1>
      <p className={styles.description}>{componentData.description}</p>
      {componentData.agentStats && (
        <div className={styles.statsContainer}>
          <h2 className={styles.statsTitle}>
            {componentData.agentStats.title}
          </h2>
          <div className={styles.tabs}>
            {componentData.agentStats.tabs.map((tab, index) => (
              <button
                key={index}
                className={`${styles.tab} ${
                  activeTab === index ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div
            className={styles.tabContent}
            dangerouslySetInnerHTML={{
              __html: componentData.agentStats.tabs[activeTab].content,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ComponentDetailPage;
