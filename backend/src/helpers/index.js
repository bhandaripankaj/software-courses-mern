// controllers/apiController.js

const Course = require('../models/Course');
const Speaker = require('../models/Speaker');
const CoursesSpeakers = require('../models/CoursesSpeakers');
const Topic = require('../models/Topic');

const {Topics,Speakers,Courses} = require('../../config/data.json')
const insertData = async (req, res) => {
  try {
     const data = await Topic.find({})
     if(!data.length){
       for (let i = 0; i < Topics.length; i++) {
            const topic = await Topic.create(Topics[i])
            const speaker = await Speaker.create(Speakers[i])
            Courses[i].topicId = topic._id
            Courses[i].topicId = topic._id

            const course = await Course.create(Courses[i])
             await CoursesSpeakers.create({courseId:course._id,speakerId:speaker._id})

       }
       console.log("data insert..")
     }

    // res.json({ courses });
  } catch (error) {
    console.error(error);
    // res.status(500).send('Internal Server Error');
  }
};


module.exports = {insertData};
