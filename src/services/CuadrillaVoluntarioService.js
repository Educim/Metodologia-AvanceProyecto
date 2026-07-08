const db = require('../config/db');

const CuadrillaVoluntario = require('../entities/CuadrillaVoluntario');
const Cuadrilla = require('../entities/Cuadrilla');
const Voluntario = require('../entities/Voluntario');

const cuadrillaVoluntarioRepository = db.getRepository(CuadrillaVoluntario);
const cuadrillaRepository = db.getRepository(Cuadrilla);
const voluntarioRepository = db.getRepository(Voluntario);

const asignarVoluntario = async (datosAsignacion) => {

  const cuadrilla = await cuadrillaRepository.findOneBy({
    id: datosAsignacion.cuadrillaId
  });

  if (!cuadrilla) {
    throw new Error('La cuadrilla no existe.');
  }

  const voluntario = await voluntarioRepository.findOneBy({
    id: datosAsignacion.voluntarioId
  });

  if (!voluntario) {
    throw new Error('El voluntario no existe.');
  }

  if (!voluntario.cuentaActiva) {
    throw new Error('El voluntario debe tener la cuenta activa.');
  }

  if (cuadrilla.jefe && cuadrilla.jefe.id === voluntario.id) {
    throw new Error('El jefe de la cuadrilla no puede ser asignado como voluntario.');
  }

  const existeEnCuadrilla = await cuadrillaVoluntarioRepository.findOne({
    where: {
      cuadrilla: { id: datosAsignacion.cuadrillaId },
      voluntario: { id: datosAsignacion.voluntarioId }
    },
    relations: ['cuadrilla', 'voluntario']
  });

  if (existeEnCuadrilla) {
    throw new Error('El voluntario ya pertenece a esta cuadrilla.');
  }

  const existeEnOtraCuadrilla = await cuadrillaVoluntarioRepository.findOne({
    where: {
      voluntario: { id: datosAsignacion.voluntarioId }
    },
    relations: ['cuadrilla', 'voluntario']
  });

  if (existeEnOtraCuadrilla) {
    throw new Error('El voluntario ya pertenece a otra cuadrilla.');
  }

  const nuevaAsignacion = cuadrillaVoluntarioRepository.create({
    rol: datosAsignacion.rol,
    cuadrilla,
    voluntario
  });

  return await cuadrillaVoluntarioRepository.save(nuevaAsignacion);
};

const obtenerTodasLasAsignaciones = async () => {
  return await cuadrillaVoluntarioRepository.find({
    relations: ['cuadrilla', 'voluntario']
  });
};

const obtenerAsignacionPorId = async (id) => {
  return await cuadrillaVoluntarioRepository.findOne({
    where: { id },
    relations: ['cuadrilla', 'voluntario']
  });
};

const actualizarAsignacion = async (id, datosActualizados) => {

  const asignacion = await obtenerAsignacionPorId(id);

  if (!asignacion) {
    return null;
  }

  if (datosActualizados.rol !== undefined) {
    asignacion.rol = datosActualizados.rol;
  }

  await cuadrillaVoluntarioRepository.save(asignacion);

  return await obtenerAsignacionPorId(id);
};

const eliminarAsignacion = async (id) => {

  const result = await cuadrillaVoluntarioRepository.delete(id);

  return result.affected > 0;
};

module.exports = {
  asignarVoluntario,
  obtenerTodasLasAsignaciones,
  obtenerAsignacionPorId,
  actualizarAsignacion,
  eliminarAsignacion
};