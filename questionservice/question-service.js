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
        const questions = await Question.aggregate([
          {$sample: {size:5}} //5 random from the ones that fullfil the condition
        ]);

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

app.get('/questions/:lang/:amount/:type',  async (req, res) => {
  try {    
      const lang = req.params.lang.toString();
      let amount = checkAmount(parseInt(req.params.amount));
      const type = req.params.type.toString();

      if(amount > 20 || amount < 1)
        amount = 5;

      const questions = await Question.aggregate([
        {$match: {language : lang, type: type}}, //Condition
        {$sample: {size:amount}}
      ]);

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

app.get('/questions/:lang/:amount',  async (req, res) => {
  try {    
      const lang = req.params.lang;
      let amount = checkAmount(parseInt(req.params.amount));

      

      const questions = await Question.aggregate([
        {$match: {language : lang}}, //Condition
        {$sample: {size:amount}}
      ]);

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

app.get('/questions/:lang',  async (req, res) => {
  try {    
      const lang = req.params.lang;

      const questions = await Question.aggregate([
        {$match: {language : lang.toString()}}, //Condition
        {$sample: {size:5}} //5 random from the ones that fullfil the condition
      ]);

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

function checkAmount(amount){
  if(amount > 20 || amount < 1)
        return 5;
  return amount;
}

const server = app.listen(port, () => {
    console.log(`Question Service listening at http://localhost:${port}`);
});
  
  // Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
});
  
module.exports = server