import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_JOB_POST, QUERY_USER } from '../utils/queries';
import { APPLY_TO_JOB } from '../utils/mutations';
import Auth from '../utils/auth';
import {RiArrowGoBackLine} from 'react-icons/ri';
import styles from './singleJob.module.scss';

const SingleJob = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { id } = useParams();
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const [applicationStatus, setApplicationStatus] = useState(null);

  const { loading, data, refetch } = useQuery(QUERY_SINGLE_JOB_POST, {
    // pass URL parameter
    variables: { id: id },
  });
  const [applyToJob] = useMutation(APPLY_TO_JOB);

  const job = data?.jobPost || {};

  const handleApply = async () => {
    try {
      const { data } = await applyToJob({
        variables: { userId, jobId: id },
        
      });
      // Handle success
      setApplicationStatus('success');
     
      console.log('Application submitted successfully:', data);
      
    } catch (error) {
      // Handle errors
      setApplicationStatus('error');
      console.error('Error submitting application:', error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.singleJobContainer}>
      <Link className={styles.backLink} to="/jobs">
        <RiArrowGoBackLine className={styles.backIcon} />
        Back to my job search
      </Link>
      <div>
        <h1 className={styles.jobTitle}>{job.title}</h1>
        <div className='ms-3'>
          <h2 className={styles.company}>{job.company}</h2>
          <h4 className={styles.salary}>Salary: ${job.salary}</h4>
          <div className={`container-fluid card p-3 ${styles.descriptionContainer}`}>
            <h5 className={styles.jobDescription}>Job Description</h5>
            <p className='ms-3'>{job.description}</p>
            {applicationStatus === 'success' ? (
              <div className="alert alert-success" role="alert">
                Application submitted successfully!
              </div>
            ) : applicationStatus === 'error' ? (
              <div className="alert alert-danger" role="alert">
                Error submitting application. Please try again later.
              </div>
            ) : (
              <button
                className={`${styles.applyButton}`}
                onClick={handleApply}
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;