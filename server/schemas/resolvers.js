// resolvers
// const { AuthenticationError } = require('apollo-server-express');
// const { User, JobPost, Application } = require('../models');
// const { signToken } = require('../utils/auth');
// const { GraphQLUpload } = require('graphql-upload');
// const fs = require('fs');
// const path = require('path');
// const { createWriteStream } = require('fs');
import { AuthenticationError } from 'apollo-server-express';
import { User, JobPost, Application } from '../models/index.js';
import { signToken } from '../utils/auth.js';
// import { GraphQLUpload } from 'graphql-upload';
import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';


const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const resolvers = {
  Query: {
    // find all users
    users: async () => {
      return User.find().populate('jobsAppliedTo').populate('postedJobs').populate('applications');
    },
    // single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('jobsAppliedTo').populate('postedJobs').populate('applications');
    },
    // find user by id
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('jobsAppliedTo').populate('postedJobs').populate('applications');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // find all job posts
    jobPosts: async () => {
      return JobPost.find().populate('author').populate('applications');
    },
    jobPost: async (parent, { _id }) => {
      return JobPost.findOne({ _id }).populate('author').populate('applications');
    },
  },

  Mutation: {
    // adds new user
    addUser: async (parent, { name, username, email, password, phoneNumber }) => {
      const user = await User.create({ name, username, email, password, phoneNumber });
      const token = signToken(user);
      return { token, user };
    },
    // login with email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // post a job with title, company, salary, and description
    postJob: async (parent, { title, company, salary, description }, context) => {
      if (context.user) {
        const jobPost = await JobPost.create({
          title,
          company,
          salary,
          description,
          //author: userId,
          author: context.user._id,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          //{_id: userId},
          { $push: { postedJobs: jobPost._id } },
          { new: true }
        );
        return jobPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteJobPost: async (parent, { jobId }, context) => {
      if (context.user) {
        const jobPost = await JobPost.findOneAndDelete({
          _id: jobId,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          // {_id: userId},
          { $pull: { postedJobs: jobPost._id } },
          { new: true }
        );

        return jobPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // apply to a job
    applyToJob: async (parent, { resume, jobId }, context) => {
      if (context.user) {
        const application = await Application.create({
          userId: context.user._id,
          resume,
        });
        await JobPost.findByIdAndUpdate(
          { _id: jobId },
          { $push: { applications: application._id } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          //{_id: userId},
          { $push: { applications: application._id } },
          { new: true }
        );
        return application;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // update user profile by adding bio and resume
    updateProfile: async (parent, { skills, location, userDescription, resume }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          { $set: { bio: {skills, location, userDescription} }, resume: resume },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // accept or reject an application.  Takes an application id and a boolean of accepted or not
    acceptApplication: async (parent, {applicationId, accepted }, context) => {
      const updatedApplication = await Application.findOneAndUpdate(
        {_id: applicationId},
        { $set: { accepted } },
        { new: true }
      );
      return updatedApplication;
    },
    uploadResume: async (_, { file }) => {
      // Ensure that a file was provided
      if (!file) {
        throw new Error('No file provided');
      }

      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds the maximum allowed limit (10MB)');
      }

      const fileExtension = path.extname(file.filename).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        throw new Error('Invalid file type. Allowed types: .pdf, .doc, .docx');
      }

      try {
        // Create a file stream to store the uploaded file
        const { createReadStream, filename, mimetype, encoding } = await file;
        const stream = createReadStream();

       
        const uploadDir = path.join(__dirname, 'user-resumes');

        // Ensure the upload directory exists; create it if not
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Define the path where the file will be saved
        const filePath = path.join(uploadDir, filename);

        // Create a writable stream and pipe the read stream to it
        const writeStream = createWriteStream(filePath);
        await new Promise((resolve, reject) => {
          stream.pipe(writeStream);
          stream.on('end', resolve);
          stream.on('error', (error) => {
            writeStream.close();
            fs.unlinkSync(filePath); // Delete the file in case of an error
            reject(error);
          });
        });

        // Return the file details
        return {
          filename,
          path: filePath,
        };
      } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
      }
    },
  },
};

export default resolvers;