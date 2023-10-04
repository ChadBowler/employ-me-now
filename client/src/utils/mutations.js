import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($name: String!, $username: String!, $email: String!, $password: String!) {
		addUser(name: $name, username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;
export const UPDATE_PROFILE = gql`
mutation updateProfile(
	$userId: ID!
	$skills: String!
	$location: String!
	$userDescription: String!
  ) {
	updateProfile(
	  userId: $userId
	  skills: $skills
	  location: $location
	  userDescription: $userDescription
	) {
	  username
	  email
	  bio {
		location
		skills
		userDescription
	  }
	}
  }
`;

export const POST_JOB = gql`
mutation postJob($userId: ID!, $title: String!, $company: String!, $salary: String!, $description: String!) {
	postJob(userId: $userId, title: $title, company: $company, salary: $salary, description: $description) {
	  title
	  company
	  salary
	  description
	}
  }
`;

export const DELETE_JOB_POST = gql`
mutation deleteJobPost($jobId: ID!) {
  deleteJobPost(jobId: $jobId) {
    _id
  }
}
`;
export const APPLY_TO_JOB = gql`
  mutation applyToJob($userId: ID!
    $jobId: ID!
  ) {
    applyToJob(
      userId: $userId
      jobId: $jobId
    ) {
      _id
    }
	}
`;