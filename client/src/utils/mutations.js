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
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($userId: ID!, $skills: String!, $location: String!, $userDescription: String!, $resume: String!) {
    updateProfile(userId: $userId, skills: $skills, location: $location, userDescription: $userDescription, resume: $resume) {
      user {
        _id
        username
        bio {
          skills
          location
          userDescription
        }
        resume
      }
		}
	}
`;

export const POST_JOB = gql`
	mutation postJob(
		$userId: ID!
		$title: String!
		$company: String!
		$salary: Int!
		$description: String!
	) {
		postJob(
			userId: $userId
			title: $title
			company: $company
			salary: $salary
			description: $description
		) {
			_id
			title
			company
			salary
			description
			author {
				_id
				username
			}
		}
	}
`;

export const APPLY_TO_JOB = gql`
  mutation applyToJob($userId: ID!
    $resume: String!
    $jobId: ID!
  ) {
    applyToJob(
      userId: $userId
      resume: $resume
      jobId: $jobId
    ) {
      _id
      resume
      jobId
    }
	}
`;
