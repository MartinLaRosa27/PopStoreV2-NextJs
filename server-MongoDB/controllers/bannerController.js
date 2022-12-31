const Banner = require("../models/Banner");

// ------------------------------------------------------------------------------
module.exports.obtenerBannersMain = async (req, res) => {
  const banners = await Banner.find({ position: "main" }).select(
    "image description"
  );
  return res.status(200).json({
    status: "success",
    message: "banners principales del sitio web.",
    banners,
  });
};

// ------------------------------------------------------------------------------
module.exports.obtenerBannersFooter = async (req, res) => {
  const banners = await Banner.find({ position: "footer" }).select(
    "image description"
  );
  return res.status(200).json({
    status: "success",
    message: "banners del pie de pagina del sitio web.",
    banners,
  });
};
