const express = require('express');
const router = express.Router();

const MovimientoController = require('../controllers/movimiento-controller');

router.get('/', MovimientoController.get);
router.get('/id/:id', MovimientoController.getById);
router.get('/tipo-movimiento/:tipoMovimientoId', MovimientoController.getByTipoMovimientoId);
router.get('/cuenta/:cuentaId', MovimientoController.getByCuentaId);
router.post('/', MovimientoController.post);

module.exports = router;
