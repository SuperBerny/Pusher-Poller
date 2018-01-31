const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//DB Config
require('./config/db');

//Create Express Instance
const app = express();

const poll = require('./routes/poll');

//Set up public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Enable CORS
app.use(cors());

//Anything using /poll will be using poll.js
app.use('/poll', poll);

//Create Port
const PORT = 3000;

//Start Server
app.listen(
  PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
  });