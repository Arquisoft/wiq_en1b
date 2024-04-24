const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordSchema = new Schema({
    user: { type: String, required: true },
    games: [{
        questions: [{
            question: { type: String, required: true },
            answers: { type: [String], required: true },
            answerGiven: { type: String, required: true },
            correctAnswer: { type: String, required: true }
        }],
        points: { type: Number, required: true },
        date: { type: String, required: true },
        competitive: { type: Boolean, required: true }
    }]
});
const Record = mongoose.model('Record', recordSchema);

module.exports = Record