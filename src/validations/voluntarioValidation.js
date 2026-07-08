const Joi = require('joi');

const createVoluntarioSchema = Joi.object({
  nombre: Joi.string().required(),
  rut: Joi.string().required(),
  fechaNacimiento: Joi.string().required(),
  contacto: Joi.string().required(),
  habilidades: Joi.string().required()
});

const updateVoluntarioSchema = Joi.object({
  nombre: Joi.string(),
  rut: Joi.string(),
  fechaNacimiento: Joi.string(),
  contacto: Joi.string(),
  habilidades: Joi.string(),
  cuentaActiva: Joi.boolean()
});

module.exports = {
  createVoluntarioSchema,
  updateVoluntarioSchema
};