//Aqui se guardan la URLs
const { Router } = require("express");
//const pool = require('../db')
const {
  listarUsuarios,
  listarUsuario,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
} = require("../controllers/usuario.controllers");

const router = Router();

router.get("/", listarUsuarios);

router.get("/:id", listarUsuario);

router.post("/", crearUsuario);

router.delete("/:id", eliminarUsuario);

router.put("/", actualizarUsuario);

module.exports = router;
