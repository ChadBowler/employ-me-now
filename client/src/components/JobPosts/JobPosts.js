import React from 'react';
import { Link } from 'react-router-dom';
import styles from './JobPosts.module.scss';

const postSize = {
	height: '10rem',
	width: '100%',
	border: '1rem solid #1F5014',
	marginTop: '1rem'
};
const headerStyle = {
	backgroundColor: '#212529',
	color: '#F6F6F6',
	fontSize: '2.5rem',
	paddingBottom: '40px',
	paddingLeft: '20px'
}
const headerDescriptionStyle = {
	backgroundColor: '#212529',
	color: '#F6F6F6',
	fontSize: '2.5rem',
	paddingBottom: '40px'
}
const jobTitleStyle = {
	backgroundColor: '#212529',
	color: '#F6F6F6',
	fontSize: '2rem',
	paddingTop: '40px',
	fontWeight: 'bold',
	paddingLeft: '20px'
}
const jobDescriptionStyle = {
	backgroundColor: '#212529',
	color: '#F6F6F6',
	fontSize: '1.25rem',
	paddingTop: '40px',
	fontWeight: 'bold'
}

const JobPosts = ({ jobPosts }) => {
	if (!jobPosts) {
		return <h3 className='text-white text-center'>No Jobs Posted</h3>;
	}
	return (
		<table className='table table-responsive'>
		  <thead style={postSize} className={styles.tableHeader}>
			<tr>
			  <th style={headerStyle}>Title</th>
			  <th style={headerDescriptionStyle}>Description</th>
			</tr>
		  </thead>
		  <tbody>
			{jobPosts.map((jobPost) => (
			  <tr key={jobPost._id} style={postSize} className={styles.tableRow}>
				<td style={jobTitleStyle}>{jobPost.title}</td>
				<td style={jobDescriptionStyle} className='d-none d-lg-table-cell'>{jobPost.description}</td>
				<td style={jobTitleStyle}>
				  <Link
					className={`btn ${styles['btnSeeJob']}`}
					to={`/singleJob/${jobPost._id}`}
				  >
					See This Job
				  </Link>
				</td>
			  </tr>
			))}
		  </tbody>
		</table>
	  );
};

export default JobPosts;
