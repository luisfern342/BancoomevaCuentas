const express = require('express');
const router = express.Router();

const RespuestaController = require('../controllers/respuesta-controller');

router.get('/', RespuestaController.getRespuestas);
router.get('/id/:id', RespuestaController.getById);

module.exports = router;
