const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    language: String,
    type: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question