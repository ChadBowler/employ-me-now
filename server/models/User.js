// user model
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
import bioSchema from './Bio'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  // array showing bio
  bio: [bioSchema],
  resume: {
    type: File,
  },
  // reference to job posts
  jobsAppliedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'JobPost'
  }],
  // connects what jobs user posted
  postedJobs: [{
    type: Schema.Types.ObjectId,
    ref: 'JobPost'
  }],
  // connects what applications user has created
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Application'
  }],
});

// salt and hash user passwords when saved
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare login password to stored user password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;