const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8003; 

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
//mongoose.connect(mongoUri);

app.get('/questions',  (req, res) => {
    res.send("Testing");
});


const server = app.listen(port, () => {
    console.log(`Question Service listening at http://localhost:${port}`);
});
  
  // Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    //mongoose.connection.close();
});
  
module.exports = server