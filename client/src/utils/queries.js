import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    username
    resume
    phoneNumber
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
			resume
			dateApplied
			accepted
		}
    _id
  }
}
`;

// export const QUERY_JOB_POSTS = gql`
// 	query getJobPosts {
// 		jobPosts {
// 			_id
// 			title
// 			company
// 			salary
// 			description
// 			applications {
// 				_id
// 				userId
// 				resume
// 				dateApplied
// 				accepted
// 			}
// 			author {
// 				_id
// 				username
// 				email
// 			}
// 		}
// 	}
// `;

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
    phoneNumber
    resume
		applications {
			_id
			resume
			dateApplied
			accepted
		}
  }
}
`;
