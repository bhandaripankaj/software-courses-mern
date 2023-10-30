const mongoose = require('mongoose');

let MONGO_URI = 'mongodb://localhost:27017/mern-test'
 mongoose.connect(MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true }).then(success => {
    console.log("info", 'MongoDb Connected');
}).catch(err => {
    console.error('Not Connected To DataBase', err);
    process.exit(1);
});