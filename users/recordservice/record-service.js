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

//Fire and forget
app.post('/addrecord', async (req, res) => {
  const user = req.body.user;
  const game = req.body.game;
  console.log(game)
  console.log(user)
  let record = await Record.findOne({ username : user }); 
  if(record){ //If it exits
    record.games.push(game);
  }
  else{ //Lo creamos
    record = new Record({
      username:user,
      games:[game]
    });
  }
  
  try {
        const savedRecord = await record.save();
        console.log("Record saved successfully:", savedRecord);
    } catch (err) {
        console.error("There was an error while saving the record:", err);
    }
});

app.get('/records/:user', async (req, res) => {
  console.log(req.params.user);
  try {
    const recordFound = await Record.findOne({ userIdentification: req.params.user }, 'games');
    if (!recordFound) {
      res.json({record: "No hay usuario" });
    } else {
      res.json({record : recordFound});
    }
  } catch (err) {
    res.status(500).json({ error: "undefined" });
  }
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