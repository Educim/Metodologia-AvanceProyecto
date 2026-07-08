const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Cuadrilla',
  tableName: 'cuadrillas',

  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },

    nombreCuadrilla: {
      type: 'varchar',
      length: 100,
    },

    estado: {
      type: 'varchar',
      length: 30,
      default: 'Disponible',
    },

    created_at: {
      type: 'timestamp',
      createDate: true,
    },
  },

relations: {
  proyecto: {
    type: 'many-to-one',
    target: 'Proyecto',
    inverseSide: 'cuadrillas',
    joinColumn: true,
  },

  jefe: {
    type: 'many-to-one',
    target: 'Voluntario',
    joinColumn: true,
    nullable: false,
  },

  voluntarios: {
    type: 'one-to-many',
    target: 'CuadrillaVoluntario',
    inverseSide: 'cuadrilla',
  },
},
});