const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    username:String,
    games:[String]
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record