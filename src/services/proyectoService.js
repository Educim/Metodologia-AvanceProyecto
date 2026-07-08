const db = require('../config/db');
const Proyecto = require('../entities/Proyecto');

const proyectoRepository = db.getRepository(Proyecto);

const crearProyecto = async (datosProyecto) => {
  const nuevoProyecto = proyectoRepository.create(datosProyecto);
  return await proyectoRepository.save(nuevoProyecto);
};

const obtenerTodosLosProyectos = async () => {
  return await proyectoRepository.find();
};

const obtenerProyectoPorId = async (id) => {
  return await proyectoRepository.findOneBy({ id });
};

const actualizarProyecto = async (id, datosActualizados) => {
  const proyectoExistente = await obtenerProyectoPorId(id);

  if (!proyectoExistente) {
    return null;
  }

  await proyectoRepository.update(id, datosActualizados);

  return await obtenerProyectoPorId(id);
};

const cambiarEstadoProyecto = async (id, estado) => {
  const proyectoExistente = await obtenerProyectoPorId(id);

  if (!proyectoExistente) {
    return null;
  }

  const datosActualizar = {
    estado: estado
  };

  if (estado === 'En ejecución' && !proyectoExistente.fechaInicio) {
    datosActualizar.fechaInicio = new Date();
  }

  if (estado === 'Finalizado') {
    datosActualizar.fechaTermino = new Date();
  }

  await proyectoRepository.update(id, datosActualizar);

  return await obtenerProyectoPorId(id);
};

const eliminarProyecto = async (id) => {
  const result = await proyectoRepository.delete(id);

  return result.affected > 0;
};

module.exports = {
  crearProyecto,
  obtenerTodosLosProyectos,
  obtenerProyectoPorId,
  actualizarProyecto,
  cambiarEstadoProyecto,
  eliminarProyecto
};