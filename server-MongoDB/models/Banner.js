const mongoose = require("mongoose");

const BannerSchema = mongoose.Schema({
  image: {
    type: String,
    require: true,
    trim: true,
  },

  description: {
    type: String,
    require: true,
    trim: true,
  },

  position: {
    type: String,
    require: true,
    trim: true,
  },
});

module.exports = Banner = mongoose.model("Banner", BannerSchema);
