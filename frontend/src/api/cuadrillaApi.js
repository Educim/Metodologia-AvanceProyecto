import api from './axios';

const RUTA = '/cuadrillas';

export const listarCuadrillas = () => api.get(RUTA);
export const obtenerCuadrilla = (id) => api.get(`${RUTA}/${id}`);
export const crearCuadrilla = (datos) => api.post(RUTA, datos);
export const actualizarCuadrilla = (id, datos) => api.patch(`${RUTA}/${id}`, datos);
export const eliminarCuadrilla = (id) => api.delete(`${RUTA}/${id}`);
