const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'CuadrillaVoluntario',
  tableName: 'cuadrilla_voluntarios',

  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },

    rol: {
      type: 'varchar',
      length: 100,
    },

    created_at: {
      type: 'timestamp',
      createDate: true,
    },
  },

  relations: {
    cuadrilla: {
      type: 'many-to-one',
      target: 'Cuadrilla',
      joinColumn: true,
      inverseSide: 'voluntarios',
      nullable: false,
    },

    voluntario: {
      type: 'many-to-one',
      target: 'Voluntario',
      joinColumn: true,
      inverseSide: 'cuadrillas',
      nullable: false,
    },
  },
});