/*const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Aquí iría la lógica de validación con base de datos
  if (username === 'admin' && password === '1234') {
    res.status(200).json({ message: 'Login exitoso' });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});