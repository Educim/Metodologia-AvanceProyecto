import { useEffect, useState } from 'react';
import {
  listarProyectos,
  crearProyecto,
  actualizarProyecto,
  cambiarEstadoProyecto,
  eliminarProyecto,
} from '../api/proyectoApi';
import { obtenerMensajeError } from '../api/helpers';
import Mensaje from '../components/Mensaje.jsx';

const ESTADOS = ['Pendiente', 'Aprobado', 'Denegado', 'En ejecución', 'Finalizado'];

const FORM_VACIO = {
  nombreProyecto: '',
  descripcion: '',
};

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarProyectos = async () => {
    setCargando(true);
    try {
      const respuesta = await listarProyectos();
      setProyectos(respuesta.data.data || []);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

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
        await actualizarProyecto(editandoId, form);
        setMensaje({ tipo: 'exito', texto: 'Proyecto actualizado correctamente.' });
      } else {
        await crearProyecto(form);
        setMensaje({ tipo: 'exito', texto: 'Proyecto registrado correctamente.' });
      }
      limpiarFormulario();
      cargarProyectos();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  const manejarEditar = (proyecto) => {
    setForm({
      nombreProyecto: proyecto.nombreProyecto || '',
      descripcion: proyecto.descripcion || '',
    });
    setEditandoId(proyecto.id);
    setMensaje(null);
  };

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que quieres eliminar este proyecto?');
    if (!confirmar) return;

    try {
      await eliminarProyecto(id);
      setMensaje({ tipo: 'exito', texto: 'Proyecto eliminado.' });
      cargarProyectos();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  const manejarCambiarEstado = async (id, estado) => {
    try {
      await cambiarEstadoProyecto(id, estado);
      setMensaje({ tipo: 'exito', texto: `Estado cambiado a "${estado}".` });
      cargarProyectos();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  return (
    <div>
      <h1>Proyectos de Construccion</h1>
      <p>
        La central evalua y aprueba los proyectos de intervencion
        habitacional. Una vez aprobado, el proyecto queda habilitado para
        asignar recursos y formar cuadrillas de trabajo.
      </p>

      <Mensaje tipo={mensaje?.tipo} texto={mensaje?.texto} />

      <div className="tarjeta">
        <h2>{editandoId ? 'Editar proyecto' : 'Registrar nuevo proyecto'}</h2>
        <form onSubmit={manejarEnviar} className="formulario">
          <label>
            Nombre del proyecto
            <input
              type="text"
              name="nombreProyecto"
              value={form.nombreProyecto}
              onChange={manejarCambio}
              placeholder="Ej: Construccion vivienda de emergencia sector X"
              required
            />
          </label>

          <label>
            Descripcion
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={manejarCambio}
              placeholder="Detalle de la intervencion habitacional"
              rows="3"
              required
            />
          </label>

          <div className="botones-formulario">
            <button type="submit" className="boton boton-primario">
              {editandoId ? 'Guardar cambios' : 'Registrar proyecto'}
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
        <h2>Listado de proyectos ({proyectos.length})</h2>
        {cargando ? (
          <p>Cargando...</p>
        ) : proyectos.length === 0 ? (
          <p>Todavia no hay proyectos registrados.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Estado</th>
                <th>Fecha inicio</th>
                <th>Fecha termino</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombreProyecto}</td>
                  <td>{p.descripcion}</td>
                  <td>
                    <select
                      value={p.estado}
                      onChange={(e) => manejarCambiarEstado(p.id, e.target.value)}
                    >
                      {ESTADOS.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{p.fechaInicio || '-'}</td>
                  <td>{p.fechaTermino || '-'}</td>
                  <td>
                    <button className="boton boton-pequeno" onClick={() => manejarEditar(p)}>
                      Editar
                    </button>
                    <button
                      className="boton boton-pequeno boton-peligro"
                      onClick={() => manejarEliminar(p.id)}
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

export default Proyectos;
