// Dependencias:
const express = require("express");
const cors = require("cors");
const router = require("./router");
const { conectarBD } = require("./config/database");
const {
  primerasCategorias,
  primerosBanners,
  primerosProductos,
} = require("./helpers/primerosDatos");
require("dotenv").config({ path: ".env" });

// Conexion Base de Datos:
conectarBD();

// Se cargan datos iniciales:
primerasCategorias();
primerosBanners();
primerosProductos();

// Servidor de Node:
const app = express();
// Configurar Cors:
app.use(cors());
// Convierte los datos del body a objetos js:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Se cargan las rutas:
app.use("/", router());

// Servidor a escuchar:
const server_port = process.env.YOUR_PORT || 80;
const server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
  console.log(
    `La aplicación esta corriendo en -> http://localhost:${server_port}`
  );
});
