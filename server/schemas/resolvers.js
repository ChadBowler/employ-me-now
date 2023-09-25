// resolvers
const { AuthenticationError } = require('apollo-server-express');
const { User, JobPost, Application } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('jobsAppliedTo').populate('postedJobs').populate('applications');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('jobsAppliedTo').populate('postedJobs').populate('applications');
    },
    me: async (parent, args, context) => {
      // if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('jobsAppliedTo').populate('postedJobs').populate('applications');
      //},
      // throw new AuthenticationError('You need to be logged in!');
    },
    jobPosts: async () => {
      return JobPost.find().populate('author').populate('applications');
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
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
    jobPost: async (parent, { userId, title, company, salary, description }, context) => {
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
  },
};

module.exports = resolvers;