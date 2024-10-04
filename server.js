// server.js
const express = require('express');
require('dotenv').config(); // Load environment variables from .env filed
const db = require('./config/db');
const bodyParser = require('body-parser');
const userRoute = require('./route/userRoute')
const productRoute = require('./route/productRoute')
const brandRoute = require('./route/brandRoute')
const cors = require('cors'); // Import the cors module
const path = require('path')


const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use CORS middleware
app.use(cors()); 

app.use(bodyParser.json());

app.use('/' ,  userRoute)
app.use('/' ,  productRoute)
app.use('/' ,  brandRoute)



const port =  process.env.PORT;
console.log(port)
app.listen(port, () => console.log(`Server started on port ${port }`));
