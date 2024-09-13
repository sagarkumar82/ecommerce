// db.js
const mongoose = require('mongoose');


// Connection URI
const url =process.env.MONGO_URI; 
mongoose.connect(url);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to database');
});

module.exports = db;
