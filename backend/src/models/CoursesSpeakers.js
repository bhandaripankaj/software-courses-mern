const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoursesSpeakers = new mongoose.Schema({
    courseId: { type: Schema.ObjectId, ref: 'Course' },
    speakerId: { type: Schema.ObjectId, ref: 'Speaker' },
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('CoursesSpeakers', CoursesSpeakers);