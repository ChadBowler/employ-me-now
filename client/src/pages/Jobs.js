import React, { useState } from 'react';
import JobPosts from '../components/JobPosts';
import PostJob from '../components/PostJob/PostJob';
import Modal from 'react-modal';
import { useQuery } from '@apollo/client';
import { QUERY_JOB_POSTS } from '../utils/queries';
import styles from './Jobs.module.scss';

//Hide background elements for accessibility when modal is open
Modal.setAppElement('#root');

const buttonStyle = {
	color: 'white',
	backgroundColor: '#1F5014',
	border: 'none',
	width: '150px',
	height: '50px',
	fontWeight: 'bold',
};

const Jobs = () => {
	const { loading, data, refetch } = useQuery(QUERY_JOB_POSTS);
	const jobPosts = data?.jobPosts || [];
	//State to manage modal visibility
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const handleAddJobClick = async () => {
		refetch();
		setIsModalOpen(false);
	};

	return (
		<div className='min-vh-100 bg-dark'>
			<div className='d-flex justify-content-between align-items-center'>
				<h1 className='text-left ms-5 ps-5 text-white py-5'>Jobs:</h1>
				<div className='me-5 pe-5 py-5'>
					<button
						style={buttonStyle}
						onClick={openModal}
					>
						Post New Job
					</button>
				</div>
			</div>
			<div>
				{loading ? (
					<div>Loading...</div>
				) : (
					<JobPosts jobPosts={jobPosts} />
				)}
			</div>

			{/* Modal for posting a new job */}
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel='Post Job Modal'
				className={`${styles.jobsModal}`}
			>
				<h2>Post a New Job</h2>
				<PostJob
					onAddJobPosting={handleAddJobClick}
					onCancel={closeModal}
				/>
			</Modal>
		</div>
	);
};

export default Jobs;
