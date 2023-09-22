// bioSchema
const { Schema } = require('mongoose');

const bioSchema = new Schema({
  skills: {
    type: String,
  },
  location: {
    type: String,
  },
  userDescription: {
    type: String,
  },
});

module.exports = bioSchema;
