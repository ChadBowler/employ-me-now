//application model
const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  resume: {
    type: String,
    required: true,
    trim: true,
  },
  accepted: {
    type: Boolean,
  }
});

const Application = model('Application', applicationSchema);

module.exports = Application;
