export function obtenerMensajeError(error) {
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors.join(' | ');
    }
    if (data.message) {
      return data.message;
    }
  }
  return error.message || 'Ocurrio un error inesperado';
}
