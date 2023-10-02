import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_JOB_POST } from '../utils/queries'

const SingleJob = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { id } = useParams();
  console.log(id);
  const { loading, data } = useQuery(QUERY_SINGLE_JOB_POST, {
    // pass URL parameter
    variables: { id: id },
  });
  console.log(data);
  const job = data?.jobPost || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='text-white mt-3'>
        <h1>{job.title}</h1>
        <div className='ms-3'>
          <h2>{job.company}</h2>
          <h4>Salary: ${job.salary}</h4>
          <div className='container-fluid card p-3'>
            <h5>Job Description</h5>
            <p className='ms-3'>{job.description}</p>
            <button className='w-25'>Apply Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleJob;