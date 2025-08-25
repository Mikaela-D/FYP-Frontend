// C:\Users\Mikaela\FYP-Frontend\components\layout\MainNavigation.js

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import HamMenu from "../generic/HamMenu";
import HamMenuFAB from "../generic/HamMenuFAB";
import GlobalContext from "../../pages/store/globalContext";
import HamMenuContent from "./HamMenuContent";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";
import StatusDropdown from "../generic/StatusDropdown";
import HomeIcon from "./HomeIcon";
import NewInteractionDropdown from "../generic/NewInteractionDropdown";

function MainNavigation() {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();
  const [agentName, setAgentName] = useState("");

  useEffect(() => {
    function syncLoginState() {
      setAgentName(localStorage.getItem("agentName") || "");
    }

    syncLoginState();

    window.addEventListener("storage", syncLoginState);

    const origSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      origSetItem.apply(this, arguments);
      if (key === "isLoggedIn" || key === "agentName") syncLoginState();
    };

    return () => {
      window.removeEventListener("storage", syncLoginState);
      localStorage.setItem = origSetItem;
    };
  }, [router]);

  function toggleMenuHide() {
    globalCtx.updateGlobals({ cmd: "hideHamMenu", newVal: false });
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("agentId");
    localStorage.removeItem("agentName");
    localStorage.removeItem("assignedTickets");
    localStorage.removeItem("resolvedTickets");
    setAgentName(""); // Immediately clear agent name
    router.push("/login");
  };

  const contents = [];
  globalCtx.theGlobalObject.tickets.forEach((element) => {
    contents.push({
      title: element.title,
      webAddress: "/" + element.customerId,
    });
  });

  return (
    <header className={classes.header}>
      <HomeIcon />
      <HamMenuContent contents={contents} />
      <HamMenu toggleMenuHide={() => toggleMenuHide()} />
      <HamMenuFAB toggleMenuHide={() => toggleMenuHide()} />

      {agentName && (
        <div className={classes.agentNameDisplay}>
          <span>
            Logged in: <strong>{agentName}</strong>
          </span>
          <button
            className={classes.logoutButton}
            onClick={handleLogout}
            style={{ pointerEvents: "auto" }} // Ensure button is clickable
            tabIndex={0} // Ensure button is focusable
          >
            Logout
          </button>
        </div>
      )}

      <nav>
        <ul>
          <li>
            <Link href="/inbox">Inbox</Link> (
            {globalCtx.theGlobalObject.tickets.length})
          </li>
          <li>
            <Link href="/agent-tickets">Agent&apos;s Tickets</Link>
          </li>
          <li>
            <Link href="/tickets">Tickets</Link>
          </li>
          <li>
            <NewInteractionDropdown />
          </li>
          <li>
            <StatusDropdown />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
