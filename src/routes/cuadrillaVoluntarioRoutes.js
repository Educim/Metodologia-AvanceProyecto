const express = require('express');
const router = express.Router();

const cuadrillaVoluntarioController = require('../controllers/cuadrillaVoluntarioController');

router.post('/', cuadrillaVoluntarioController.asignarVoluntario);

router.get('/', cuadrillaVoluntarioController.obtenerTodasLasAsignaciones);

router.get('/:id', cuadrillaVoluntarioController.obtenerAsignacionPorId);

router.patch('/:id', cuadrillaVoluntarioController.actualizarAsignacion);

router.delete('/:id', cuadrillaVoluntarioController.eliminarAsignacion);

module.exports = router;