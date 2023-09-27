import React from 'react';

const postSize = {
	height: '300px',
	width: '200px',
	border: '1rem solid #1F5014',
};

const buttonStyle = {
	color: 'white',
	backgroundColor: '#1F5014',
	border: 'none',
	width: '150px',
	height: '50px',
};

const jobTitleStyle = {
	textAlign: 'center',
	marginTop: '1rem',
};

const jobDescriptionStyle = {
	textAlign: 'center',
	marginTop: '1rem',
};

const JobPosts = ({ postedJobs }) => {
	if (!postedJobs.length) {
		return <h3>No Jobs Posted</h3>;
	}
	return (
		<div className='d-flex flex-row justify-content-center mx-4 gap-4'>
			<div>
				<div
					style={postSize}
					className='text-white'
				>
					<h5 style={jobTitleStyle}>Job Title</h5>
					<p style={jobDescriptionStyle}>Job Description</p>
				</div>
				<div className='d-flex justify-content-center mt-5'>
					<button style={buttonStyle}>See This Job</button>
				</div>
			</div>
			<div>
				<div
					style={postSize}
					className='text-white'
				>
					<h5 style={jobTitleStyle}>Job Title</h5>
					<p style={jobDescriptionStyle}>Job Description</p>
				</div>
				<div className='d-flex justify-content-center mt-5'>
					<button style={buttonStyle}>See This Job</button>
				</div>
			</div>
			<div>
				<div
					style={postSize}
					className='text-white'
				>
					<h5 style={jobTitleStyle}>Job Title</h5>
					<p style={jobDescriptionStyle}>Job Description</p>
				</div>
				<div className='d-flex justify-content-center mt-5'>
					<button style={buttonStyle}>See This Job</button>
				</div>
			</div>
			<div>
				<div
					style={postSize}
					className='text-white'
				>
					<h5 style={jobTitleStyle}>Job Title</h5>
					<p style={jobDescriptionStyle}>Job Description</p>
				</div>
				<div className='d-flex justify-content-center mt-5'>
					<button style={buttonStyle}>See This Job</button>
				</div>
			</div>
		</div>
	);
};

export default JobPosts;
