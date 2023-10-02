import React, { useState } from 'react';
import styles from './PostJob.module.scss';
import { useMutation } from '@apollo/client';
import { POST_JOB } from '../../utils/mutations';
import Auth from '../../utils/auth';

const PostJob = ({ onAddJobPosting, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    salary: 10000,
    description: '',
  });

  const userId = Auth.loggedIn() ? Auth.getProfile().data._id: null;
  // console.log(Auth.getProfile().data._id);
  const [postJob] = useMutation(POST_JOB);
  const [successMessage, setSuccessMessage] = useState('');
 
  const salaryOptions = [];
  const maxSalary = 1000000;
  const increment = 5000; //Increment by $5,000

  for (let salary = 10000; salary <= maxSalary; salary += increment) {
    salaryOptions.push(salary);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const { data } = await postJob({
        variables: {
          userId: userId,
          ...formData,
        },
      });

      // Reset the form
      setFormData({
        title: '',
        company: '',
        salary: 10000,
        description: '',
      });
      setSuccessMessage('Job posting added successfully');
      onAddJobPosting();
      // Handle the response data as needed
      // console.log('Job posting added:', data.postJob);
    } catch (error) {
      console.error('Error adding job posting:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="salary-input-container">
          <label htmlFor="salary">Salary:</label>
          <div className="range-slider">
            <input
              type="range"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              min={10000}
              max={1000000}
              step={5000}
              required
            />
          </div>
          <select
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          >
            {salaryOptions.map((salary, index) => (
              <option key={index} value={salary}>
                ${salary.toLocaleString()} {/* Format salary as currency */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add Job Posting</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      {successMessage && (<div className="success-message">{successMessage}</div>)}

    </div>
  );
};

export default PostJob;
