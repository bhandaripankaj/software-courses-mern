const express = require('express');
const router = express.Router();
const apiController = require('../controller/index');

// Define API routes
router.get('/courses', apiController.getCourses);
router.get('/topics', apiController.getTopics);

module.exports = router;