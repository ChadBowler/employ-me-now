import React from 'react';
import { Link } from 'react-router-dom';

const postSize = {
	height: '10rem',
	width: '100%',
	border: '1rem solid #1F5014',
	marginTop: '1rem',
};

const buttonStyle = {
	color: 'white',
	backgroundColor: '#1F5014',
	border: 'none',
	width: '150px',
	height: '50px',
	fontWeight: 'bold',
};

const JobPosts = ({ jobPosts }) => {
	if (!jobPosts) {
		return <h3 className='text-white text-center'>No Jobs Posted</h3>;
	}
	return (
		<div className='d-flex flex-column mx-4'>
			{jobPosts &&
				jobPosts.map((jobPost) => (
					<div
						key={jobPost._id}
						className='d-flex justify-content-center'
					>
						<div
							style={postSize}
							className='text-white d-flex justify-content-around align-items-center'
						>
							<h3>{jobPost.title}</h3>
							<p className='d-none d-lg-block'>
								{jobPost.description}
							</p>
							<Link
								className='btn d-flex align-items-center justify-content-center'
								style={buttonStyle}
								to={`/singleJob/${jobPost._id}`}
							>
								See This Job
							</Link>
						</div>
					</div>
				))}
		</div>
	);
};

export default JobPosts;
