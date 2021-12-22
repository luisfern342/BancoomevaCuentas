const express = require('express');
const router = express.Router();

const RespuestaController = require('../controllers/respuesta-controller');

router.get('/', RespuestaController.getRespuestas);

module.exports = router;
