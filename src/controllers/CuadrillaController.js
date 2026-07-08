const { sendSuccess, sendError } = require('../handlers/responseHandler');
const cuadrillaService = require('../services/cuadrillaService');

const crearCuadrilla = async (req, res) => {
  try {

    const cuadrilla = await cuadrillaService.crearCuadrilla(req.body);

    if (!cuadrilla) {
      return sendError(res, 'Proyecto no encontrado', 404);
    }

    return sendSuccess(res, cuadrilla, 'Cuadrilla registrada exitosamente', 201);

  } catch (error) {

    console.log("ERROR:");
    console.log(error);

    return sendError(res, error.message, 500);
  }
 // } catch (error) {
   //< return sendError(res, 'Error al registrar cuadrilla', 500);
  //}
};

const obtenerTodasLasCuadrillas = async (req, res) => {
  try {

    const cuadrillas = await cuadrillaService.obtenerTodasLasCuadrillas();

    return sendSuccess(res, cuadrillas, 'Cuadrillas obtenidas exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener cuadrillas', 500);
  }
};

const obtenerCuadrillaPorId = async (req, res) => {
  try {

    const cuadrilla = await cuadrillaService.obtenerCuadrillaPorId(
      Number(req.params.id)
    );

    if (!cuadrilla) {
      return sendError(res, 'Cuadrilla no encontrada', 404);
    }

    return sendSuccess(res, cuadrilla, 'Cuadrilla obtenida exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener cuadrilla', 500);
  }
};

const actualizarCuadrilla = async (req, res) => {
  try {

    const cuadrilla = await cuadrillaService.actualizarCuadrilla(
      Number(req.params.id),
      req.body
    );

    if (!cuadrilla) {
      return sendError(res, 'Cuadrilla o proyecto no encontrado', 404);
    }

    return sendSuccess(res, cuadrilla, 'Cuadrilla actualizada exitosamente');

  } catch (error) {
    return sendError(res, 'Error al actualizar cuadrilla', 500);
  }
};

const eliminarCuadrilla = async (req, res) => {
  try {

    const eliminado = await cuadrillaService.eliminarCuadrilla(
      Number(req.params.id)
    );

    if (!eliminado) {
      return sendError(res, 'Cuadrilla no encontrada', 404);
    }

    return sendSuccess(res, null, 'Cuadrilla eliminada exitosamente');

  } catch (error) {
    return sendError(res, 'Error al eliminar cuadrilla', 500);
  }
};

module.exports = {
  crearCuadrilla,
  obtenerTodasLasCuadrillas,
  obtenerCuadrillaPorId,
  actualizarCuadrilla,
  eliminarCuadrilla
};