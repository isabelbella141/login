
  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  //app.use(cors());
  // Configuración de CORS más específica
  app.use(cors({
    origin: [
      'http://localhost:3000', 
      'https://tu-dominio-vercel.vercel.app'
    ]
  }));

  app.use(bodyParser.json());

  // Datos de usuarios de ejemplo (en un escenario real, usarías una base de datos)
  const users = [
    { username: 'usuario1', password: 'clave123' },
    { username: 'usuario2', password: 'password456' }
  ];

  // Ruta de inicio de sesión
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validación simple de credenciales
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      res.json({ 
        message: 'Inicio de sesión exitoso', 
        user: { username: user.username } 
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  });

  // Iniciar servidor
  /*
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });*/

  // Iniciar servidor
  const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });


  const path = require('path');

  // Servir archivos estáticos desde el frontend de React
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Para cualquier otra ruta, devolver index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });

  // Exportar para testing o serverless
  module.exports = { app, server };