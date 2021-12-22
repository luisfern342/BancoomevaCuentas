const express = require('express');
const router = express.Router();

const CuentaController = require('../controllers/cuenta-controller');

router.get('/', CuentaController.getCuentas);
router.get('/id/:id', CuentaController.getCuentaPorId);
router.get('/numero/:numero', CuentaController.getCuentaPorNumero);
router.post('/', CuentaController.crearCuenta);

module.exports = router;
