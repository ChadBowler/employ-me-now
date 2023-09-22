// bioSchema
const { Schema } = require('mongoose');

const bioSchema = new Schema({
  skills: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  userDescription: {
    type: String,
  },
});

module.exports = bioSchema;
