import api from './axios';

const RUTA = '/cuadrilla-voluntarios';

export const listarAsignaciones = () => api.get(RUTA);
export const obtenerAsignacion = (id) => api.get(`${RUTA}/${id}`);
export const asignarVoluntario = (datos) => api.post(RUTA, datos);
export const actualizarAsignacion = (id, datos) => api.patch(`${RUTA}/${id}`, datos);
export const eliminarAsignacion = (id) => api.delete(`${RUTA}/${id}`);
