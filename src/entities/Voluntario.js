const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Voluntario',
  tableName: 'voluntarios',

  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },

    nombre: {
      type: 'varchar',
      length: 100,
    },

    rut: {
      type: 'varchar',
      length: 20,
      unique: true,
    },

    fechaNacimiento: {
      type: 'varchar',
      length: 20,
    },

    contacto: {
      type: 'varchar',
      length: 100,
    },

    habilidades: {
      type: 'varchar',
      length: 255,
    },

    cuentaActiva: {
      type: 'boolean',
      default: false,
    },

    created_at: {
      type: 'timestamp',
      createDate: true,
    },
  },

  relations: {
    cuadrillas: {
      type: 'one-to-many',
      target: 'CuadrillaVoluntario',
      inverseSide: 'voluntario',
    },
  },
});