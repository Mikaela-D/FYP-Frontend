// MainNavigation.js

import { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import HamMenu from "../generic/HamMenu";
import HamMenuFAB from "../generic/HamMenuFAB";
import GlobalContext from "../../pages/store/globalContext";
import HamMenuContent from "./HamMenuContent";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";
import StatusDropdown from "../generic/StatusDropdown";

function MainNavigation() {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();

  function toggleMenuHide() {
    globalCtx.updateGlobals({ cmd: "hideHamMenu", newVal: false });
  }

  const contents = [];
  globalCtx.theGlobalObject.meetings.forEach((element) => {
    contents.push({
      title: element.title,
      webAddress: "/" + element.meetingId,
    });
  });

  return (
    <header className={classes.header}>
      <HamMenuContent contents={contents} />
      <HamMenu toggleMenuHide={() => toggleMenuHide()} />
      <HamMenuFAB toggleMenuHide={() => toggleMenuHide()} />

      <nav>
        <ul>
          <li>
            <Link href="/inbox">Inbox</Link> (
            {globalCtx.theGlobalObject.meetings.length})
          </li>
          <li>
            <Link href="/new-meetup">New Interaction</Link>
          </li>
          <li>
            <Link href="/cart">New Ticket (Your Cart)</Link>
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
