const express = require('express');
const router = express.Router();

const TipoUsuarioController = require('../controllers/tipo-usuario-controller');

router.get('/', TipoUsuarioController.getTiposUsuarios);
router.get('/id/:id', TipoUsuarioController.getById);

module.exports = router;
