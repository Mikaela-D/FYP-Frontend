// C:\Users\Mikaela\FYP-Frontend\components\layout\HamMenuContent.js

import classes from "./HamMenuContent.module.css";
import { useContext } from "react";
import GlobalContext from "../../pages/store/globalContext";
import { useRouter } from "next/router";

export default function HamMenuContent({ onClose = () => {} }) {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();

  const closeMenu = () => {
    globalCtx.updateGlobals({ cmd: "hideHamMenu", newVal: true });
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const navigateToTutorial = () => {
    router.push("/tutorial");
    closeMenu();
  };

  const navigateToAgentStats = () => {
    router.push("/agent-stats");
    closeMenu();
  };

  const navigateToQueueActivation = () => {
    router.push("/queue-activation");
    closeMenu();
  };

  const navigateToSettings = () => {
    router.push("/settings");
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
          <div className={classes.menuItem} onClick={navigateToTutorial}>
            Tutorial
          </div>
          <div className={classes.menuItem} onClick={navigateToAgentStats}>
            Agent Stats
          </div>
          <div className={classes.menuItem} onClick={navigateToQueueActivation}>
            Queue Activation
          </div>
          <div className={classes.menuItem} onClick={navigateToSettings}>
            Settings
          </div>
        </div>
      </div>
    </>
  );
}
