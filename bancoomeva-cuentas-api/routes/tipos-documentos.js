const express = require('express');
const router = express.Router();

const TipoDocumentoController = require('../controllers/tipo-documento-controller');

router.get('/', TipoDocumentoController.getTiposDocumentos);
router.get('/id/:id', TipoDocumentoController.getById);

module.exports = router;
