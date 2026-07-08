import { useEffect, useState } from 'react';
import {
  listarFamilias,
  crearFamilia,
  actualizarFamilia,
  eliminarFamilia,
} from '../api/familiaApi';
import { obtenerMensajeError } from '../api/helpers';
import Mensaje from '../components/Mensaje.jsx';

const FORM_VACIO = {
  nombre_jefe_familia: '',
  rut: '',
  direccion: '',
  ubicacion_geografica: '',
  observacion_social: '',
};

function Familias() {
  const [familias, setFamilias] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarFamilias = async () => {
    setCargando(true);
    try {
      const respuesta = await listarFamilias();
      setFamilias(respuesta.data.data || []);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarFamilias();
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
        await actualizarFamilia(editandoId, form);
        setMensaje({ tipo: 'exito', texto: 'Familia actualizada correctamente.' });
      } else {
        await crearFamilia(form);
        setMensaje({ tipo: 'exito', texto: 'Familia registrada correctamente.' });
      }
      limpiarFormulario();
      cargarFamilias();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  const manejarEditar = (familia) => {
    setForm({
      nombre_jefe_familia: familia.nombre_jefe_familia || '',
      rut: familia.rut || '',
      direccion: familia.direccion || '',
      ubicacion_geografica: familia.ubicacion_geografica || '',
      observacion_social: familia.observacion_social || '',
    });
    setEditandoId(familia.id);
    setMensaje(null);
  };

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que quieres eliminar esta familia?');
    if (!confirmar) return;

    try {
      await eliminarFamilia(id);
      setMensaje({ tipo: 'exito', texto: 'Familia eliminada.' });
      cargarFamilias();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: obtenerMensajeError(error) });
    }
  };

  return (
    <div>
      <h1>Familias Damnificadas</h1>
      <p>
        Aqui el area social registra a las familias afectadas junto a su
        ubicacion, para que la central pueda revisarlas y aprobar proyectos.
      </p>

      <Mensaje tipo={mensaje?.tipo} texto={mensaje?.texto} />

      <div className="tarjeta">
        <h2>{editandoId ? 'Editar familia' : 'Registrar nueva familia'}</h2>
        <form onSubmit={manejarEnviar} className="formulario">
          <label>
            RUT jefe de familia
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
            Nombre jefe de familia
            <input
              type="text"
              name="nombre_jefe_familia"
              value={form.nombre_jefe_familia}
              onChange={manejarCambio}
              placeholder="Nombre completo"
              required
            />
          </label>

          <label>
            Direccion
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={manejarCambio}
              placeholder="Calle, numero, comuna"
              required
            />
          </label>

          <label>
            Ubicacion geografica
            <input
              type="text"
              name="ubicacion_geografica"
              value={form.ubicacion_geografica}
              onChange={manejarCambio}
              placeholder="Ej: coordenadas o sector"
              required
            />
          </label>

          <label>
            Observacion social (ficha)
            <textarea
              name="observacion_social"
              value={form.observacion_social}
              onChange={manejarCambio}
              placeholder="Observaciones de la evaluacion social en terreno"
              rows="3"
            />
          </label>

          <div className="botones-formulario">
            <button type="submit" className="boton boton-primario">
              {editandoId ? 'Guardar cambios' : 'Registrar familia'}
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
        <h2>Listado de familias ({familias.length})</h2>
        {cargando ? (
          <p>Cargando...</p>
        ) : familias.length === 0 ? (
          <p>Todavia no hay familias registradas.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>RUT</th>
                <th>Jefe de familia</th>
                <th>Direccion</th>
                <th>Ubicacion</th>
                <th>Observacion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {familias.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.rut}</td>
                  <td>{f.nombre_jefe_familia}</td>
                  <td>{f.direccion}</td>
                  <td>{f.ubicacion_geografica}</td>
                  <td>{f.observacion_social}</td>
                  <td>
                    <button className="boton boton-pequeno" onClick={() => manejarEditar(f)}>
                      Editar
                    </button>
                    <button
                      className="boton boton-pequeno boton-peligro"
                      onClick={() => manejarEliminar(f.id)}
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

export default Familias;
