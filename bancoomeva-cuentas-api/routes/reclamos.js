const express = require('express');
const router = express.Router();

const ReclamoController = require('../controllers/reclamo-controller');

router.get('/', ReclamoController.get);
router.get('/id/:id', ReclamoController.getById);
router.get('/usuario/:usuarioId', ReclamoController.getByUsuarioId);
router.get('/movimiento/:movimientoId', ReclamoController.getByMovimientoId);
router.get('/respuesta/:respuestaId', ReclamoController.getByRespuestaId);
router.post('/', ReclamoController.post);

module.exports = router;
