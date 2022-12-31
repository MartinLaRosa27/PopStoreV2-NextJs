const Product = require("../models/Product");
const Category = require("../models/Category");

// ------------------------------------------------------------------------------
module.exports.obtenerTodosProductos = async (req, res) => {
  const products = await Product.find({}).select(
    "name image priceUSD description release stock"
  );
  return res.status(200).json({
    status: "success",
    message: "Todos los productos publicados",
    products,
  });
};

// ------------------------------------------------------------------------------
module.exports.obtenerTodosProductosCategoria = async (req, res) => {
  const category = req.params.category.toUpperCase();
  let categorySearch = [];
  let products = [];
  categorySearch = await Category.findOne({ name: category }).select("_id");
  if (categorySearch !== null) {
    products = await Product.find({
      categoryId: categorySearch._id,
    }).select("name image priceUSD description release stock");
  }
  return res.status(200).json({
    status: "success",
    message: `Todos los productos publicados e la categoria ${category}`,
    products,
  });
};

// ------------------------------------------------------------------------------
module.exports.obtenerProductosPorCategoriaId = async (req, res) => {
  const categoryId = req.params.categoryId;
  let products = null;
  try {
    products = await Product.find({
      categoryId,
    }).select("name image priceUSD description release stock");
  } catch (e) {
    products = [];
  }
  return res.status(200).json({
    status: "success",
    message: "Todos los productos publicados",
    products,
  });
};

// ------------------------------------------------------------------------------
module.exports.obtenerProductoId = async (req, res) => {
  const _id = req.params.id;
  let product = null;
  try {
    product = await Product.findOne({
      _id,
    }).select("name image priceUSD description release stock categoryId");
  } catch (e) {
    product = {};
  }
  return res.status(200).json({
    status: "success",
    message: `Producto con el id {_id}`,
    product,
  });
};

// ------------------------------------------------------------------------------
module.exports.obtenerProductoNombre = async (req, res) => {
  const name = req.params.name;
  let products = null;
  try {
    products = await Product.find({
      name: { $regex: new RegExp(".*" + name, "i") },
    }).select("name image priceUSD description release stock");
  } catch (e) {
    products = [];
  }
  return res.status(200).json({
    status: "success",
    message: `Producto con nombre similiar a \"${name}\"`,
    products,
  });
};
