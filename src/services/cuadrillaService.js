const db = require('../config/db');

const Cuadrilla = require('../entities/Cuadrilla');
const Proyecto = require('../entities/Proyecto');
const Voluntario = require('../entities/Voluntario');

const voluntarioRepository = db.getRepository(Voluntario);
const cuadrillaRepository = db.getRepository(Cuadrilla);
const proyectoRepository = db.getRepository(Proyecto);

const crearCuadrilla = async (datosCuadrilla) => {

  const proyecto = await proyectoRepository.findOneBy({
    id: datosCuadrilla.proyectoId
  });

  if (!proyecto) {
    return null;
  }

  const jefe = await voluntarioRepository.findOneBy({
    id: datosCuadrilla.jefeId
  });

  if (!jefe) {
    throw new Error('El voluntario no existe.');
  }

  if (!jefe.cuentaActiva) {
    throw new Error('El voluntario debe tener la cuenta activa para ser jefe.');
  }

  const nuevaCuadrilla = cuadrillaRepository.create({
    nombreCuadrilla: datosCuadrilla.nombreCuadrilla,
    estado: datosCuadrilla.estado,
    proyecto,
    jefe
  });

  return await cuadrillaRepository.save(nuevaCuadrilla);
};

const obtenerTodasLasCuadrillas = async () => {
  return await cuadrillaRepository.find({
    relations: ['proyecto', 'jefe']
  });
};

const obtenerCuadrillaPorId = async (id) => {
  return await cuadrillaRepository.findOne({
    where: { id },
    relations: ['proyecto', 'jefe']
  });
};

const actualizarCuadrilla = async (id, datosActualizados) => {

  const cuadrillaExistente = await obtenerCuadrillaPorId(id);

  if (!cuadrillaExistente) {
    return null;
  }

  if (datosActualizados.proyectoId) {

    const proyecto = await proyectoRepository.findOneBy({
      id: datosActualizados.proyectoId
    });

    if (!proyecto) {
      throw new Error('El proyecto no existe.');
    }

    cuadrillaExistente.proyecto = proyecto;
  }

  if (datosActualizados.jefeId) {

    const jefe = await voluntarioRepository.findOneBy({
      id: datosActualizados.jefeId
    });

    if (!jefe) {
      throw new Error('El voluntario no existe.');
    }

    if (!jefe.cuentaActiva) {
      throw new Error('El voluntario debe tener la cuenta activa para ser jefe.');
    }

    cuadrillaExistente.jefe = jefe;
  }

  if (datosActualizados.nombreCuadrilla !== undefined) {
    cuadrillaExistente.nombreCuadrilla = datosActualizados.nombreCuadrilla;
  }

  if (datosActualizados.estado !== undefined) {
    cuadrillaExistente.estado = datosActualizados.estado;
  }

  await cuadrillaRepository.save(cuadrillaExistente);

  return await obtenerCuadrillaPorId(id);
};

const eliminarCuadrilla = async (id) => {

  const result = await cuadrillaRepository.delete(id);

  return result.affected > 0;
};

module.exports = {
  crearCuadrilla,
  obtenerTodasLasCuadrillas,
  obtenerCuadrillaPorId,
  actualizarCuadrilla,
  eliminarCuadrilla
};