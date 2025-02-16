// HamMenuContent.js

import classes from "./HamMenuContent.module.css";
import { useState, useContext } from "react";
import GlobalContext from "../../pages/store/globalContext";
import ProductsPopup from "../generic/ProductsPopup";
import { useRouter } from "next/router";

export default function HamMenuContent({ onClose = () => {} }) {
  const globalCtx = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [popupToggle, setPopupToggle] = useState(false);
  const router = useRouter();

  const categories = ["Food", "Clothes", "Furniture", "Miscellaneous"];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPopupToggle(true);
  };

  const handleClosePopup = () => {
    setSelectedCategory(null);
    setPopupToggle(false);
  };

  const closeMenu = () => {
    globalCtx.updateGlobals({ cmd: "hideHamMenu", newVal: true });
    setPopupToggle(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const navigateToTutorial = () => {
    router.push("/tutorial");
    closeMenu();
  };

  const navigateToStationSelection = () => {
    router.push("/station-selection");
    closeMenu();
  };

  const navigateToAgentStats = () => {
    router.push("/agent-stats");
    closeMenu();
  };

  if (globalCtx.theGlobalObject.hideHamMenu) {
    return null;
  }

  return (
    <>
      <div className={classes.background} onClick={closeMenu}>
        <div
          className={classes.mainContent}
          onClick={(e) => e.stopPropagation()}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className={classes.menuItem}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
          <div className={classes.menuItem} onClick={navigateToTutorial}>
            Tutorial
          </div>
          <div
            className={classes.menuItem}
            onClick={navigateToStationSelection}
          >
            Station Selection
          </div>
          <div className={classes.menuItem} onClick={navigateToAgentStats}>
            Agent Stats
          </div>
        </div>
      </div>

      {popupToggle && selectedCategory && (
        <ProductsPopup
          category={selectedCategory}
          products={globalCtx.theGlobalObject.meetings}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}
