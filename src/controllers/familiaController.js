const { sendSuccess, sendError } = require('../handlers/responseHandler');
const familiaService = require('../services/familiaService');

const crearFamilia = async (req, res) => {
  try {

    const familia = await familiaService.crearFamilia(req.body);

    return sendSuccess(res,familia,'Familia registrada exitosamente',201);

  } catch(error){
    return sendError(res, 'Error al registrar familia', 500);
  }
};

const obtenerTodasLasFamilias = async (req, res) => {
  try {

    const familias = await familiaService.obtenerTodasLasFamilias();

    return sendSuccess(res,familias,'Familias obtenidas exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener familias', 500);
  }
};

const obtenerFamiliaPorId = async (req, res) => {
  try {

    const familia = await familiaService.obtenerFamiliaPorId(
      Number(req.params.id)
    );

    if(!familia){
      return sendError(res, 'Familia no encontrada', 404);
    }

    return sendSuccess(res,familia,'Familia obtenida exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener familia', 500);
  }
};

const actualizarFamilia = async (req, res) => {
  try {

    const familia = await familiaService.actualizarFamilia(
      Number(req.params.id),
      req.body
    );

    if(!familia){
      return sendError(res, 'Familia no encontrada', 404);
    }

    return sendSuccess(res,familia,'Familia actualizada exitosamente');

  } catch (error) {
    return sendError(res, 'Error al actualizar familia', 500);
  }
};

const eliminarFamilia = async (req, res) => {
  try {

    const eliminado = await familiaService.eliminarFamilia(
      Number(req.params.id)
    );

    if(!eliminado){
      return sendError(res, 'Familia no encontrada', 404);
    }

    return sendSuccess(res,null,'Familia eliminada exitosamente');

  } catch (error) {
    return sendError(res, 'Error al eliminar familia', 500);
  }
};

module.exports = {
  crearFamilia,
  obtenerTodasLasFamilias,
  obtenerFamiliaPorId,
  actualizarFamilia,
  eliminarFamilia
};