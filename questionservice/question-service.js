const express = require('express');
const mongoose = require('mongoose');
const Question = require('./question-model')

const app = express();
const port = 8003; 

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI_QUESTIONS || 'mongodb://localhost:27017/questions';
mongoose.connect(mongoUri);

app.get('/questions',  async (req, res) => {
    try {    
        // Find the question by it's number
        const questions = await Question.find({});
        //const question = await Question.find({number: { $in: ['0', '1']}}); And I can find many that way

        let jsonResult = {};
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            jsonResult[i] = {
                question : question.question,
                answers : question.answers
            }
        }
        res.json(jsonResult);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


const server = app.listen(port, () => {
    console.log(`Question Service listening at http://localhost:${port}`);
});
  
  // Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
});
  
module.exports = server