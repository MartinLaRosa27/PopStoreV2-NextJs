const express = require("express");
const router = express.Router();
const {
  obtenerBannersMain,
  obtenerBannersFooter,
} = require("./controllers/bannerController");
const {
  obtenerTodosProductos,
  obtenerTodosProductosCategoria,
  obtenerProductoId,
  obtenerProductoNombre,
  obtenerProductosPorCategoriaId,
} = require("./controllers/productcController");
const { obtenerTodasCategorias } = require("./controllers/categoryController");
const {
  crearUsuario,
  autenticarUsuario,
} = require("./controllers/userController");
const { nuevaCompra } = require("./controllers/purchaseController");
const { vefificarToken, auth } = require("./middleware/auth");

// ------------------------------------------------------------------------------
module.exports = () => {
  // bannerController:
  router.get("/obtener-banner-footer", obtenerBannersFooter);
  router.get("/obtener-banner-main", obtenerBannersMain);

  // productcController
  router.get("/obtener-todos-productos", obtenerTodosProductos);
  router.get("/obtener-producto-id/:id", obtenerProductoId);
  router.get("/obtener-producto-nombre/:name", obtenerProductoNombre);
  router.get(
    "/obtener-productos-categoria-id/:categoryId",
    obtenerProductosPorCategoriaId
  );
  router.get(
    "/obtener-todos-productos-categoria/:category",
    obtenerTodosProductosCategoria
  );

  // obtenerTodasCategorias
  router.get("/obtener-todas-categorias", obtenerTodasCategorias);

  // userController:
  router.post("/crear-usuario", crearUsuario);
  router.post("/autenticar-usuario", autenticarUsuario);

  // purchaseController:
  router.post("/nueva-compra", auth, nuevaCompra);

  // auth:
  router.put("/vefificar-token", vefificarToken);

  return router;
};
