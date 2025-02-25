import { useContext, useEffect } from "react";
import GlobalContext from "../../pages/store/globalContext";
import classes from "./StatusDropdown.module.css";

export default function StatusDropdown() {
  const globalCtx = useContext(GlobalContext);

  useEffect(() => {
    const savedStatus = localStorage.getItem("userStatus");
    if (savedStatus) {
      globalCtx.updateGlobals({ cmd: "updateStatus", newVal: savedStatus });
    }
  }, []);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    localStorage.setItem("userStatus", newStatus);
    globalCtx.updateGlobals({ cmd: "updateStatus", newVal: newStatus });
  };

  return (
    <select
      className={classes.statusDropdown}
      value={globalCtx.theGlobalObject.userStatus || "available"}
      onChange={handleStatusChange}
    >
      <option value="available">⚫ Available</option>
      <option value="away">⚫ Away</option>
      <option value="offline">⚫ Offline</option>
    </select>
  );
}
