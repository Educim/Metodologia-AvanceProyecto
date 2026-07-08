const { sendSuccess, sendError } = require('../handlers/responseHandler');
const proyectoService = require('../services/proyectoService');

const crearProyecto = async (req, res) => {
  try {

    const proyecto = await proyectoService.crearProyecto(req.body);

    return sendSuccess(res, proyecto, 'Proyecto registrado exitosamente', 201);

  } catch (error) {
    return sendError(res, 'Error al registrar proyecto', 500);
  }
};

const obtenerTodosLosProyectos = async (req, res) => {
  try {

    const proyectos = await proyectoService.obtenerTodosLosProyectos();

    return sendSuccess(res, proyectos, 'Proyectos obtenidos exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener proyectos', 500);
  }
};

const obtenerProyectoPorId = async (req, res) => {
  try {

    const proyecto = await proyectoService.obtenerProyectoPorId(
      Number(req.params.id)
    );
     console.log(proyecto);
    if (!proyecto) {
      return sendError(res, 'Proyecto no encontrado', 404);
    }

    return sendSuccess(res, proyecto, 'Proyecto obtenido exitosamente');

  } catch (error) {
    return sendError(res, 'Error al obtener proyecto', 500);
  }
};

const actualizarProyecto = async (req, res) => {
  try {

    const proyecto = await proyectoService.actualizarProyecto(
      Number(req.params.id),
      req.body
    );

    if (!proyecto) {
      return sendError(res, 'Proyecto no encontrado', 404);
    }

    return sendSuccess(res, proyecto, 'Proyecto actualizado exitosamente');

  } catch (error) {
    return sendError(res, 'Error al actualizar proyecto', 500);
  }
};

const cambiarEstadoProyecto = async (req, res) => {
  try {

    const proyecto = await proyectoService.cambiarEstadoProyecto(
      Number(req.params.id),
      req.body.estado
    );

    if (!proyecto) {
      return sendError(res, 'Proyecto no encontrado', 404);
    }

    return sendSuccess(res, proyecto, 'Estado del proyecto actualizado exitosamente');

  } catch (error) {
    return sendError(res, 'Error al cambiar estado del proyecto', 500);
  }
};

const eliminarProyecto = async (req, res) => {
  try {

    const eliminado = await proyectoService.eliminarProyecto(
      Number(req.params.id)
    );

    if (!eliminado) {
      return sendError(res, 'Proyecto no encontrado', 404);
    }

    return sendSuccess(res, null, 'Proyecto eliminado exitosamente');

  } catch (error) {
    return sendError(res, 'Error al eliminar proyecto', 500);
  }
};

module.exports = {
  crearProyecto,
  obtenerTodosLosProyectos,
  obtenerProyectoPorId,
  actualizarProyecto,
  cambiarEstadoProyecto,
  eliminarProyecto
};