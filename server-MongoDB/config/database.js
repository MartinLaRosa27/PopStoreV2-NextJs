const mongoose = require("mongoose");
const Banner = require("../models/Banner");
const Product = require("../models/Product");
const Category = require("../models/Category");
require("dotenv").config({ path: ".env" });

module.exports.conectarBD = () => {
  mongoose.connect(`${process.env.MONGO_URI}${process.env.MONGO_DATABASE}`);
};
