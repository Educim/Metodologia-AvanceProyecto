const { sendSuccess, sendError } = require('../handlers/responseHandler');

const voluntarioService = require('../services/voluntarioService');

const {
  createVoluntarioSchema,
  updateVoluntarioSchema
} = require('../validations/voluntarioValidation');

const crearVoluntario = async (req, res) => {
  try {
    const { error, value } = createVoluntarioSchema.validate(req.body);

    if(error){
      return sendError(
        res,
        'Error en validación de datos',
        400,
        error.details.map(err => err.message)
      );
    }

    const voluntarioCreado =
      await voluntarioService.crearVoluntario(value);

    return sendSuccess(res,voluntarioCreado,'Voluntario creado exitosamente',201);

  } catch (error) {
    return sendError(res, 'Error al crear voluntario', 500);
  }
};

const obtenerTodosLosVoluntarios = async (req, res) => {
  try {

    const voluntarios =
      await voluntarioService.obtenerTodosLosVoluntarios();

    return sendSuccess(res,voluntarios,'Voluntarios obtenidos exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener voluntarios', 500);
  }
};

const obtenerVoluntarioPorId = async (req, res) => {
  try {

    const { id } = req.params;

    const voluntario =
      await voluntarioService.obtenerVoluntarioPorId(Number(id));

    if(!voluntario){
      return sendError(res, 'Voluntario no encontrado', 404);
    }

    return sendSuccess(res,voluntario,'Voluntario obtenido exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener voluntario', 500);
  }
};

const actualizarVoluntario = async (req, res) => {
  try {

    const { error, value } =
      updateVoluntarioSchema.validate(req.body);

    if (error) {
      return sendError(
        res,
        'Error en validación de datos',
        400,
        error.details.map(err => err.message)
      );
    }

    const { id } = req.params;

    const voluntarioActualizado =
      await voluntarioService.actualizarVoluntario(
        Number(id),
        value
      );

    if(!voluntarioActualizado){
      return sendError(res, 'Voluntario no encontrado', 404);
    }

    return sendSuccess(res,voluntarioActualizado,'Voluntario actualizado exitosamente');

  } catch (error) {
    return sendError(res, 'Error al actualizar voluntario', 500);
  }
};

const eliminarVoluntario = async (req, res) => {
  try {

    const { id } = req.params;

    const eliminado =
      await voluntarioService.eliminarVoluntario(Number(id));

    if(!eliminado){
      return sendError(res, 'Voluntario no encontrado', 404);
    }

    return sendSuccess(res,null,'Voluntario eliminado exitosamente');

  } catch (error) {
    return sendError(res, 'Error al eliminar voluntario', 500);
  }
};

const activarCuenta = async (req, res) => {
  try {

    const { id } = req.params;

    const voluntario =
      await voluntarioService.activarCuenta(Number(id));

    if(!voluntario){
      return sendError(res, 'Voluntario no encontrado', 404);
    }

    return sendSuccess(res,voluntario,'Cuenta activada exitosamente');

  } catch (error) {
    return sendError(res, 'Error al activar cuenta', 500);
  }
};


module.exports = {
  crearVoluntario,
  obtenerTodosLosVoluntarios,
  obtenerVoluntarioPorId,
  actualizarVoluntario,
  activarCuenta,
  eliminarVoluntario
};