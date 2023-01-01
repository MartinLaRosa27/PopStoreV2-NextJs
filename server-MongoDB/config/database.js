const mongoose = require("mongoose");
const User = require("../models/User");
const Category = require("../models/Category");
const Banner = require("../models/Banner");
const Product = require("../models/Product");
const Purchase = require("../models/Purchase");
require("dotenv").config({ path: ".env" });

module.exports.conectarBD = () => {
  mongoose.connect(`${process.env.MONGO_URI}${process.env.MONGO_DATABASE}`);
};
