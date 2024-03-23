const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Record = require('./record-model')

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);

app.get('/addrecord', async (req, res) => {
    res.send({data:"hola"})
});

app.get('/records/:user', async(req, res)=> {
    res.send({data:"Hola: "+ req.params.user})
});

const server = app.listen(port, () => {
  console.log(`Record Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server


// Record.findOne({ username: "nombreDeUsuario" }, (err, record) => {
//   if (err) {
//       console.error("Error al recuperar el documento:", err);
//       return;
//   }

//   if (!record) {
//       console.log("No se encontró ningún documento para el nombre de usuario dado.");
//       return;
//   }

//   record.games.push("nuevoJuego");

//   record.save((err, updatedRecord) => {
//       if (err) {
//           console.error("Error al guardar el documento actualizado:", err);
//           return;
//       }
//       console.log("Documento actualizado correctamente:", updatedRecord);
//   });
// });