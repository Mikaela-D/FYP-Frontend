import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { GlobalContextProvider } from "./store/globalContext";
import { CartProvider } from "../components/generic/CartContext";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <GlobalContextProvider>
      <CartProvider>
        <Layout>
          <Component
            {...pageProps}
            theme={theme}
            setTheme={handleThemeChange}
          />
        </Layout>
      </CartProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
