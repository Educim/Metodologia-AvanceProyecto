# Requerimientos Funcionales Implementados
# RF01 - Registrar Familias Damnificadas
El area Social puede registrar familias damnificadas y su ubicacion geografica realizando evaluaciones sociales en terreno y completando fichas de evaluacion social cuando ocurra una emergencia o catastrofe que requiera intervencion habitacional. Siempre que el personal encargado haya realizado previamente la evaluacion de la situacion en terreno. Luego la informacion queda consolidada en un listado de familias afectadas disponible para la Central.

# RF02 - Activar Cuenta de Voluntario
El Encargado de Voluntarios puede registrar voluntarios, validar sus habilidades tecnicas y activar o desactivar cuentas dentro del sistema utilizando la informacion proporcionada durante el proceso de inscripcion. Cuando exista la necesidad de conformar cuadrillas de trabajo para un proyecto. Siempre que el voluntario haya entregado la informacion requerida y sus habilidades hayan sido validadas. Luego el voluntario queda disponible para ser asignado a actividades de construccion.

# Routes: 
Definen las rutas o endpoints disponibles para los usuarios.

# Controllers:
Reciben las solicitudes HTTP, validan la informacion y llaman a los servicios correspondientes.

# Services:
Contienen la logica de negocio y realizan operaciones sobre la base de datos.

# Entities:
Definen la estructura de los datos almacenados en PostgreSQL.

# PostgreSQL:
Almacena permanentemente la informacion del sistema.

# Flujo:

El usuario envia la solicitud.
index.js redirige la peticion a familiaRoutes.
La ruta ejecuta el controlador correspondiente.
El controlador solicita los datos al servicio.
El servicio consulta PostgreSQL mediante TypeORM.
PostgreSQL devuelve la informacion.
El controlador genera la respuesta.
El usuario recibe los datos solicitados.

# Familias

| Metodo | Ruta | Descripcion |
|----------|----------|----------|
| POST | /familias | Registrar familia |
| GET | /familias | Obtener todas las familias |
| GET | /familias/:id | Obtener familia por ID |
| PATCH | /familias/:id | Actualizar familia |
| DELETE | /familias/:id | Eliminar familia |

# Voluntarios

| Metodo | Ruta | Descripcion |
|----------|----------|----------|
| POST | /voluntarios | Registrar voluntario |
| GET | /voluntarios | Obtener todos los voluntarios |
| GET | /voluntarios/:id | Obtener voluntario por ID |
| PATCH | /voluntarios/:id | Actualizar voluntario |
| PATCH | /voluntarios/:id/activar | Activar cuenta |
| PATCH | /voluntarios/:id/desactivar | Desactivar cuenta |
| DELETE | /voluntarios/:id | Eliminar voluntario |

# Tecnologias Utilizadas

JavaScript: Lenguaje principal utilizado para desarrollar el backend.
Node.js: Entorno de ejecucion para JavaScript del lado del servidor.
Express.js: Framework utilizado para la creacion del servidor y gestion de rutas.
PostgreSQL: Sistema gestor de bases de datos utilizado para almacenar la informacion.
TypeORM: ORM utilizado para interactuar con PostgreSQL mediante entidades y repositorios.
Joi: Libreria utilizada para validar los datos recibidos antes de procesarlos.
Dotenv: Permite gestionar variables de entorno como credenciales de base de datos y puertos.
Nodemon: Herramienta utilizada durante el desarrollo para reiniciar automaticamente el servidor al detectar cambios en el codigo.

src/ 
 config/ # Configuracion de la base de datos y variables de entorno 
 controllers/ # Recepcion y gestion de peticiones HTTP 
 entities/ # Estructura de las tablas de la base de datos (Familia y Voluntario) 
 handlers/ # Respuestas estandarizadas de exito y error 
 routes/ # Definicion de las rutas del sistema 
 services/ # Logica de negocio y operaciones sobre la base de datos 
 validations/ # Validaciones de datos utilizando Joi 
 index.js # Punto de entrada de la aplicacion