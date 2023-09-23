//job post model
const { Schema, model } = require('mongoose');

const jobPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Application'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const JobPost = model('JobPost', jobPostSchema);

module.exports = JobPost;