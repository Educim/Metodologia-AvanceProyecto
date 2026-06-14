const db = require('../config/db');
const Familia = require('../entities/Familia');

const familiaRepository = db.getRepository(Familia);

const crearFamilia = async (datosFamilia) => {
  const nuevaFamilia = familiaRepository.create(datosFamilia);
  return await familiaRepository.save(nuevaFamilia);
};

const obtenerTodasLasFamilias = async () => {
  return await familiaRepository.find();
};

const obtenerFamiliaPorId = async (id) => {
  return await familiaRepository.findOneBy({ id });
};

const actualizarFamilia = async (id, datosActualizados) => {
  const familiaExistente = await obtenerFamiliaPorId(id);

  if(!familiaExistente){
    return null;
  }

  await familiaRepository.update(id, datosActualizados);

  return await obtenerFamiliaPorId(id);
};

const eliminarFamilia = async (id) => {
  const result = await familiaRepository.delete(id);

  return result.affected > 0;
};

module.exports = {
  crearFamilia,
  obtenerTodasLasFamilias,
  obtenerFamiliaPorId,
  actualizarFamilia,
  eliminarFamilia
};