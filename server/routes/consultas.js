const express = require("express");
const router = express.Router();
const consultas = require("../controllers/consultasController");

router.get("/consulta1", consultas.getConsulta1);
router.get("/consulta2", consultas.getConsulta2);
router.get("/consulta3", consultas.getConsulta3);
router.get("/consulta4", consultas.getConsulta4);
router.get("/consulta5", consultas.getConsulta5);
router.get("/consulta6", consultas.getConsulta6);
router.get("/consulta7", consultas.getConsulta7);
router.get("/consulta8", consultas.getConsulta8);
router.get("/consulta9", consultas.getConsulta9);
router.get("/consulta10", consultas.getConsulta10);
router.get("/consulta11", consultas.getConsulta11);
router.get("/consulta12", consultas.getConsulta12);
router.get("/consulta13", consultas.getConsulta13);
router.get("/consulta14", consultas.getConsulta14);
router.get("/consulta15", consultas.getConsulta15);
router.get("/consulta16", consultas.getConsulta16);
router.get("/consulta17", consultas.getConsulta17);
router.get("/consulta18", consultas.getConsulta18);
router.get("/consulta19", consultas.getConsulta19);
router.get("/consulta20", consultas.getConsulta20);

module.exports = router;
