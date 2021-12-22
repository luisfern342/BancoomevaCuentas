const express = require('express');
const router = express.Router();

const EstadoSolicitudController = require('../controllers/estado-solicitud-controller');

router.get('/', EstadoSolicitudController.getEstadosSolicitudes);
router.get('/id/:id', EstadoSolicitudController.getById);

module.exports = router;
