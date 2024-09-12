// db.js
const mongoose = require('mongoose');


// Connection URI
const url =process.env.MONGO_URI; 
// const url = 'mongodb://127.0.0.1:27017/nodejs'; // Replace with your MongoDB connection URI and database name

mongoose.connect(url);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to database');
});

module.exports = db;
