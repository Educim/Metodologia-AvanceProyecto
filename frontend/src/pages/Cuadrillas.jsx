import { useEffect, useState } from 'react';
import {
  listarCuadrillas,
  crearCuadrilla,
  actualizarCuadrilla,
  eliminarCuadrilla,
} from '../api/cuadrillaApi';
import { listarProyectos } from '../api/proyectoApi';
import { listarVoluntarios } from '../api/voluntarioApi';
import { obtenerMensajeError } from '../api/helpers';
import Mensaje from '../components/Mensaje.jsx';

const FORM_VACIO = {
  nombreCuadrilla: '',
  estado: 'Disponible',
  proyectoId: '',
  jefeId: '',
};

function Cuadrillas() {
  const [cuadrillas, setCuadrillas] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarTodo = async () => {
    setCargando(true);
    try {
      const [resCuadrillas, resProyectos, resVoluntarios] = await Promise.all([
        listarCuadrillas(),
        listarProyectos(),
        listarVoluntarios(),
      ]);
      setCuadrillas(resCuadrillas.data.data || []);
      setProyectos(resProyectos.data.data || []);
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

    const datos = {
      nombreCuadrilla: form.nombreCuadrilla,
      estado: form.estado,
      proyectoId: Number(form.proyectoId),
      jefeId: Number(form.jefeId),
    };

    try {
      if (editandoId) {
        await actualizarCuadrilla(editandoId, datos);
        setMensaje({ tipo: 'exito', texto: 'Cuadrilla actualizada correctamente.' });
      } else {
        await crearCuadrilla(datos);
        setMensaje({ tipo: 'exito', texto: 'Cuadrilla creada correctamente.' });
      }
      limpiarFormulario();
      cargarTodo();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  const manejarEditar = (cuadrilla) => {
    setForm({
      nombreCuadrilla: cuadrilla.nombreCuadrilla || '',
      estado: cuadrilla.estado || 'Disponible',
      proyectoId: cuadrilla.proyecto ? String(cuadrilla.proyecto.id) : '',
      jefeId: cuadrilla.jefe ? String(cuadrilla.jefe.id) : '',
    });
    setEditandoId(cuadrilla.id);
    setMensaje(null);
  };

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que quieres eliminar esta cuadrilla?');
    if (!confirmar) return;

    try {
      await eliminarCuadrilla(id);
      setMensaje({ tipo: 'exito', texto: 'Cuadrilla eliminada.' });
      cargarTodo();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  return (
    <div>
      <h1>Cuadrillas de Trabajo</h1>
      <p>
        Una cuadrilla se forma para un proyecto ya aprobado, con un voluntario
        como jefe. El voluntario elegido como jefe debe tener la cuenta
        activada.
      </p>

      <Mensaje tipo={mensaje?.tipo} texto={mensaje?.texto} />

      <div className="tarjeta">
        <h2>{editandoId ? 'Editar cuadrilla' : 'Crear nueva cuadrilla'}</h2>
        <form onSubmit={manejarEnviar} className="formulario">
          <label>
            Nombre de la cuadrilla
            <input
              type="text"
              name="nombreCuadrilla"
              value={form.nombreCuadrilla}
              onChange={manejarCambio}
              placeholder="Ej: Cuadrilla Norte 1"
              required
            />
          </label>

          <label>
            Proyecto
            <select name="proyectoId" value={form.proyectoId} onChange={manejarCambio} required>
              <option value="">-- Selecciona un proyecto --</option>
              {proyectos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombreProyecto} ({p.estado})
                </option>
              ))}
            </select>
          </label>

          <label>
            Voluntario jefe (debe tener la cuenta activa)
            <select name="jefeId" value={form.jefeId} onChange={manejarCambio} required>
              <option value="">-- Selecciona un voluntario --</option>
              {voluntariosActivos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nombre} ({v.rut})
                </option>
              ))}
            </select>
          </label>

          <label>
            Estado
            <input
              type="text"
              name="estado"
              value={form.estado}
              onChange={manejarCambio}
              placeholder="Ej: Disponible"
            />
          </label>

          <div className="botones-formulario">
            <button type="submit" className="boton boton-primario">
              {editandoId ? 'Guardar cambios' : 'Crear cuadrilla'}
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
        <h2>Listado de cuadrillas ({cuadrillas.length})</h2>
        {cargando ? (
          <p>Cargando...</p>
        ) : cuadrillas.length === 0 ? (
          <p>Todavia no hay cuadrillas creadas.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Proyecto</th>
                <th>Jefe</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cuadrillas.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombreCuadrilla}</td>
                  <td>{c.proyecto ? c.proyecto.nombreProyecto : '-'}</td>
                  <td>{c.jefe ? c.jefe.nombre : '-'}</td>
                  <td>{c.estado}</td>
                  <td>
                    <button className="boton boton-pequeno" onClick={() => manejarEditar(c)}>
                      Editar
                    </button>
                    <button
                      className="boton boton-pequeno boton-peligro"
                      onClick={() => manejarEliminar(c.id)}
                    >
                      Eliminar
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

export default Cuadrillas;
