const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    user: String,
    games: [{
        questions: [{
            question: String,
            answers: [String],
            answerGiven: String,
            correctAnswer: String
        }],
        points: Number,
        date: String
    }]
});
const Record = mongoose.model('Record', recordSchema);

module.exports = Record