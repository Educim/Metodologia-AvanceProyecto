const db = require('../config/db');
const Voluntario = require('../entities/Voluntario');

const voluntarioRepository = db.getRepository(Voluntario);

const crearVoluntario = async (datosVoluntario) => {
  const nuevoVoluntario = voluntarioRepository.create(datosVoluntario);
  return await voluntarioRepository.save(nuevoVoluntario);
};

const obtenerTodosLosVoluntarios = async () => {
  return await voluntarioRepository.find();
};

const obtenerVoluntarioPorId = async (id) => {
  return await voluntarioRepository.findOneBy({ id });
};

const actualizarVoluntario = async (id, datosActualizados) => {
  const voluntarioExistente = await obtenerVoluntarioPorId(id);

  if(!voluntarioExistente){
    return null;
  }

  await voluntarioRepository.update(id, datosActualizados);

  return await obtenerVoluntarioPorId(id);
};

const eliminarVoluntario = async (id) => {
  const result = await voluntarioRepository.delete(id);

  return result.affected > 0;
};

const activarCuenta = async (id) => {
  const voluntario = await obtenerVoluntarioPorId(id);

  if(!voluntario){
    return null;
  }

  await voluntarioRepository.update(id, {cuentaActiva: true});

  return await obtenerVoluntarioPorId(id);
};

module.exports = {
  crearVoluntario,
  obtenerTodosLosVoluntarios,
  obtenerVoluntarioPorId,
  actualizarVoluntario,
  eliminarVoluntario,
  activarCuenta
};