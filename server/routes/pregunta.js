const express = require("express");
const router = express.Router();
const pregunta = require("../controllers/preguntaController");

router.post("/create", pregunta.create);
router.get("/read", pregunta.read);
router.get("/:id", pregunta.getPregunta);
router.put("/update", pregunta.update);
router.delete("/delete/:id", pregunta.delete);

module.exports = router;
