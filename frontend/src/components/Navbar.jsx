import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-titulo">🏠 Techos para Chile</div>
      <nav className="navbar-links">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/familias">Familias</NavLink>
        <NavLink to="/voluntarios">Voluntarios</NavLink>
        <NavLink to="/proyectos">Proyectos</NavLink>
        <NavLink to="/cuadrillas">Cuadrillas</NavLink>
        <NavLink to="/asignaciones">Asignar Voluntarios</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
