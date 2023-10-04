import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import styles from './JobPosts.module.scss';

const postSize = {
	height: '10rem',
	width: '100%',
	border: '1rem solid #1F5014',
	marginTop: '1rem',
};
const headerStyle = {
	backgroundColor: '#212529',
	color: '#F6F6F6',
	fontSize: '3rem',
	paddingBottom: '40px',
	paddingLeft: '20px'
}
const headerDescriptionStyle = {
	backgroundColor: '#212529',
	color: '#F6F6F6',
	fontSize: '3rem',
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
	fontWeight: 'bold',
}

// const buttonStyle = {
// 	color: 'white',
// 	backgroundColor: '#1F5014',
// 	border: 'none',
// 	width: '150px',
// 	height: '50px',
// 	fontWeight: 'bold',
// };
const tableStyle = {
	backgroundColor: '#212529',
}

const JobPosts = ({ jobPosts }) => {
	if (!jobPosts) {
		return <h3 className='text-white text-center'>No Jobs Posted</h3>;
	}
	return (
		<table className='table'>
		  <thead style={postSize} className={styles.tableHeader}>
			<tr style={headerStyle}>
			  <th style={headerStyle}>Title</th>
			  <th style={headerDescriptionStyle}>Description</th>
			  <th style={headerStyle}>Action</th>
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
	// return (
	// 	<div className='d-flex flex-column mx-4'>
	// 		{jobPosts &&
	// 			jobPosts.map((jobPost) => (
	// 				<div
	// 					key={jobPost._id}
	// 					className='d-flex justify-content-center'
	// 				>
	// 					<div
	// 						style={postSize}
	// 						className='text-white d-flex justify-content-between align-items-center'
	// 					>
	// 						<h3>{jobPost.title}</h3>
	// 						<p className='d-none d-lg-block'>
	// 							{jobPost.description}
	// 						</p>
	// 						<Link
	// 							className='btn d-flex align-items-center justify-content-center'
	// 							style={buttonStyle}
	// 							to={`/singleJob/${jobPost._id}`}
	// 						>
	// 							See This Job
	// 						</Link>
	// 					</div>
	// 				</div>
	// 			))}
	// 	</div>
	// );
};

export default JobPosts;
