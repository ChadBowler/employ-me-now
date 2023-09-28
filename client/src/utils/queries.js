import { gql } from '@apollo/client';

export const QUERY_USER = gql`
	query user($username: String!) {
		user(username: $username) {
			_id
			username
			email
			phoneNumber
			jobsAppliedTo {
				_id
				title
				company
				salary
				dateCreated
				description
				applications
				author
			}
			postedJobs {
				_id
				title
				company
				salary
				dateCreated
				description
				applications
				author
			}
			applications {
				_id
				userId
				resume
				dateApplied
				accepted
			}
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
	query GetSingleJobPost($id: ID!) {
		jobPost(_id: $id) {
			_id
			title
			description
			company
		}
	}
`;

export const QUERY_ME = gql`
	query me {
		me {
			_id
			username
			email
			phoneNumber
			jobsAppliedTo {
				_id
				title
				company
				salary
				dateCreated
				description
				applications
				author
			}
			postedJobs {
				_id
				title
				company
				salary
				dateCreated
				description
				applications
				author
			}
		}
	}
`;
