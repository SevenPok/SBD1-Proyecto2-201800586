const express = require("express");
const router = express.Router();
const invento = require("../controllers/inventoController");

router.get("/read", invento.read);
router.get("/:id", invento.getInvento);
router.put("/update", invento.update);

module.exports = router;
