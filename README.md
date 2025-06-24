# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# 🌐 SocialMediaManager

**SocialMediaManager** es una plataforma web que permite la gestión centralizada de contenido en redes sociales. Está desarrollada con **React** en el frontend, **Node.js + Express** en el backend, y **MongoDB** como base de datos.

---

## 👨‍🎓 Contexto académico

Este proyecto fue realizado como parte del proceso formativo en **Análisis y Desarrollo de Software del SENA**, integrando conocimientos en desarrollo web, arquitectura cliente-servidor, consumo de APIs, y bases de datos NoSQL.

---

## 🚀 Tecnologías utilizadas

### Frontend
- **React**
- **React Router**
- **Axios**
- **CSS Modules / React Icons**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (con Mongoose)
- **CORS**, **Body-Parser**

---

## 📁 Estructura del proyecto

```
SocialMediaManager-main/
├── client/                 # Frontend con React
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── server/                 # Backend con Node.js + Express + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── app.js
│   └── index.js
│
└── README.md
```

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/XZanderU/SocialMediaManager-main.git
cd SocialMediaManager-main
```

### 2. Instalar dependencias

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `server` con el siguiente contenido:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/socialmediamanager
```

> Asegúrate de tener MongoDB instalado y en ejecución local.

### 4. Ejecutar ambos entornos

En dos terminales diferentes:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

---

## 🧠 Funcionalidades principales

- Interfaz de usuario intuitiva
- Conexión y gestión de contenido por red social
- Comunicación frontend-backend vía API REST
- Almacenamiento de datos en MongoDB

---

## 🔐 Seguridad y buenas prácticas

- Separación lógica del backend (modelos, rutas, controladores)
- Middleware para manejo de errores y CORS
- Código estructurado, comentado y escalable

---

## 📌 Mejoras futuras

- Integración con APIs reales de redes sociales
- Autenticación de usuarios (JWT)
- Funcionalidad de publicaciones programadas
- Dashboard con estadísticas

---

## 🤝 Contribuciones

¡Todas las contribuciones son bienvenidas! Puedes:

1. Hacer fork del proyecto.
2. Crear una rama nueva con tu funcionalidad.
3. Enviar un Pull Request con la mejora.

---

## 🧑 Autor

Desarrollado por un estudiante del **SENA** como parte de su proceso de formación en desarrollo web.

---
