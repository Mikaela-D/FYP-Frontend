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

function MainNavigation() {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();

  function toggleMenuHide() {
    globalCtx.updateGlobals({ cmd: "hideHamMenu", newVal: false });
  }

  const contents = [];
  globalCtx.theGlobalObject.tickets.forEach((element) => {
    contents.push({
      title: element.title,
      webAddress: "/" + element.ticketId,
    });
  });

  return (
    <header className={classes.header}>
      <HomeIcon />
      <HamMenuContent contents={contents} />
      <HamMenu toggleMenuHide={() => toggleMenuHide()} />
      <HamMenuFAB toggleMenuHide={() => toggleMenuHide()} />

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
            <Link href="/new-ticket">New Ticket</Link>
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
