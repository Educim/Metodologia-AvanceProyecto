const express = require('express');
const router = express.Router();

const cuadrillaController = require('../controllers/cuadrillaController');

router.post('/', cuadrillaController.crearCuadrilla);

router.get('/', cuadrillaController.obtenerTodasLasCuadrillas);

router.get('/:id', cuadrillaController.obtenerCuadrillaPorId);

router.patch('/:id', cuadrillaController.actualizarCuadrilla);

router.delete('/:id', cuadrillaController.eliminarCuadrilla);

module.exports = router;