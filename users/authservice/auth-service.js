const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./auth-model')

const app = express();
const port = 8002; 

// Middleware to parse JSON in request body
app.use(express.json());

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

// Route for user login
app.post('/login', async (req, res) => {
  try {
    // Check if required fields are present in the request body
    try{
      validateRequiredFields(req, ['username', 'password']);
    }
    catch(error){
      res.status(400).json({ error : error.message });
      return
    }

    const { username, password } = req.body;

    // Find the user by username in the database
    const user = await User.findOne({ username });

    // Check if the user exists and verify the password
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, (process.env.JWT_KEY??'my-key'), { expiresIn: '1h' });
      // Respond with the token and user information
      res.json({ token: token, username: username});
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
