import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

const ComponentDetailPage = () => {
  const { query } = useRouter();
  const { componentLink } = query;
  const [componentData, setComponentData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showNotAvailable, setShowNotAvailable] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const componentList = useRef([]);
  const slideIndex = useRef(0);

  useEffect(() => {
    const fetchComponentLibrary = async () => {
      const res = await fetch("/component-library.json");
      const data = await res.json();
      const component = data.find((comp) => comp.link === componentLink);
      if (component) {
        setComponentData(component);
      }
    };

    if (componentLink) {
      fetchComponentLibrary();
    }
  }, [componentLink]);

  const handleMouseOver = () => {
    if (componentData?.images?.length < 4) {
      setShowNotAvailable(true);
    }
  };

  const handleMouseLeave = () => {
    setShowNotAvailable(false);
  };

  const handleMouseMove = (event) => {
    setMousePos({ x: event.clientX + 10, y: event.clientY + 10 });
  };

  const changeSlide = (n) => {
    slideIndex.current =
      (slideIndex.current + n + componentData.images?.length) %
      componentData.images?.length;
  };

  const openModal = (index) => {
    setModalIndex(index);
    setShowModal(true);
    document.body.classList.add("modal-active");
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-active");
  };

  const changeSlideModal = (n) => {
    setModalIndex(
      (prevIndex) =>
        (prevIndex + n + componentData.images?.length) %
        componentData.images?.length
    );
  };

  if (!componentData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{componentData.name}</h1>
      <p>{componentData.description}</p>

      {/* Tabs */}
      <div className="tabs">
        {componentData.tabs?.map((tab, index) => (
          <button
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="tab-content-container">
        {componentData.tabs?.map((tab, index) => (
          <div
            key={index}
            className={`tab-content ${activeTab === index ? "active" : ""}`}
          >
            <div dangerouslySetInnerHTML={{ __html: tab.content }} />
            {tab.name === "Description" && componentData.images?.length > 0 && (
              <div className="slideshow-container">
                <button
                  className={`prev ${
                    componentData.images?.length < 4 ? "not-allowed" : ""
                  }`}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  onClick={() => changeSlide(-1)}
                >
                  ❮
                </button>

                <div className="images-wrapper">
                  {componentData.images?.map((image, index) => (
                    <img
                      key={index}
                      ref={(el) => componentList.current.push(image)}
                      src={image.imgSrc}
                      alt={image.name}
                      className="component-image"
                      onClick={() => openModal(index)}
                    />
                  ))}
                </div>

                <button
                  className={`next ${
                    componentData.images?.length < 4 ? "not-allowed" : ""
                  }`}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  onClick={() => changeSlide(1)}
                >
                  ❯
                </button>

                {showNotAvailable && (
                  <i
                    className="fa-regular fa-circle-xmark unavailable-icon"
                    style={{ top: `${mousePos.y}px`, left: `${mousePos.x}px` }}
                  ></i>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            className="modal-content"
            src={componentData.images[modalIndex]?.imgSrc}
            alt="modal-image"
          />
        </div>
      )}

      {/* Modal navigation */}
      {showModal && componentData.images?.length > 1 && (
        <>
          <button
            className="modal-prev"
            onClick={(e) => {
              e.stopPropagation();
              changeSlideModal(-1);
            }}
          >
            &lsaquo;
          </button>
          <button
            className="modal-next"
            onClick={(e) => {
              e.stopPropagation();
              changeSlideModal(1);
            }}
          >
            &rsaquo;
          </button>
        </>
      )}
    </div>
  );
};

export default ComponentDetailPage;
