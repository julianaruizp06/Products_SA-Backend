//Aqui se guardan la URLs
const { Router } = require("express");
//const pool = require('../db')
const {
  listarlogins,

  eliminarLogin,
  actualizarLogin,
  validarLogin,
  crearLogin,
} = require("../controllers/login.controller");

const router = Router();

router.post("/", validarLogin);

router.post("/crear", crearLogin);

router.delete("/", eliminarLogin);

router.put("/", actualizarLogin);

module.exports = router;
