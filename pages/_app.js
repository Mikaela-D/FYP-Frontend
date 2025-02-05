import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { GlobalContextProvider } from "./store/globalContext";
import { CartProvider } from "../components/generic/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <CartProvider>
        {" "}
        {/* Wrap with CartProvider */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
