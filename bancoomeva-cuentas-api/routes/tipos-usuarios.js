const express = require('express');
const router = express.Router();

const TipoUsuarioController = require('../controllers/tipo-usuario-controller');

router.get('/', TipoUsuarioController.getTiposUsuarios);

module.exports = router;
