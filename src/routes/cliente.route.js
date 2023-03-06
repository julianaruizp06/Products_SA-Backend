//Aqui se guardan la URLs
const { Router } = require("express");
//const pool = require('../db')
const {
  listarClientes,
  listarCliente,
  crearCliente,
  eliminarCliente,
  actualizarCliente,
} = require("../controllers/cliente.controllers");

const router = Router();

router.get("/", listarClientes);

router.get("/:id", listarCliente);

router.post("/", crearCliente);

router.delete("/:id", eliminarCliente);

router.put("/", actualizarCliente);

module.exports = router;
