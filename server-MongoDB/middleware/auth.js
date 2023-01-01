const { decodeToken } = require("../helpers/jwt");

module.exports.auth = (req, res, next) => {
  const token = req.body.auth;
  if (!token) {
    return res.status(404).send({
      status: "error - token",
      message: "No se encuentra cabecera de autenticación",
    });
  }
  try {
    const payload = decodeToken(token);
    req.user = payload;
  } catch (e) {
    return res.status(404).send({
      status: "error - token",
      message: "Token Expirado",
    });
  }
  next();
};

module.exports.vefificarToken = async (req, res) => {
  const token = req.body.auth;
  if (!token) {
    return res.status(404).send({
      status: "error",
      message: "No se encuentra cabecera de autenticación",
    });
  }
  try {
    decodeToken(token);
  } catch (e) {
    return res.status(404).send({
      status: "error",
      message: "Token Expirado",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "Token Correcto",
  });
};
