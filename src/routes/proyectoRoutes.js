const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyectoController');

router.post('/', proyectoController.crearProyecto);

router.get('/', proyectoController.obtenerTodosLosProyectos);

router.get('/:id', proyectoController.obtenerProyectoPorId);

router.patch('/:id', proyectoController.actualizarProyecto);

router.patch('/:id/estado', proyectoController.cambiarEstadoProyecto);

router.delete('/:id', proyectoController.eliminarProyecto);

module.exports = router;