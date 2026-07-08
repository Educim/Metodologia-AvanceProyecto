const Joi = require('joi');

const createCuadrillaSchema = Joi.object({

  nombreCuadrilla: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre de la cuadrilla no puede estar vacío',
      'string.min': 'El nombre debe tener al menos 3 caracteres'
    }),

  jefeId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'Debe seleccionar un jefe de cuadrilla',
      'any.required': 'Debe seleccionar un jefe de cuadrilla'
    }),

  estado: Joi.string()
    .valid('Disponible', 'En trabajo', 'Finalizada')
    .optional(),

  proyectoId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El proyecto debe ser un número',
      'any.required': 'Debe seleccionar un proyecto'
    })

});

const updateCuadrillaSchema = Joi.object({

  nombreCuadrilla: Joi.string()
    .min(3)
    .max(100)
    .optional(),

  jefeId: Joi.number()
    .integer()
    .optional(),

  estado: Joi.string()
    .valid('Disponible', 'En trabajo', 'Finalizada')
    .optional(),

  proyectoId: Joi.number()
    .integer()
    .optional()

}).min(1);

module.exports = {
  createCuadrillaSchema,
  updateCuadrillaSchema
};