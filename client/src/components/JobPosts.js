import React from "react";
// Imports Apollo Client dependencies: //
import { useQuery, gql } from "@apollo/client"; 

const GetJobPost = gql`
 query JobPost {
  jobPosts {
   _id
   title
   company
   salary
   description
  }
 }
`;

const JobsList = () => {
 const { loading, error, data } = useQuery(GetJobPost);

 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error.message}</p>;

 return (
  <>
     <h2>Job Listings</h2>
     <ul>
      {data.jobPosts.map((jobPost) => (
       <li key={jobPost._id}>
        <h3>{jobPost.title}</h3>
        <p>{jobPost.company}</p>
        <p>{jobPost.description}</p>
       </li>
      ))}
     </ul>   
  </>
 );
};

export default JobsList;
