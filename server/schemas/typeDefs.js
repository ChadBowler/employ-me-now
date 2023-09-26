//typeDefs
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
  bio: [Bio]!
  resume: String
  jobsAppliedTo: [JobPost]!
  postedJobs: [JobPost]!
  applications: [Application]!
}

type Bio {
  id: ID
  skills: String
  location: String
  userDescription: String
}

type JobPost {
  _id: ID
  title: String
  company: String
  salary: Int
  dateCreated: String
  description: String
  applications: [Application]!
  author: User
}

type Application {
  _id: ID
  userId: User
  resume: String
  dateApplied: String
  accepted: Boolean
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user(username: String!): User
  me: User
  jobPosts: [JobPost]!
  jobPost(_id: ID!): JobPost
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  postJob(userId: ID!, title: String!, company: String!, salary: Int!, description: String!): JobPost
  applyToJob(userId: ID!, resume: String!, jobId: ID!): Application
  updateProfile(userId: ID!, skills: String!, location: String!, userDescription: String!, resume: String!): User
  acceptApplication(applicationId: ID!, accepted: Boolean!): Application
}
`;

module.exports = typeDefs;
