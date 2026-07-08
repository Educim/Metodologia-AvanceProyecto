import api from './axios';

const RUTA = '/familias';

export const listarFamilias = () => api.get(RUTA);
export const obtenerFamilia = (id) => api.get(`${RUTA}/${id}`);
export const crearFamilia = (datos) => api.post(RUTA, datos);
export const actualizarFamilia = (id, datos) => api.patch(`${RUTA}/${id}`, datos);
export const eliminarFamilia = (id) => api.delete(`${RUTA}/${id}`);
