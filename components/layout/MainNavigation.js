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

  // Timer State
  const [timeLeft, setTimeLeft] = useState(null);

 
  const SALE_DURATION_HOURS = 48; 
  
  const SALE_END_TIME = useRef(new Date().getTime() + SALE_DURATION_HOURS * 60 * 60 * 1000);

  useEffect(() => {
    function updateCountdown() {
      const now = new Date().getTime();
      const difference = SALE_END_TIME.current - now; 

      if (difference <= 0) {
        setTimeLeft("Sale Ended!");
        clearInterval(timerInterval); // Stop the timer when it ends
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }

    // Update every second
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); 

    // Cleanup on component unmount
    return () => clearInterval(timerInterval);
  }, []);

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
      
      
      <div className={classes.saleTimer}>
        <p>🎅 Christmas Sale Ends In: {timeLeft ? timeLeft : "Loading..."}</p>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/">All Products</Link> ({globalCtx.theGlobalObject.meetings.length})
          </li>
          <li>
            <Link href="/new-meetup">Add New Product</Link>
          </li>
          <li>
            <Link href="/cart">Your Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
