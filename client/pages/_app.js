import { Toaster } from "react-hot-toast";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { StateContext } from "../context/StateContext";
import { BannerContext } from "../context/BannerContext";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UsuarioContext";
import { PurchaseContext } from "../context/PurchaseContext";
import Head from "next/head";
import "../styles/globals.css";

// --------------------------------------------------------------------------
export default function App({ Component, pageProps }) {
  // --------------------------------------------------------------------------
  return (
    <div className="main-container">
      <StateContext>
        <BannerContext>
          <ProductContext>
            <UserContext>
              <PurchaseContext>
                <Head>
                  <title>PopStore - Home</title>
                </Head>
                <Toaster />
                <NavBar />
                <Component {...pageProps} />
                <Footer />
              </PurchaseContext>
            </UserContext>
          </ProductContext>
        </BannerContext>
      </StateContext>
    </div>
  );
}
