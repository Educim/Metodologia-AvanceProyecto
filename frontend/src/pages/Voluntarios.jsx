import { useEffect, useState } from 'react';
import {
  listarVoluntarios,
  crearVoluntario,
  actualizarVoluntario,
  eliminarVoluntario,
  activarCuentaVoluntario,
} from '../api/voluntarioApi';
import { obtenerMensajeError } from '../api/helpers';
import Mensaje from '../components/Mensaje.jsx';

const FORM_VACIO = {
  nombre: '',
  rut: '',
  fechaNacimiento: '',
  contacto: '',
  habilidades: '',
};

function Voluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarVoluntarios = async () => {
    setCargando(true);
    try {
      const respuesta = await listarVoluntarios();
      setVoluntarios(respuesta.data.data || []);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarVoluntarios();
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
        await actualizarVoluntario(editandoId, form);
        setMensaje({ tipo: 'exito', texto: 'Voluntario actualizado correctamente.' });
      } else {
        await crearVoluntario(form);
        setMensaje({ tipo: 'exito', texto: 'Inscripcion enviada correctamente.' });
      }
      limpiarFormulario();
      cargarVoluntarios();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  const manejarEditar = (voluntario) => {
    setForm({
      nombre: voluntario.nombre || '',
      rut: voluntario.rut || '',
      fechaNacimiento: voluntario.fechaNacimiento || '',
      contacto: voluntario.contacto || '',
      habilidades: voluntario.habilidades || '',
    });
    setEditandoId(voluntario.id);
    setMensaje(null);
  };

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que quieres eliminar este voluntario?');
    if (!confirmar) return;

    try {
      await eliminarVoluntario(id);
      setMensaje({ tipo: 'exito', texto: 'Voluntario eliminado.' });
      cargarVoluntarios();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  const manejarActivar = async (id) => {
    try {
      await activarCuentaVoluntario(id);
      setMensaje({ tipo: 'exito', texto: 'Cuenta activada.' });
      cargarVoluntarios();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  return (
    <div>
      <h1>Voluntarios</h1>
      <p>
        El voluntario postula enviando su inscripcion. Luego el encargado de
        voluntarios revisa la ficha y activa la cuenta para que pueda ser
        asignado a una cuadrilla de trabajo.
      </p>

      <Mensaje tipo={mensaje?.tipo} texto={mensaje?.texto} />

      <div className="tarjeta">
        <h2>{editandoId ? 'Editar voluntario' : 'Inscripcion de voluntario'}</h2>
        <form onSubmit={manejarEnviar} className="formulario">
          <label>
            RUT
            <input
              type="text"
              name="rut"
              value={form.rut}
              onChange={manejarCambio}
              placeholder="Ej: 12345678-9"
              required
            />
          </label>

          <label>
            Nombre completo
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={manejarCambio}
              placeholder="Nombre y apellidos"
              required
            />
          </label>

          <label>
            Fecha de nacimiento
            <input
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={manejarCambio}
              required
            />
          </label>

          <label>
            Contacto
            <input
              type="text"
              name="contacto"
              value={form.contacto}
              onChange={manejarCambio}
              placeholder="Telefono o correo"
              required
            />
          </label>

          <label>
            Habilidades / experiencia
            <textarea
              name="habilidades"
              value={form.habilidades}
              onChange={manejarCambio}
              placeholder="Capacidades tecnicas, titulos, experiencia previa, horarios disponibles"
              rows="3"
              required
            />
          </label>

          <div className="botones-formulario">
            <button type="submit" className="boton boton-primario">
              {editandoId ? 'Guardar cambios' : 'Enviar inscripcion'}
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
        <h2>Listado de voluntarios ({voluntarios.length})</h2>
        {cargando ? (
          <p>Cargando...</p>
        ) : voluntarios.length === 0 ? (
          <p>Todavia no hay voluntarios inscritos.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Habilidades</th>
                <th>Cuenta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {voluntarios.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.rut}</td>
                  <td>{v.nombre}</td>
                  <td>{v.contacto}</td>
                  <td>{v.habilidades}</td>
                  <td>
                    {v.cuentaActiva ? (
                      <span className="etiqueta etiqueta-verde">Activa</span>
                    ) : (
                      <span className="etiqueta etiqueta-gris">Pendiente</span>
                    )}
                  </td>
                  <td>
                    {!v.cuentaActiva && (
                      <button
                        className="boton boton-pequeno"
                        onClick={() => manejarActivar(v.id)}
                      >
                        Activar
                      </button>
                    )}
                    <button className="boton boton-pequeno" onClick={() => manejarEditar(v)}>
                      Editar
                    </button>
                    <button
                      className="boton boton-pequeno boton-peligro"
                      onClick={() => manejarEliminar(v.id)}
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

export default Voluntarios;
