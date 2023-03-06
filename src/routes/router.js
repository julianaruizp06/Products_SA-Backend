const express = require("express");
const routerArticulos = require("./articulos.route");
const routerCliente = require("./cliente.route");
const routerCotizacion = require("./cotizacion.route");
const routerRol = require("./rol.route");
const routerUsuario = require("./usuario.route");
const routerLogin = require("./login.route");
const routerNotificaciones = require("./notificaciones.route");

//definimos una funcion router api donde tendra todas la rutas necesarias
//para hacer las peticiones
function routerApi(app) {
  const router = express.Router();
  app.use("/", router);

  router.use("/articulo", routerArticulos);
  router.use("/cliente", routerCliente);
  router.use("/cotizacion", routerCotizacion);
  router.use("/rol", routerRol);
  router.use("/usuario", routerUsuario);
  router.use("/login", routerLogin);
  router.use("/notificaciones", routerNotificaciones);
}

module.exports = routerApi;
