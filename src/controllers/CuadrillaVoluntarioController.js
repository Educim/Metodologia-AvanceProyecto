const { sendSuccess, sendError } = require('../handlers/responseHandler');
const cuadrillaVoluntarioService = require('../services/cuadrillaVoluntarioService');

const asignarVoluntario = async (req, res) => {
  try {

    const asignacion = await cuadrillaVoluntarioService.asignarVoluntario(req.body);

    if (!asignacion) {
      return sendError(res, 'Cuadrilla o voluntario no encontrado', 404);
    }

    return sendSuccess(res, asignacion, 'Voluntario asignado exitosamente', 201);

  } catch (error) {
      console.log("ERROR:");
      console.log(error);
    return sendError(res, 'Error al asignar voluntario', 500);
  }
};

const obtenerTodasLasAsignaciones = async (req, res) => {
  try {

    const asignaciones = await cuadrillaVoluntarioService.obtenerTodasLasAsignaciones();

    return sendSuccess(res, asignaciones, 'Asignaciones obtenidas exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener asignaciones', 500);
  }
};

const obtenerAsignacionPorId = async (req, res) => {
  try {

    const asignacion = await cuadrillaVoluntarioService.obtenerAsignacionPorId(
      Number(req.params.id)
    );

    if (!asignacion) {
      return sendError(res, 'Asignación no encontrada', 404);
    }

    return sendSuccess(res, asignacion, 'Asignación obtenida exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener asignación', 500);
  }
};

const actualizarAsignacion = async (req, res) => {
  try {

    const asignacion = await cuadrillaVoluntarioService.actualizarAsignacion(
      Number(req.params.id),
      req.body
    );

    if (!asignacion) {
      return sendError(res, 'Asignación no encontrada', 404);
    }

    return sendSuccess(res, asignacion, 'Asignación actualizada exitosamente');

  } catch (error) {
    return sendError(res, 'Error al actualizar asignación', 500);
  }
};

const eliminarAsignacion = async (req, res) => {
  try {

    const eliminado = await cuadrillaVoluntarioService.eliminarAsignacion(
      Number(req.params.id)
    );

    if (!eliminado) {
      return sendError(res, 'Asignación no encontrada', 404);
    }

    return sendSuccess(res, null, 'Asignación eliminada exitosamente');

  } catch (error) {
    return sendError(res, 'Error al eliminar asignación', 500);
  }
};

module.exports = {
  asignarVoluntario,
  obtenerTodasLasAsignaciones,
  obtenerAsignacionPorId,
  actualizarAsignacion,
  eliminarAsignacion
};