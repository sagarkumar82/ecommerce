// server.js
const express = require('express');
require('dotenv').config(); // Load environment variables from .env filed
const db = require('./config/db');
const bodyParser = require('body-parser');
const userRoute = require('./route/userRoute')
const cors = require('cors'); // Import the cors module



const app = express();

// Use CORS middleware
app.use(cors()); 

app.use(bodyParser.json());

app.use('/' ,  userRoute)



const port =  process.env.PORT;
console.log(port)
app.listen(port, () => console.log(`Server started on port ${port }`));
