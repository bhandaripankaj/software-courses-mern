const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Topic = new mongoose.Schema({
    name: { type: String, required: true },
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Topic', Topic);