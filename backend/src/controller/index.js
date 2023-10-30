// controllers/apiController.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Course = require('../models/Course');
const Speaker = require('../models/Speaker');
const CoursesSpeakers = require('../models/CoursesSpeakers');
const Topic = require('../models/Topic');

const getCourses = async (req, res) => {
  try {
    let pipeline = [];

    // Match Stage
    const matchStage = {};
    if (req.query.topic) {
      matchStage.topicId = new mongoose.Types.ObjectId(req.query.topic);
    }
    if (req.query.price) {
      matchStage.priceRange = { $regex: req.query.price, $options: 'i' };
    }
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      matchStage.$or = [
        { name: { $regex: searchRegex } },
      ];
    }
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Lookup Stage - Populate topic details
    pipeline.push({ $lookup: { from: 'topics', localField: 'topicId', foreignField: '_id', as: 'topic' } });
    pipeline.push({ $unwind: '$topic' });

    // Lookup Stage - Populate speakers details
    pipeline.push({ $lookup: { from: 'coursesspeakers', localField: '_id', foreignField: 'courseId', as: 'speakers' } });
    pipeline.push({ $unwind: { path: '$speakers', preserveNullAndEmptyArrays: true } });
    pipeline.push({ $lookup: { from: 'speakers', localField: 'speakers.speakerId', foreignField: '_id', as: 'speakers.details' } });
    pipeline.push({ $unwind: { path: '$speakers.details', preserveNullAndEmptyArrays: true } });

    // Sorting Stage
    const sortStage = {};
    if (req.query.sort === 'descending') {
      sortStage.createdAt = -1;
    } else if (req.query.sort === 'ascending') {
      sortStage.createdAt = 1;
    }
    if (Object.keys(sortStage).length > 0) {
      pipeline.push({ $sort: sortStage });
    }

    // Pagination Stage
    const skip = (req.query.page - 1) * req.query.perPage;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(req.query.perPage) });

    const courses = await Course.aggregate(pipeline);
    const count =await  Course.countDocuments(matchStage)
    res.json({ courses,count});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json({ topics });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = { getCourses, getTopics };
