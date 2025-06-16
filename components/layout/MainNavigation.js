// C:\Users\Mikaela\FYP-Frontend\components\layout\MainNavigation.js

import { useState, useEffect, useContext, useRef } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAgentName(localStorage.getItem("agentName") || "");
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
  }, [router]);

  function toggleMenuHide() {
    globalCtx.updateGlobals({ cmd: "hideHamMenu", newVal: false });
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Clear login flag
    localStorage.removeItem("agentId"); // Clear agent ID
    localStorage.removeItem("agentName"); // Clear agent name
    // Optionally clear assigned tickets for a clean logout
    localStorage.removeItem("assignedTickets");
    localStorage.removeItem("resolvedTickets");
    router.push("/login"); // Redirect to login page
  };

  const contents = [];
  globalCtx.theGlobalObject.tickets.forEach((element) => {
    contents.push({
      title: element.title,
      webAddress: "/" + element.customerId, // Use customerId instead of ticketId
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
        </div>
      )}

      <nav>
        <ul>
          <li>
            <Link href="/inbox">Inbox</Link> (
            {globalCtx.theGlobalObject.tickets.length})
          </li>
          <li>
            <Link href="/agent-tickets">Agent's Tickets</Link>
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
          {isLoggedIn && (
            <li>
              <button className={classes.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
