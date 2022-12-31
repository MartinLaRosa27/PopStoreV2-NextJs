import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useBannerContext } from "../context/BannerContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const MainBanner = () => {
  // -----------------------------------------------------------------
  const { mainBanners, obtenerBannersMain } = useBannerContext();

  // -----------------------------------------------------------------
  useEffect(() => {
    obtenerBannersMain();
  }, []);

  // -----------------------------------------------------------------
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      autoPlay
      infiniteLoop
      autoPlaySpeed={3000}
      showStatus={false}
    >
      {mainBanners !== null &&
        mainBanners.map((mainBanner) => {
          return (
            <div className="hero-banner-container" key={mainBanner._id}>
              <img
                src={mainBanner.image}
                alt={mainBanner.description}
                className="hero-banner-image"
              ></img>
            </div>
          );
        })}
    </Carousel>
  );
};
