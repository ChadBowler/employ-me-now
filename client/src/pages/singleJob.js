import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_JOB_POST, GET_USER_PROFILE } from '../utils/queries';
import { APPLY_TO_JOB } from '../utils/mutations';
import Auth from '../utils/auth';
import {RiArrowGoBackLine} from 'react-icons/ri';
import styles from './singleJob.module.scss';

const SingleJob = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { id } = useParams();
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const { loading: jobLoading, data: jobData, } = useQuery(QUERY_SINGLE_JOB_POST, {
    // pass URL parameter
    variables: { id: id },
  });
  const { loading: userLoading, data: userData, refetch } = useQuery(GET_USER_PROFILE, {
    // pass URL parameter
    variables: { username },
  });
  const [applyToJob] = useMutation(APPLY_TO_JOB);

  const job = jobData?.jobPost || {};
  useEffect(() => {
    if (userData && userData.user) {
      const appliedJobs = userData.user.jobsAppliedTo;
      const hasApplied = appliedJobs.some(job => job._id === id);
      // console.log(true);
      setAlreadyApplied(hasApplied);
  
      if (hasApplied) {
        setApplicationStatus('applied');
      }
    } 
  }, [userData, id, job._id]);


  const handleApply = async () => {
    try {
      const { data } = await applyToJob({
        variables: { userId, jobId: id },
        
      });
      // Handle success
      setApplicationStatus('success');
      refetch();
      console.log('Application submitted successfully:', data);
      
    } catch (error) {
      // Handle errors
      setApplicationStatus('error');
      console.error('Error submitting application:', error);
    }
  };
  
  if (jobLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.singleJobContainer}>
      <Link className={styles.backLink} to="/jobs">
        <RiArrowGoBackLine className={styles.backIcon} />
        See all jobs
      </Link>
      <div>
        <h1 className={styles.jobTitle}>{job.title}</h1>
        <div className='ms-3'>
          <h2 className={styles.company}>{job.company}</h2>
          <h4 className={styles.salary}>Salary: ${job.salary}</h4>
          <div className={`container-fluid card p-3 ${styles.descriptionContainer}`}>
            <h5 className={styles.jobDescription}>Job Description</h5>
            <p className='ms-3'>{job.description}</p>
            {alreadyApplied ? (
              <div className="alert alert-info" role="alert">
                You have successfully applied to this job.
              </div>
            ) : applicationStatus === 'success' ? (
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
                disabled={alreadyApplied}
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