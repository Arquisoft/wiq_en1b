// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user-model')

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);



// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

app.post('/adduser', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        try{
          validateRequiredFields(req, ['email', 'username', 'password']);
        }
        catch(error){
          res.status(400).json({ error : error.message });
          return
        }

        //Check there is not a user with the same name
        const userUsername = await User.findOne({username: req.body.username});

        //Check there is not a user with the same name
        const userEmail = await User.findOne({email: req.body.email});

        if(userUsername)
          return res.status(400).json({error : "Username already in use"})

        if(userEmail)
        return res.status(400).json({error : "Email already in use"})

        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });

        await newUser.save();
        res.json({username: newUser.username});
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server