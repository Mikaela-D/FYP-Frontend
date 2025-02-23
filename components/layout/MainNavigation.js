// MainNavigation.js

import { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import HamMenu from "../generic/HamMenu";
import HamMenuFAB from "../generic/HamMenuFAB";
import GlobalContext from "../../pages/store/globalContext";
import HamMenuContent from "./HamMenuContent";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";

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
            <Link href="/">Inbox</Link> (
            {globalCtx.theGlobalObject.meetings.length})
          </li>
          <li>
            <Link href="/new-meetup">New Ticket</Link>
          </li>
          <li>
            <Link href="/cart">Tickets</Link>
          </li>
          <li>
            <Link href="/interaction">New Interaction</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
