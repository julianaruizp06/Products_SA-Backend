//Aqui se guardan la URLs
const { Router } = require("express");
//const pool = require('../db')
const {
  listarRoles,
  listarRol,
  crearRol,
  eliminarRol,
  actualizarRol,
} = require("../controllers/rol.controller");

const router = Router();

router.get("/", listarRoles);

router.get("/:id", listarRol);

router.post("/", crearRol);

router.delete("/", eliminarRol);

router.put("/", actualizarRol);

module.exports = router;
