const express = require('express');
const router = express.Router();

const voluntarioController =
require('../controllers/voluntarioController');

router.post('/', voluntarioController.crearVoluntario);

router.get('/',  voluntarioController.obtenerTodosLosVoluntarios);

router.get('/:id',  voluntarioController.obtenerVoluntarioPorId);

router.patch('/:id',  voluntarioController.actualizarVoluntario);

router.delete('/:id',  voluntarioController.eliminarVoluntario);

router.patch(  '/:id/activar',  voluntarioController.activarCuenta
);

module.exports = router;