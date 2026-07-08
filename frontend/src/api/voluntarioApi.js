import api from './axios';

const RUTA = '/voluntarios';

export const listarVoluntarios = () => api.get(RUTA);
export const obtenerVoluntario = (id) => api.get(`${RUTA}/${id}`);
export const crearVoluntario = (datos) => api.post(RUTA, datos);
export const actualizarVoluntario = (id, datos) => api.patch(`${RUTA}/${id}`, datos);
export const eliminarVoluntario = (id) => api.delete(`${RUTA}/${id}`);
export const activarCuentaVoluntario = (id) => api.patch(`${RUTA}/${id}/activar`);
