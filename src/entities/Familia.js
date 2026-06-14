const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Familia',
  tableName: 'familias',

  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },

    nombre_jefe_familia: {
      type: 'varchar',
      length: 150,
    },

    direccion: {
      type: 'varchar',
      length: 255,
    },

    ubicacion_geografica: {
      type: 'varchar',
      length: 255,
    },

    observacion_social: {
      type: 'text',
      nullable: true,
    },

    created_at: {
      type: 'timestamp',
      createDate: true,
    },
  },
});