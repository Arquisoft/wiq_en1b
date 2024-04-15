const express = require('express');
const mongoose = require('mongoose');
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
  if(user && game){
    let record = await Record.findOne({ user : user }); 
    if(record){ //If it exits
      record.games.push(game);
    }
    else{ //We make it
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

app.get('/record/ranking/top10', async (req, res) => {
  try {
    const usersCompetitiveStats = await Record.aggregate([
      // Unwind the games array to work with each game separately
      { $unwind: "$games" },
      // Match only competitive games
      { $match: { "games.competitive": true } },
      // Group by user and calculate total points and total competitive games per user
      {
          $group: {
              _id: "$user",
              totalPoints: { $sum: "$games.points" },
              totalCompetitiveGames: { $sum: 1 } // Count the number of competitive games
          }
      },
      // Sort by total points in descending order (top 1 will have the highest points)
      { $sort: { totalPoints: -1 } },
      // Limit to the top 10
      { $limit: 10 }
    ]);

    res.json({usersCompetitiveStats: usersCompetitiveStats });
  } catch (err) {
    res.status(500).send();
  }
});

app.get('/record/ranking/:user', async (req, res) => {
  try {
    const user = req.params.user.toString();
    //Gives back an array of 1 user
    const userCompetitiveStats = await Record.aggregate([
      { $match: { user: user } },
      // Unwind the games array to work with each game separately
      { $unwind: "$games" },
      // Match only competitive games
      { $match: { "games.competitive": true } },
      // Group by user and calculate total points and total competitive games per user
      {
          $group: {
              _id: "$user",
              totalPoints: { $sum: "$games.points" },
              totalCompetitiveGames: { $sum: 1 } // Count the number of competitive games
          }
      }
    ]);
    
    res.json({userCompetitiveStats: userCompetitiveStats[0] });
  } catch (err) {
    res.status(500).send();
  }
});

app.get('/record/:user', async (req, res) => {
  try {
    const recordFound = await Record.findOne({ user: req.params.user.toString() }, 'games');
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