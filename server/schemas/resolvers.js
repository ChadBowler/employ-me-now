// resolvers
const { AuthenticationError } = require('apollo-server-express');
const { User, JobPost, Application } = require('../models');
const { signToken } = require('../utils/auth');

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
      // throw new AuthenticationError('You need to be logged in!');
    },
    // find all job posts
    jobPosts: async () => {
      return JobPost.find().populate('author').populate('applications');
    },
    jobPost: async (parent, { _id }) => {
      return JobPost.findOne({ _id }).populate('author').populate('applications');
    },
  },

  // const handleSignUp = async (formData) => {
  //   try {
  //     // Send the form data to the server using GraphQL mutation
  //     // You'll need to handle this based on your Apollo Client setup
  //     const response = await signUpMutation({
  //       variables: {
  //         ...formData,
  //       },
  //     });
  
  //     console.log('User signed up:', response.data.addUser);
  
  //     // Handle storing the response data in MongoDB (User collection)
  //     // You'll need to handle this based on your backend setup
  
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  // };

  Mutation: {
    // adds new user
    addUser: async (parent, { username, email, password, phone }) => {
      const user = await User.create({ username, email, password, phone });
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
    postJob: async (parent, { userId, title, company, salary, description }, context) => {
      // if (context.user) {
        const jobPost = await JobPost.create({
          title,
          company,
          salary,
          description,
          author: userId,
          // author: context.user.username,
        });
        await User.findByIdAndUpdate(
          // { _id: context.user._id },
          {_id: userId},
          { $push: { postedJobs: jobPost._id } },
          { new: true }
        );
        return jobPost;
      //}
      // throw new AuthenticationError('You need to be logged in!');
    },
    // apply to a job
    applyToJob: async (parent, { userId, resume, jobId }, context) => {
      // if (context.user) {
        const application = await Application.create({
          userId,
          resume,
        });
        await JobPost.findByIdAndUpdate(
          { _id: jobId },
          { $push: { applications: application._id } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          // { _id: context.user._id },
          {_id: userId},
          { $push: { applications: application._id } },
          { new: true }
        );
        return application;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    // update user profile by adding bio and resume
    updateProfile: async (parent, { userId, skills, location, userDescription, resume }, context) => {
      // if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {_id: userId},
          { $addToSet: { bio: {skills, location, userDescription} }, resume: resume },
          { new: true }
        );
        return updatedUser;
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
  },
};

module.exports = resolvers;