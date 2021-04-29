const express = require("express");
const router = express.Router();
const respuesta = require("../controllers/respuestaController");

router.get("/read", respuesta.read);
router.get("/:id", respuesta.getRespuesta);
router.put("/update", respuesta.update);

module.exports = router;
