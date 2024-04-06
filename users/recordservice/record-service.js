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
app.post('/record', async (req, res) => {
  const user = req.body.user;
  const game = req.body.game;
  console.log(user)
  console.log(game)
  if(user && game){
    let record = await Record.findOne({ user : user }); 
    if(record){ //If it exits
      record.games.push(game);
    }
    else{ //Lo creamos
      record = new Record({
        user:user,
        games:[game]
      });
    }
    
    try {
        const savedRecord = await record.save();
        res.json({user:savedRecord.user});
      } catch (err) {
        res.status(500).send();
      }
  }
  else{
    res.status(400).send();
  }
  
});

app.get('/record/:user', async (req, res) => {
  try {
    const recordFound = await Record.findOne({ user: req.params.user }, 'games');
    if (!recordFound) {
      res.json({record: "undefined" });
    } else {
      res.json({record : recordFound});
    }
  } catch (err) {
    res.status(500).send();
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