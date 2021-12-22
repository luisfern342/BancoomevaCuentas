const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario-controller');

router.post('/', UsuarioController.createCliente);
router.post('/login', UsuarioController.loginCliente);
router.get('/buscar-documento', UsuarioController.existsClientePorDocumento);
router.get('/buscar-email', UsuarioController.existsClientePorEmail);
router.get('/id/:id', UsuarioController.getById);
router.get('/', UsuarioController.get);

module.exports = router;
