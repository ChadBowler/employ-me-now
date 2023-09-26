import { gql } from '@apollo/client';

export const QUERY_USER = gql`
	query user($username: String!) {
		user(username: $username) {
			_id
			username
			email
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

export const QUERY_JOB_POSTS = gql`
	query getJobPosts {
		jobPosts {
			_id
			title
			company
      applications {
        _id
        userId
        resume
        dateApplied
        accepted:
      }
      author {
        _id
        username
        email
      }
		}
	}
`;

export const QUERY_ME = gql`
	query me {
		me {
			_id
			username
			email
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
