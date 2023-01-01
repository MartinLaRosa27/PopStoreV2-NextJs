const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { crearToken } = require("../helpers/jwt");

module.exports.crearUsuario = async (req, res) => {
  req.body.email = req.body.email.trim();
  req.body.password = req.body.password.trim();
  const { email, password } = req.body;
  if (email.length < 5 || email.length > 300 || password < 5 || password > 20) {
    return res.status(400).json({
      status: "error",
      message: "Error en los datos ingresados",
    });
  }
  const existeUsuario = await User.findOne({
    email,
  });
  if (existeUsuario) {
    return res.status(400).json({
      status: "error",
      message: "El email ya se encuentra registrado",
    });
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const nuevoUsuario = new User({ email, password: hashPassword });
    await nuevoUsuario.save();
    const token = crearToken(nuevoUsuario);
    return res.status(200).json({
      status: "success",
      message: "Usuario registrado con exito",
      token,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: "error", message: "No se pudo registrar el usuario" });
  }
};

module.exports.autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;
  const existeUsuario = await User.findOne({
    email,
  });
  if (!existeUsuario) {
    return res
      .status(404)
      .json({ status: "error", message: "Usuario no registrado" });
  }
  const passwordCorrecto = await bcryptjs.compare(
    password,
    existeUsuario.password
  );
  if (!passwordCorrecto) {
    return res
      .status(404)
      .json({ status: "error", message: "Password incorrecta" });
  }
  const token = crearToken(existeUsuario);
  return res
    .status(200)
    .json({ status: "success", message: "Login correcto", token });
};
