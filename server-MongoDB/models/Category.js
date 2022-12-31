const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },

  bannerImage: {
    type: String,
    require: true,
    trim: true,
  },
});

module.exports = Category = mongoose.model("Category", CategorySchema);
