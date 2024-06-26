// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./user-model')

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    //If there are not here is because they dont need to be, it has being check before which need to be here
    let email = req.body.email ? req.body.email.toString() : "example@example.com";
    let username = req.body.username ? req.body.username.toString() : "example";
    let password = req.body.password ? req.body.password.toString() : "123456789";
    let repeatPassword = req.body.repeatPassword ? req.body.repeatPassword.toString() : "123456789";

    if(!validateEmail(email)){
      //User put a wrong format email
      throw new Error("Wrong email format (example@example.com)")
    }

    if(password !== repeatPassword){
      //User put the same password
      throw new Error("Passwords dont match");
    }
    if(/\s/.test(password)){
      //User put spaces in password
      throw new Error("Password cannot have spaces");
    }
    if(password.length < 8){
      //Password too short
      throw new Error("Password must be at least 8 characters long");
    }

    if(password.length > 64){
      //Password too long
      throw new Error("Password must less than 64 characters long");
    } 

    if(/\s/.test(username)){
      //Spaces in username
      throw new Error("Username cannot have spaces");
    }

}

app.post('/adduser', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        try{
          validateRequiredFields(req, ['email', 'username', 'password', 'repeatPassword']);
        }
        catch(error){
          res.status(400).json({ error : error.message });
          return
        }

        //Check there is not a user with the same name
        const userUsername = await User.findOne({username: req.body.username.toString()});

        //Check there is not a user with the same name
        const userEmail = await User.findOne({email: req.body.email.toString()});

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

        const savedUser = await newUser.save();

        const token = jwt.sign({ userId: savedUser._id }, (process.env.JWT_KEY??'my-key'), { expiresIn: '1h' });

        res.json({ token: token, username: savedUser.username, email: savedUser.email});
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }}
);

app.post('/forgetPassword', async (req, res) => {
  try {
      // Check if required fields are present in the request body
      try{
        validateRequiredFields(req, ['email', 'username']);
      }
      catch(error){
        res.status(400).json({ error : error.message });
        return
      }
      //Check there is a user with that name
      const userUsername = await User.findOne({username: req.body.username.toString()});

      if(!userUsername || userUsername.email !== req.body.email)
        return res.status(400).json({error : "No user found, review credentials"})


      const token = jwt.sign({ userId: userUsername._id }, (process.env.JWT_KEY??'my-key'), { expiresIn: '15m' });

      res.json({ token: token, username: userUsername.username, email: userUsername.email});
  } catch (error) {
      res.status(400).json({ error: error.message }); 
  }}
);

app.post('/changePassword', async (req, res) => {
  try {
      // Check if required fields are present in the request body
      try{
        validateRequiredFields(req, ['email', 'username', 'password', 'repeatPassword']);
      }
      catch(error){
        res.status(400).json({ error : error.message });
        return
      }

      
      //Check there is a user with that name
      const userUsername = await User.findOne({username: req.body.username.toString()});

      if(!userUsername || userUsername.email !== req.body.email)
        return res.status(400).json({error : "No user found, review credentials"})

      // Encrypt the password before saving it
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const result = await User.updateOne(
        { _id: userUsername._id },
        { $set: { password: hashedPassword } }
      );
  
      if (result.nModified === 0) {
        res.status(404).send('User not found or no change');
      } else {
        const token = jwt.sign({ userId: userUsername._id }, (process.env.JWT_KEY??'my-key'), { expiresIn: '1h' });
        res.json({ token: token, username: userUsername.username, email: userUsername.email});
      }

      
  } catch (error) {
      res.status(400).json({ error: error.message }); 
  }}
);

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server