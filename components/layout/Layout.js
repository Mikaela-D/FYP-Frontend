import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function Layout(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
  }, []);

  return (
    <div className={classes.layout}>
      {isLoggedIn && <MainNavigation />}
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
