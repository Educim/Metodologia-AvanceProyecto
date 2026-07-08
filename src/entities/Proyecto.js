const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Proyecto',
  tableName: 'proyectos',

  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },

    nombreProyecto: {
      type: 'varchar',
      length: 150,
    },

    descripcion: {
      type: 'varchar',
      length: 255,
    },

    estado: {
      type: 'varchar',
      length: 50,
      default: 'Pendiente',
    },

    fechaInicio: {
      type: 'date',
      nullable: true,
    },

    fechaTermino: {
      type: 'date',
      nullable: true,
    },

    created_at: {
      type: 'timestamp',
      createDate: true,
    },
  },

  relations: {
    cuadrillas: {
      type: 'one-to-many',
      target: 'Cuadrilla',
      inverseSide: 'proyecto',
    },
  },
});