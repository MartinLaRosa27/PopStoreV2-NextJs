const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },

  image: {
    type: Array,
    require: true,
    trim: true,
  },

  priceUSD: {
    type: Number,
    require: true,
    trim: true,
  },

  description: {
    type: String,
    require: true,
    trim: true,
  },

  stock: {
    type: Number,
    require: true,
    trim: true,
  },

  release: {
    type: Date,
    default: Date.now(),
    require: true,
  },

  quantity: {
    type: Number,
    require: true,
    trim: true,
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
});

module.exports = Product = mongoose.model("Product", ProductSchema);
