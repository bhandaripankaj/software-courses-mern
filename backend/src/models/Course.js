const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new mongoose.Schema({
    name: { type: String, required: true },
    topicId: { type: Schema.ObjectId, ref: 'Topic' },
    priceRange: { type: String, required: false },
    speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CoursesSpeakers' }]

},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Course', Course);