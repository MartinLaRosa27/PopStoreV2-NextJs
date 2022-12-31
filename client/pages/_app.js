import { Toaster } from "react-hot-toast";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { StateContext } from "../context/StateContext";
import { BannerContext } from "../context/BannerContext";
import Head from "next/head";
import "../styles/globals.css";
import { ProductContext } from "../context/ProductContext";

export default function App({ Component, pageProps }) {
  return (
    <div className="main-container">
      <StateContext>
        <BannerContext>
          <ProductContext>
            <Head>
              <title>PopStore - Home</title>
            </Head>
            <Toaster />
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </ProductContext>
        </BannerContext>
      </StateContext>
    </div>
  );
}
