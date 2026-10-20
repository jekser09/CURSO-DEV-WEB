# API Node Curso — Autenticación JWT y CRUD con Express y MongoDB

Aplicación de estudio full-stack construida para comprender los fundamentos de **Node.js**, **Express**, persistencia con **MongoDB (Mongoose)**, autenticación sin estado mediante **JWT (JSON Web Tokens)**, hashing de contraseñas con **bcrypt** y consumo de API desde el navegador con **HTML, CSS y JavaScript Vanilla**.

---

## Conceptos Clave Aplicados

### 1. Hashing de Contraseñas (`bcrypt`)
- **Hashing unidireccional**: Las contraseñas nunca se guardan en texto plano ni se "desencriptan". Se transforman mediante una función hash irreversible.
- **Uso de Salt**: Se genera un valor aleatorio (`salt`) que se combina con la contraseña antes de hashearla para prevenir ataques de diccionario y *rainbow tables*.
- **Estructura del Hash**: El string resultante de `bcrypt.hash()` incluye la versión del algoritmo, el costo (rondas) y el propio `salt` concatenados. Por eso `bcrypt.compare(plainPassword, hashedPassword)` puede validar la contraseña sin recibir el `salt` por separado.

### 2. Autenticación Stateless con JWT (`jsonwebtoken` y `express-jwt`)
- **Sin estado en memoria (Stateless)**: El servidor no almacena sesiones en memoria RAM ni en la base de datos.
- **Estructura `Header.Payload.Signature`**:
  - **Header**: Algoritmo utilizado (`HS256`).
  - **Payload**: Datos del usuario (`_id`) y metadatos como fecha de emisión (`iat`) o expiración (`exp`) codificados en Base64Url.
  - **Signature**: Firma criptográfica calculada con el `Header + Payload` y la clave secreta del servidor (`MYSECRET`).
- **Validación por Middleware**: `express-jwt` intercepta el header `Authorization: Bearer <token>`, recalcula la firma con la clave secreta y, si es auténtica, inyecta el payload decodificado en `req.auth`.

### 3. MongoDB y Mongoose
- **Conexión única, múltiples colecciones**: `mongoose.connect()` establece la conexión con la base de datos. Cada modelo definido con `mongoose.model()` (`User`, `Animal`) gestiona su propia colección independiente (`users`, `animals`), creándose bajo demanda al insertar el primer documento.

### 4. Archivos Estáticos y Rutas en el Navegador
- `express.static()` expone el directorio `static/` en la raíz `/` del servidor.
- En las plantillas HTML se utilizan rutas relativas a la raíz (`/CSS/...`, `/JS/...`) para que el navegador resuelva los recursos correctamente sin importar la profundidad de la URL actual (por ejemplo, `/form/animals`).

---

## Estructura del Proyecto

```text
api-node-curso/
├── static/
│   ├── CSS/
│   │   └── animals.css          # Estilos de las vistas
│   ├── IMG/                     # Recursos gráficos
│   ├── JS/
│   │   └── animals.js           # Lógica cliente (Fetch API, DOM y manejo de JWT en localStorage)
│   └── TEMPLATES/
│       ├── Index.html           # Vista de inicio de sesión y registro
│       └── FormAnimals.html     # Vista principal de gestión de animales
├── animal.controller.js         # Controlador CRUD para la colección de animales
├── auth.controller.js           # Controlador de registro, login y middleware de autenticación
├── api.js                       # Punto de entrada del servidor Express y definición de rutas
├── model.animal.js              # Esquema y modelo Mongoose para Animal
├── model.user.js                # Esquema y modelo Mongoose para User
├── .env                         # Variables de entorno (no versionado)
└── package.json                 # Dependencias y configuración del proyecto
```

---

## Requisitos y Configuración

- **Node.js** v20.6.0 o superior (soporte nativo para `process.loadEnvFile()`).
- **MongoDB** (instancia local o cluster en MongoDB Atlas).

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombre_db>?appName=Cluster0
MYSECRET=tu_clave_secreta_para_jwt
```

### 3. Ejecutar el servidor

```bash
node api.js
```

El servidor quedará disponible en `http://localhost:3000`.

---

## Endpoints de la API

### Públicos (Autenticación y Vistas)
| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Sirve la plantilla `Index.html` (Login / Registro). |
| `POST` | `/register` | Registra un nuevo usuario, hashea su contraseña y devuelve un JWT firmado. |
| `POST` | `/login` | Valida credenciales con `bcrypt.compare` y devuelve un JWT firmado. |

### Protegidos (Requieren header `Authorization: Bearer <token>`)
| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/animals` | Lista todos los animales registrados. |
| `GET` | `/animals/:id` | Obtiene el detalle de un animal por su `_id`. |
| `POST` | `/animals` | Crea un nuevo animal en la base de datos. |
| `PUT` / `PATCH` | `/animals/:id` | Actualiza los datos de un animal existente aplicando validaciones del esquema. |
| `DELETE` | `/animals/:id` | Elimina un animal por su `_id`. |
