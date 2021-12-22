const express = require('express');
const router = express.Router();

const TipoMovimientoController = require('../controllers/tipo-movimiento-controller');

router.get('/', TipoMovimientoController.getTiposMovimientos);
router.get('/id/:id', TipoMovimientoController.getById);

module.exports = router;
