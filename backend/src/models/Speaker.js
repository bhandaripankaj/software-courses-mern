const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Speaker = new mongoose.Schema({
    name: { type: String},
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Speaker', Speaker);