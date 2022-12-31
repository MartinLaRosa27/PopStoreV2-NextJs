import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useBannerContext } from "../context/BannerContext";

export const FooterBanner = () => {
  // -----------------------------------------------------------------
  const { footerBanners, obtenerBannersFooter } = useBannerContext();

  // -----------------------------------------------------------------
  useEffect(() => {
    obtenerBannersFooter();
  }, []);

  // -----------------------------------------------------------------
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      showIndicators={false}
      autoPlay
      infiniteLoop
      autoPlaySpeed={3000}
      showStatus={false}
    >
      {footerBanners !== null &&
        footerBanners.map((footerBanner) => {
          return (
            <div className="footer-banner-container" key={footerBanner._id}>
              <img
                src={footerBanner.image}
                alt={footerBanner.description}
                className="footer-banner-image"
              ></img>
            </div>
          );
        })}
    </Carousel>
  );
};
