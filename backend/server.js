const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./src/route/index');
const { insertData } = require('./src/helpers');

require("./config/db")
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

insertData()
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
