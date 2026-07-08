import { useEffect, useState } from 'react';
import {
  listarAsignaciones,
  asignarVoluntario,
  actualizarAsignacion,
  eliminarAsignacion,
} from '../api/cuadrillaVoluntarioApi';
import { listarCuadrillas } from '../api/cuadrillaApi';
import { listarVoluntarios } from '../api/voluntarioApi';
import { obtenerMensajeError } from '../api/helpers';
import Mensaje from '../components/Mensaje.jsx';

const FORM_VACIO = {
  cuadrillaId: '',
  voluntarioId: '',
  rol: '',
};

function CuadrillaVoluntarios() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [cuadrillas, setCuadrillas] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarTodo = async () => {
    setCargando(true);
    try {
      const [resAsignaciones, resCuadrillas, resVoluntarios] = await Promise.all([
        listarAsignaciones(),
        listarCuadrillas(),
        listarVoluntarios(),
      ]);
      setAsignaciones(resAsignaciones.data.data || []);
      setCuadrillas(resCuadrillas.data.data || []);
      setVoluntarios(resVoluntarios.data.data || []);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const voluntariosActivos = voluntarios.filter((v) => v.cuentaActiva);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setForm(FORM_VACIO);
    setEditandoId(null);
  };

  const manejarEnviar = async (e) => {
    e.preventDefault();
    setMensaje(null);

    try {
      if (editandoId) {
        await actualizarAsignacion(editandoId, { rol: form.rol });
        setMensaje({ tipo: 'exito', texto: 'Asignacion actualizada correctamente.' });
      } else {
        await asignarVoluntario({
          cuadrillaId: Number(form.cuadrillaId),
          voluntarioId: Number(form.voluntarioId),
          rol: form.rol,
        });
        setMensaje({ tipo: 'exito', texto: 'Voluntario asignado correctamente.' });
      }
      limpiarFormulario();
      cargarTodo();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  const manejarEditar = (asignacion) => {
    setForm({
      cuadrillaId: asignacion.cuadrilla ? String(asignacion.cuadrilla.id) : '',
      voluntarioId: asignacion.voluntario ? String(asignacion.voluntario.id) : '',
      rol: asignacion.rol || '',
    });
    setEditandoId(asignacion.id);
    setMensaje(null);
  };

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que quieres quitar esta asignacion?');
    if (!confirmar) return;

    try {
      await eliminarAsignacion(id);
      setMensaje({ tipo: 'exito', texto: 'Asignacion eliminada.' });
      cargarTodo();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  return (
    <div>
      <h1>Asignar Voluntarios a Cuadrillas</h1>
      <p>
        Aqui el encargado de voluntarios asigna un voluntario disponible (con
        cuenta activa) a una cuadrilla, indicando el rol que cumplira en la
        construccion.
      </p>

      <Mensaje tipo={mensaje?.tipo} texto={mensaje?.texto} />

      <div className="tarjeta">
        <h2>{editandoId ? 'Editar asignacion' : 'Nueva asignacion'}</h2>
        <form onSubmit={manejarEnviar} className="formulario">
          <label>
            Cuadrilla
            <select
              name="cuadrillaId"
              value={form.cuadrillaId}
              onChange={manejarCambio}
              required
              disabled={!!editandoId}
            >
              <option value="">-- Selecciona una cuadrilla --</option>
              {cuadrillas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombreCuadrilla}
                </option>
              ))}
            </select>
          </label>

          <label>
            Voluntario (cuenta activa)
            <select
              name="voluntarioId"
              value={form.voluntarioId}
              onChange={manejarCambio}
              required
              disabled={!!editandoId}
            >
              <option value="">-- Selecciona un voluntario --</option>
              {voluntariosActivos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nombre} ({v.rut})
                </option>
              ))}
            </select>
          </label>

          <label>
            Rol en la construccion
            <input
              type="text"
              name="rol"
              value={form.rol}
              onChange={manejarCambio}
              placeholder="Ej: Maestro carpintero, ayudante, etc."
              required
            />
          </label>

          <div className="botones-formulario">
            <button type="submit" className="boton boton-primario">
              {editandoId ? 'Guardar cambios' : 'Asignar voluntario'}
            </button>
            {editandoId && (
              <button type="button" className="boton" onClick={limpiarFormulario}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="tarjeta">
        <h2>Asignaciones actuales ({asignaciones.length})</h2>
        {cargando ? (
          <p>Cargando...</p>
        ) : asignaciones.length === 0 ? (
          <p>Todavia no hay voluntarios asignados a cuadrillas.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cuadrilla</th>
                <th>Voluntario</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.cuadrilla ? a.cuadrilla.nombreCuadrilla : '-'}</td>
                  <td>{a.voluntario ? a.voluntario.nombre : '-'}</td>
                  <td>{a.rol}</td>
                  <td>
                    <button className="boton boton-pequeno" onClick={() => manejarEditar(a)}>
                      Editar rol
                    </button>
                    <button
                      className="boton boton-pequeno boton-peligro"
                      onClick={() => manejarEliminar(a.id)}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CuadrillaVoluntarios;
