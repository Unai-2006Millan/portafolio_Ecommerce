# 🛍️ Portfolio E-Commerce

Una aplicación de e-commerce completa construida con **Node.js** y **Express**, diseñada como proyecto de portafolio para demostrar habilidades en desarrollo backend, gestión de bases de datos y arquitectura REST.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints API](#endpoints-api)
- [Documentación Swagger](#documentación-swagger)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## ✨ Características

- ✅ **Autenticación y Autorización** - Sistema de login seguro con Passport.js
- ✅ **Gestión de Usuarios** - CRUD completo para usuarios
- ✅ **Catálogo de Productos** - Gestión de productos con detalles completos
- ✅ **Carrito de Compra** - Funcionalidad para agregar/eliminar productos
- ✅ **Sistema de Órdenes** - Procesamiento de pedidos
- ✅ **Documentación API** - Swagger UI integrado
- ✅ **Contraseñas Encriptadas** - Seguridad con bcrypt
- ✅ **Base de Datos PostgreSQL** - Persistencia de datos confiable

---

## 🛠️ Tecnologías

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** 5.2.1 - Framework web
- **PostgreSQL** - Base de datos relacional
- **Passport.js** - Autenticación y autorización

### Herramientas de Desarrollo
- **Nodemon** - Recarga automática durante desarrollo
- **Swagger** - Documentación interactiva del API
- **bcrypt** - Encriptación de contraseñas

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**
- **PostgreSQL** (versión 12 o superior)
- **Git**

---

## 📥 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Unai-2006Millan/portafolio_Ecommerce.git
   cd portafolio_Ecommerce
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Crear la base de datos**
   - Abre tu cliente PostgreSQL (pgAdmin, DBeaver, etc.)
   - Ejecuta el script SQL incluido:
   ```bash
   psql -U postgres -f Ecommerce.sql
   ```

---

## ⚙️ Configuración

Edita el archivo `db.js` con tus credenciales de PostgreSQL:

```javascript
const client = new Client({
    host: 'localhost',        // Host de la base de datos
    port: 5432,              // Puerto PostgreSQL
    user: 'tu_usuario',      // Tu usuario de PostgreSQL
    password: 'tu_password', // Tu contraseña
    database: 'E-commerce'   // Nombre de la base de datos
});
```

### Variables de Entorno (Recomendado)
Se recomienda usar un archivo `.env` para mayor seguridad:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=E-commerce
PORT=3000
NODE_ENV=development
```

---

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```
Inicia el servidor con nodemon (recarga automática)

### Producción
```bash
npm start
```
Inicia el servidor en modo producción

El servidor iniciará en `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
proyecto-portafolio-Ecommerce/
├── app.js                    # Entrada de la aplicación
├── db.js                     # Configuración de base de datos
├── package.json              # Dependencias del proyecto
├── Ecommerce.sql            # Script SQL inicial
├── README.md                 # Este archivo
│
├── config/
│   ├── passport.js          # Configuración de autenticación
│   └── swagger.js           # Configuración de documentación API
│
├── controllers/             # Lógica de negocio
│   ├── users.controller.js
│   ├── products.controller.js
│   ├── carts.controller.js
│   └── orders.controller.js
│
├── models/                  # Modelos de datos
│   ├── users.model.js
│   ├── products.model.js
│   ├── carts.model.js
│   └── orders.model.js
│
└── routes/                  # Rutas de la API
    ├── users.routes.js
    ├── products.routes.js
    ├── carts.routes.js
    └── orders.routes.js
```

---

## 🔌 Endpoints API

### Usuarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users` | Obtener todos los usuarios |
| POST | `/users/register` | Registrar nuevo usuario |
| POST | `/users/login` | Iniciar sesión |
| GET | `/users/:id` | Obtener usuario por ID |
| PUT | `/users/updateUser/:id` | Actualizar usuario |
| DELETE | `/users/deleteUser/:id` | Eliminar usuario |

### Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products` | Obtener todos los productos |
| GET | `/products/:id` | Obtener producto por ID |
| POST | `/products/createProduct` | Crear nuevo producto |
| PUT | `/products/updateProduct/:id` | Actualizar producto |
| DELETE | `/products/deleteProduct/:id` | Eliminar producto |

### Carritos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users/carts` | Obtener todos los carritos |
| POST | `/users/carts/newCart` | Crear nuevo carrito |
| GET | `/users/carts/:id` | Obtener carrito por ID |
| PUT | `/users/carts/updateCart/:id` | Actualizar carrito |
| DELETE | `/users/carts/deleteCart/:id` | Eliminar carrito |
| GET | `/users/carts/:id/products` | Obtener productos del carrito |
| GET | `/users/carts/:id/products/:idProducto` | Obtener producto específico del carrito |
| POST | `/users/carts/:id/products` | Agregar producto al carrito |
| PUT | `/users/carts/:id/products/:productId` | Actualizar cantidad de producto en carrito |
| DELETE | `/users/carts/:id/products/:productId` | Eliminar producto del carrito |
| POST | `/users/carts/:id/orderCart` | Procesar compra (convertir carrito en orden) |

### Órdenes
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users/orders` | Obtener todas las órdenes |
| GET | `/users/orders/:id` | Obtener orden por ID |
| PUT | `/users/orders/updateOrder/:id` | Actualizar orden |
| DELETE | `/users/orders/deleteOrder/:id` | Eliminar orden |
| GET | `/users/orders/:id/products` | Obtener productos de la orden |
| POST | `/users/orders/:id/products` | Agregar producto a la orden |
| PUT | `/users/orders/:id/products/:productId` | Actualizar cantidad de producto en orden |
| DELETE | `/users/orders/:id/products/:productId` | Eliminar producto de la orden |

---

## 📚 Documentación Swagger

Una vez el servidor esté corriendo, accede a la documentación interactiva en:

```
http://localhost:3000/api-docs
```

Aquí encontrarás todos los endpoints con ejemplos de solicitudes y respuestas.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Haz un Fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**. Ver el archivo `package.json` para más detalles.

---

## 👤 Autor

**Unai Rafales**

- GitHub: [@Unai-2006Millan](https://github.com/Unai-2006Millan)
- Proyecto: [Portfolio E-Commerce](https://github.com/Unai-2006Millan/portafolio_Ecommerce)

---

## 📞 Soporte

Si tienes preguntas o encuentras problemas, por favor abre un issue en el repositorio de GitHub.

---

**⭐ Si te gusta este proyecto, considera dejarle una estrella en GitHub!**
