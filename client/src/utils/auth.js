const { AuthenticationError } = require('apollo-server-express');
const { User, JobPost, Bio, Application } = require('../models');
const { signToken } = require('../utils/auth');
