// connect to database
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employ-me-now-db');

module.exports = mongoose.connection;
