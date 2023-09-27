import React from 'react';
import JobPosts from '../components/JobPosts'; // Import the job post component here/
import Card from 'react-bootstrap/Card';

const someStyle = {
	// display: 'grid',
	// gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Resizable grid columns
	// gap: '16px', // Gap between grid items
	// maxWidth: '1200px', // Limit the maximum width of the grid
	// margin: '0 auto',
	// padding: '20px',
};

const Jobs = () => {
	return (
		<div
			className='min-vh-100 bg-dark
    '
		>
			<h1 className='text-left ms-5 ps-5 text-white py-5'>Jobs:</h1>
			<div style={someStyle}>
				<JobPosts />
			</div>
		</div>
	);
};

export default Jobs;
