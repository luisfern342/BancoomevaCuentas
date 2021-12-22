const express = require('express');
const router = express.Router();

const TipoMovimientoController = require('../controllers/tipo-movimiento-controller');

router.get('/', TipoMovimientoController.getTiposMovimientos);

module.exports = router;
