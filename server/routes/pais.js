const express = require("express");
const router = express.Router();
const pais = require("../controllers/paisController");

router.post("/create", pais.create);
router.get("/read", pais.read);
router.get("/:id", pais.getPais);
router.put("/update", pais.update);
router.delete("/delete/:id", pais.delete);

module.exports = router;
