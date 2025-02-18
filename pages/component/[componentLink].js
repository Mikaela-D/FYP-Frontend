import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import styles from "./[componentLink].module.css";

const ComponentDetailPage = () => {
  const { query } = useRouter();
  const { componentLink } = query;
  const [componentData, setComponentData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const componentList = useRef([]);

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

      {/* Render attributes if available */}
      {(componentData.attributes || componentData.agentStats?.attributes) && (
        <div className={styles.statsContainer}>
          <h2 className={styles.statsTitle}>Attributes</h2>
          <ul>
            {(
              componentData.attributes || componentData.agentStats?.attributes
            ).map((attr, index) => (
              <li key={index}>
                <strong>{attr.name}:</strong> {attr.content}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Render tabs if available */}
      {(componentData.tabs || componentData.agentStats?.tabs) && (
        <div className={styles.statsContainer}>
          <h2 className={styles.statsTitle}>Details</h2>
          <div className={styles.tabs}>
            {(componentData.tabs || componentData.agentStats?.tabs).map(
              (tab, index) => (
                <button
                  key={index}
                  className={`${styles.tab} ${
                    activeTab === index ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </button>
              )
            )}
          </div>
          <div
            className={styles.tabContent}
            dangerouslySetInnerHTML={{
              __html: (componentData.tabs || componentData.agentStats?.tabs)[
                activeTab
              ].content,
            }}
          />
        </div>
      )}

      {/* Render images if available */}
      {componentData.images?.length > 0 && (
        <div className={styles.slideshowContainer}>
          {componentData.images.map((image, index) => (
            <img
              key={index}
              ref={(el) => (componentList.current[index] = el)}
              src={image}
              alt={`${componentData.name} image ${index + 1}`}
              className={styles.componentImage}
              onClick={() => {
                setModalIndex(index);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Modal for images */}
      {showModal && componentData.images?.length > 0 && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <span className={styles.close} onClick={() => setShowModal(false)}>
            &times;
          </span>
          <img
            className={styles.modalContent}
            src={componentData.images[modalIndex]}
            alt="modal-image"
          />
          <div className={styles.modalNavigation}>
            <button
              className={styles.prevButton}
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((prev) =>
                  prev > 0 ? prev - 1 : componentData.images.length - 1
                );
              }}
            >
              &#10094;
            </button>
            <button
              className={styles.nextButton}
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((prev) =>
                  prev < componentData.images.length - 1 ? prev + 1 : 0
                );
              }}
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentDetailPage;
