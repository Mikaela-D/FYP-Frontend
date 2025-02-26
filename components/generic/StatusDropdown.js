import { useContext, useEffect, useCallback } from "react";
import GlobalContext from "../../pages/store/globalContext";
import classes from "./StatusDropdown.module.css";

export default function StatusDropdown() {
  const { theGlobalObject, updateGlobals } = useContext(GlobalContext);

  const updateStatus = useCallback(
    (status) => {
      localStorage.setItem("userStatus", status);
      updateGlobals({ cmd: "updateStatus", newVal: status });
    },
    [updateGlobals]
  );

  useEffect(() => {
    const savedStatus = localStorage.getItem("userStatus");
    if (savedStatus && savedStatus !== theGlobalObject.userStatus) {
      updateStatus(savedStatus);
    }
  }, [theGlobalObject.userStatus, updateStatus]);

  return (
    <select
      className={classes.statusDropdown}
      value={theGlobalObject.userStatus || "available"}
      onChange={(e) => updateStatus(e.target.value)}
    >
      <option value="available">🟢 Available</option>
      <option value="busy">🔴 Busy</option>
      <option value="away">🟡 Away</option>
      <option value="offline">⚫ Offline</option>
    </select>
  );
}
