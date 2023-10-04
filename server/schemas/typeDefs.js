//typeDefs
import { gql } from 'apollo-server-express';

const typeDefs = gql`
scalar Upload

type User {
  _id: ID
  name: String
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
  salary: String
  dateCreated: String
  description: String
  applications: [Application]!
  author: User
}

type Application {
  _id: ID
  userId: User
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
  jobPosts: [JobPost]
  jobPost(_id: ID!): JobPost
}

type File {
  filename: String!
  path: String!
}

type Mutation {
  addUser(name: String!, username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  postJob(userId: ID!, title: String!, company: String!, salary: String!, description: String!): JobPost
  applyToJob(userId: ID!, jobId: ID!): Application
  updateProfile(userId: ID!, skills: String!, location: String!, userDescription: String!, resume: Upload): User
  acceptApplication(applicationId: ID!, accepted: Boolean!): Application
  uploadResume(file: Upload!): File!
  deleteJobPost(jobId: ID!): JobPost
}
`;

export default typeDefs;
