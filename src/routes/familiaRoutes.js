const express = require('express');
const router = express.Router();

const familiaController = require('../controllers/familiaController');

router.post('/', familiaController.crearFamilia);

router.get('/', familiaController.obtenerTodasLasFamilias);

router.get('/:id', familiaController.obtenerFamiliaPorId);

router.patch('/:id', familiaController.actualizarFamilia);

router.delete('/:id', familiaController.eliminarFamilia);

module.exports = router;