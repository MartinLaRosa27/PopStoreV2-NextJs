import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const Context = createContext();

export const BannerContext = ({ children }) => {
  // --------------------------------------------------------------------------
  const [mainBanners, setMainBanners] = useState(null);
  const [footerBanners, setFooterBanners] = useState(null);

  // --------------------------------------------------------------------------
  const obtenerBannersMain = async () => {
    await axios
      .get(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/obtener-banner-main`)
      .then(async (res) => {
        setMainBanners(res.data.banners);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // --------------------------------------------------------------------------
  const obtenerBannersFooter = async () => {
    await axios
      .get(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/obtener-banner-footer`
      )
      .then(async (res) => {
        setFooterBanners(res.data.banners);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // --------------------------------------------------------------------------
  return (
    <Context.Provider
      value={{
        mainBanners,
        footerBanners,
        obtenerBannersMain,
        obtenerBannersFooter,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// --------------------------------------------------------------------------
export const useBannerContext = () => {
  return useContext(Context);
};
