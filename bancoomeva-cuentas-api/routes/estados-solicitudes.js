const express = require('express');
const router = express.Router();

const EstadoSolicitudController = require('../controllers/estado-solicitud-controller');

router.get('/', EstadoSolicitudController.getEstadosSolicitudes);

module.exports = router;
