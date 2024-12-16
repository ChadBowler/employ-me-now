import React from 'react';
import { Link } from 'react-router-dom';
import styles from './JobPosts.module.scss';

const JobPosts = ({ jobPosts }) => {
  if (!jobPosts) {
    return <h3 className='text-white text-center'>No Jobs Posted</h3>;
  }
  return (
    <table className='table table-responsive'>
      <thead className={`${styles.tableRow} ${styles.tableHeader}`}>
        <tr>
          <th className={styles.tableHeaderTitle}>Title</th>
          <th className={styles.tableHeaderDescription}>Description</th>
        </tr>
      </thead>
      <tbody>
        {jobPosts.map((jobPost) => (
          <tr key={jobPost._id} className={styles.tableRow}>
            <td className={styles.tableRowTitle}>{jobPost.title}</td>
            <td className={`${styles.tableRowDescription} d-none d-lg-table-cell`}>
              {jobPost.description}
            </td>
            <td className={styles.tableRowTitle}>
              <Link
                className={`btn ${styles.btnSeeJob}`}
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