const Joi = require('joi');

const createCuadrillaVoluntarioSchema = Joi.object({

  cuadrillaId: Joi.number()
    .integer()
    .required(),

  voluntarioId: Joi.number()
    .integer()
    .required(),

  rol: Joi.string()
    .min(3)
    .max(100)
    .required()

});

const updateCuadrillaVoluntarioSchema = Joi.object({

  rol: Joi.string()
    .min(3)
    .max(100)
    .optional()

}).min(1);

module.exports = {
  createCuadrillaVoluntarioSchema,
  updateCuadrillaVoluntarioSchema
};