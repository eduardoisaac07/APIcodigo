const express = require('express');
const EnderecoController = require('./controllers/EnderecoController');
const router = express.Router();

router.post('/enderecos', EnderecoController.buscarEGuardarEndereco);

module.exports = router;
