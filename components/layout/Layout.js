import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function Layout(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    function syncLoginState() {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }

    syncLoginState();

    // Listen for login/logout in other tabs/windows
    window.addEventListener("storage", syncLoginState);

    // Patch localStorage.setItem/removeItem to trigger syncLoginState in this tab
    const origSetItem = localStorage.setItem;
    const origRemoveItem = localStorage.removeItem;
    localStorage.setItem = function (key, value) {
      origSetItem.apply(this, arguments);
      if (key === "isLoggedIn") syncLoginState();
    };
    localStorage.removeItem = function (key) {
      origRemoveItem.apply(this, arguments);
      if (key === "isLoggedIn") syncLoginState();
    };

    return () => {
      window.removeEventListener("storage", syncLoginState);
      localStorage.setItem = origSetItem;
      localStorage.removeItem = origRemoveItem;
    };
  }, []);

  return (
    <div className={classes.layout}>
      {isLoggedIn === null ? null : isLoggedIn ? (
        <MainNavigation />
      ) : (
        <div
          style={{
            width: "100%",
            background: "#ff451a",
            color: "#fff",
            padding: "32px 0",
            textAlign: "center",
            borderBottom: "1px solid #d13a16",
            fontWeight: "bold",
            letterSpacing: "1px",
            fontSize: "1.2rem",
            minHeight: "72px",
            boxSizing: "border-box",
          }}
        >
          Welcome to the Customer Support Platform. Please log in to continue.
        </div>
      )}
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
