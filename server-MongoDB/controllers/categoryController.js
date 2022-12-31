const Category = require("../models/Category");

// ------------------------------------------------------------------------------
module.exports.obtenerTodasCategorias = async (req, res) => {
  const categorias = await Category.find({}).select("name banner");
  return res.status(200).json({
    status: "success",
    message: "Todas las categorias",
    categorias,
  });
};
