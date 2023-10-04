import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    username
    password
    name
    email
    bio {
      userDescription
      skills
      location
      id
    }
		applications {
			_id
			dateApplied
			accepted
		}
    _id
    postedJobs {
      title
      salary
      description
      dateCreated
      company
      _id
    }
  }
}
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bio {
        skills
        location
        userDescription
      }
      postedJobs {
        title
        salary
        description
        dateCreated
        company
        _id
      }
      jobsAppliedTo { 
        title
        salary
        description
        dateCreated
        company
        _id
      }
    }
  }
`;

export const QUERY_JOB_POSTS = gql`
	query GetJobPosts {
		jobPosts {
			_id
			title
			company
			description
		}
	}
`;

export const QUERY_SINGLE_JOB_POST = gql`
query JobPost($id: ID!) {
  jobPost(_id: $id) {
    _id
    title
    description
    salary
    company
    dateCreated
  }
}
`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    email
    bio {
      id
      location
      skills
      userDescription
    }
    name
		applications {
			_id
			dateApplied
			accepted
		}
    postedJobs {
      title
      salary
      description
      dateCreated
      company
      _id
    }
  }
}
`;
