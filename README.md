# Portafolio de Servicios en Node.js

Proyecto que desarrollé para el curso Backend con Node.js (nivel avanzado) del bootcamp Fullstack Developer de Tecmilenio.

La temática que escogí es la de un backend para un portafolio de servicios tecnológicos. Con esta aplicación es posible registrar usuarios, iniciar sesión vía la autenticación JWT y administrar un catálogo de servicios.

Durante el proyecto fui incorporando las funcionalidades conforme avanzó el curso. La aplicación, actualmente, está desplegada en Railway, conectada a una base de datos MySQL y ejecutándose dentro de un contenedor Docker.

---

## Tecnologías que utilicé

- Node.js
- Express
- MySQL
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- Helmet
- express-rate-limit
- dotenv
- Docker
- Railway
- Jest
- Postman

---

## Funcionalidades

- Registro de usuarios
- Inicio de sesión con JWT
- Autenticación mediante tokens
- Autorización por roles
- CRUD de servicios
- CRUD de usuarios
- Validación de datos
- Protección básica contra ataques comunes
- Arquitectura modular
- Integración con MySQL
- Despliegue en Railway
- Contenerización con Docker

---

## Requisitos

- Node.js
- npm
- MySQL
- Postman (para probar los endpoints)

---

## Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

Configura las variables de entorno correspondientes y ejecuta el proyecto.

En desarrollo:

```bash
npm run dev
```

En producción:

```bash
npm start
```

---

## Variables de entorno

Antes de ejecutar el proyecto es necesario crear el archivo `.env` utilizando como referencia el archivo `.env.example`.

Las variables corresponden principalmente a la configuración de la base de datos, JWT y el entorno de ejecución.

---

## Endpoints principales

### Autenticación

- Registrar usuario
- Iniciar sesión
- Consultar perfil

### Servicios

- Obtener servicios
- Crear servicio
- Actualizar servicio
- Eliminar servicio

### Usuarios

- Crear usuario
- Eliminar usuario

---

## Despliegue

La aplicación se encuentra preparada para ejecutarse en un entorno local y también producción con Railway y Docker.

---

## Comentarios

Este proyecto lo desarrollé como evidencia final del bootcamp Backend con Node.js. Si deseas utilizar este proyecto como referencia para practicar Node.js, recuerda configurar correctamente las variables de entorno antes de ejecutarlo.
