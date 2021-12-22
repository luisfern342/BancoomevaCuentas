const express = require('express');
const router = express.Router();

const TipoDocumentoController = require('../controllers/tipo-documento-controller');

router.get('/', TipoDocumentoController.getTiposDocumentos);

module.exports = router;
