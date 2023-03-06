//Aqui se guardan la URLs
const { Router } = require("express");
//const pool = require('../db')
const {
  listarCotizaciones,
  crearCotizacion,
  eliminarCotizacion,
  getCotizaciones,
  getSingleCotizacionDetail,
  updateCotizacionDetail,
} = require("../controllers/cotizacion.controller");

const router = Router();

router.get("/", getCotizaciones);
router.get("/:id", getSingleCotizacionDetail);
router.post("/", crearCotizacion);
router.delete("/:id", eliminarCotizacion);
router.put("/", updateCotizacionDetail);

module.exports = router;
