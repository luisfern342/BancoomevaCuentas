const express = require('express');
const router = express.Router();

const SolicitudController = require('../controllers/solicitud-controller');

router.get('/', SolicitudController.getSolicitudes);
router.get('/id/:id', SolicitudController.getSolicitudPorId);
router.get('/cuenta/:cuentaId', SolicitudController.getSolicitudPorCuentaId);
router.get('/usuario/:usuarioId', SolicitudController.getSolicitudesPorUsuarioId);
router.get('/estado-solicitud/:estadoSolicitudId', SolicitudController.getSolicitudPorEstadoSolicitudId);
router.post('/', SolicitudController.crearSolicitud);

module.exports = router;
