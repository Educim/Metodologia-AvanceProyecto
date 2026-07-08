const Joi = require('joi');

// Esquema para crear un proyecto
const createProyectoSchema = Joi.object({
  nombreProyecto: Joi.string()
    .min(3)
    .max(150)
    .required()
    .messages({
      'string.empty': 'El nombre del proyecto no puede estar vacío',
      'string.min': 'El nombre del proyecto debe tener al menos 3 caracteres'
    }),

  descripcion: Joi.string()
    .min(5)
    .max(255)
    .required()
    .messages({
      'string.empty': 'La descripción no puede estar vacía',
      'string.min': 'La descripción debe tener al menos 5 caracteres'
    }),

  estado: Joi.string()
    .valid(
      'Pendiente',
      'Aprobado',
      'Denegado',
      'En ejecución',
      'Finalizado'
    )
    .optional(),

  fechaInicio: Joi.date()
    .optional(),

  fechaTermino: Joi.date()
    .optional()
});

// Esquema para actualizar un proyecto
const updateProyectoSchema = Joi.object({

  nombreProyecto: Joi.string()
    .min(3)
    .max(150)
    .optional(),

  descripcion: Joi.string()
    .min(5)
    .max(255)
    .optional(),

  estado: Joi.string()
    .valid(
      'Pendiente',
      'Aprobado',
      'Denegado',
      'En ejecución',
      'Finalizado'
    )
    .optional(),

  fechaInicio: Joi.date()
    .optional(),

  fechaTermino: Joi.date()
    .optional()

}).min(1);

module.exports = {
  createProyectoSchema,
  updateProyectoSchema
};