import React, { useState } from 'react';
import styles from './PostJob.module.scss'

const PostJob = ({ onAddJobPosting, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    salary: 10000,
    description: '',
  });

 
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the function to add the job posting
    onAddJobPosting(formData);

    // Reset the form
    setFormData({
      title: '',
      company: '',
      salary: '',
      description: '',
    });
  };

  return (
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
  );
};

export default PostJob;
