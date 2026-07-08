import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div className="tarjeta">
      <h1>Sistema de Gestion - Techos para Chile</h1>
      <p>
        Bienvenido/a, esta es una aplicacion basica para apoyar el proceso de
        inscripcion de familias damnificadas y la creacion de proyectos de
        construccion de viviendas de emergencia.
      </p>

      <h2>Que puedes hacer aqui?</h2>
      <ul className="lista-inicio">
        <li>
          <Link to="/familias">Registrar familias</Link> damnificadas con su
          ubicacion y ficha social.
        </li>
        <li>
          <Link to="/voluntarios">Inscribir voluntarios</Link> y activar sus
          cuentas para que puedan participar.
        </li>
        <li>
          <Link to="/proyectos">Crear y aprobar proyectos</Link> de
          construccion habitacional.
        </li>
        <li>
          <Link to="/cuadrillas">Formar cuadrillas de trabajo</Link>{' '}
          asignando un proyecto y un voluntario jefe.
        </li>
        <li>
          <Link to="/asignaciones">Asignar voluntarios a una cuadrilla</Link>{' '}
          segun sus habilidades.
        </li>
      </ul>

      <p className="nota">
        Nota: el voluntario debe tener la cuenta activada antes de poder ser
        jefe de cuadrilla o ser asignado a una cuadrilla.
      </p>
    </div>
  );
}

export default Inicio;
