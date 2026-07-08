import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Inicio from './pages/Inicio.jsx';
import Familias from './pages/Familias.jsx';
import Voluntarios from './pages/Voluntarios.jsx';
import Proyectos from './pages/Proyectos.jsx';
import Cuadrillas from './pages/Cuadrillas.jsx';
import CuadrillaVoluntarios from './pages/CuadrillaVoluntarios.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/familias" element={<Familias />} />
          <Route path="/voluntarios" element={<Voluntarios />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/cuadrillas" element={<Cuadrillas />} />
          <Route path="/asignaciones" element={<CuadrillaVoluntarios />} />
        </Routes>
      </main>
      <footer className="footer">
        Techos para Chile - Proyecto metodologia
      </footer>
    </div>
  );
}

export default App;
