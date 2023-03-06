const { Router } = require("express");
const { sendCotizacion } = require("../controllers/notificaciones.controller");

const router = Router();

router.post("/cotizacion", sendCotizacion);

module.exports = router;
