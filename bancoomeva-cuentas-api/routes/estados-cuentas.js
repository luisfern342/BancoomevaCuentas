const express = require('express');
const router = express.Router();

const EstadoCuentaController = require('../controllers/estado-cuenta-controller');

router.get('/', EstadoCuentaController.get);

module.exports = router;
