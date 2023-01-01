const Purchase = require("../models/Purchase");

module.exports.nuevaCompra = async (req, res) => {
  const { productsId } = req.body;
  try {
    const purchase = new Purchase({ productsId, userId: req.user._id });
    const resultado = await purchase.save();
    return res.status(200).json({
      status: "success",
      message: "Compra registrada con exito",
      purchase: resultado,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: "error", message: "No se pudo registrar la compra" });
  }
};
