# Frontend - Techos para Chile - Metodollogia

Frontend  hecho con **Vite + React** para consumir el backend ya
existente (Express + TypeORM).

## Requisitos

- Node.js instalado
El backend corriendo en `http://localhost:3000` 

## Como correr el frontend

Desde la carpeta `frontend/`:

npm install
npm run dev

Esto abre la app en `http://localhost:5173`

## Estructura

rontend/
  src/
    api/          -> un archivo por entidad, llama exactamente a las rutas del backend
    components/   -> Navbar y Mensaje (alertas)
    pages/        -> Inicio, Familias, Voluntarios, Proyectos, Cuadrillas, Asignaciones
    App.jsx        -> define las rutas del frontend (react-router)
    main.jsx        -> punto de entrada
    styles.css     -> estilos simples en CSS plano


## Paginas incluidas

Familias: registrar, listar, editar y eliminar familias damnificadas.
Voluntarios: inscripcion de voluntarios, listar, editar, eliminar y activar la cuenta.
Proyectos: crear, listar, editar, eliminar y cambiar el estado
Cuadrillas: crear una cuadrilla asociada a un proyecto y a un voluntario jefe (con cuenta activa), listar, editar y eliminar.
Asignar Voluntarios: asignar un voluntario (con cuenta activa) a una cuadrilla con un rol especifico, listar, editar rol y quitar.
