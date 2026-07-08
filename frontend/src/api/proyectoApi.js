import api from './axios';

const RUTA = '/proyectos';

export const listarProyectos = () => api.get(RUTA);
export const obtenerProyecto = (id) => api.get(`${RUTA}/${id}`);
export const crearProyecto = (datos) => api.post(RUTA, datos);
export const actualizarProyecto = (id, datos) => api.patch(`${RUTA}/${id}`, datos);
export const cambiarEstadoProyecto = (id, estado) => api.patch(`${RUTA}/${id}/estado`, { estado });
export const eliminarProyecto = (id) => api.delete(`${RUTA}/${id}`);
