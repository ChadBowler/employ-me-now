import React from 'react';
import JobPosts from '../components/JobPosts';

import { useQuery } from '@apollo/client';
import { QUERY_JOB_POSTS } from '../utils/queries';

const someStyle = {
	// display: 'grid',
	// gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Resizable grid columns
	// gap: '16px', // Gap between grid items
	// maxWidth: '1200px', // Limit the maximum width of the grid
	// margin: '0 auto',
	// padding: '20px',
};

const buttonStyle = {
	color: 'white',
	backgroundColor: '#1F5014',
	border: 'none',
	width: '150px',
	height: '50px',
};

const Jobs = () => {
	const { loading, data } = useQuery(QUERY_JOB_POSTS);
	const jobPosts = data?.jobPosts || [];
	return (
		<div className='min-vh-100 bg-dark'>
			<div className='d-flex justify-content-between'>
				<h1 className='text-left ms-5 ps-5 text-white py-5'>Jobs:</h1>
				<div className='me-5 pe-5 py-5'>
					<button style={buttonStyle}>Post New Job</button>
				</div>
			</div>
			<div style={someStyle}>
				{loading ? (
					<div>Loading...</div>
				) : (
					<JobPosts jobPosts={jobPosts} />
				)}
			</div>
		</div>
	);
};

export default Jobs;
