//Aqui se guardan la URLs
const { Router } = require("express");
//const pool = require('../db')
const {
  listarArticulos,
  listarArticulo,
  crearArticulo,
  eliminarArticulo,
  actualizarArticulo,
} = require("../controllers/articulo.controller");

const router = Router();

router.get("/", listarArticulos);

router.get("/:id", listarArticulo);

router.post("/", crearArticulo);

router.delete("/:id", eliminarArticulo);

router.put("/", actualizarArticulo);

module.exports = router;
