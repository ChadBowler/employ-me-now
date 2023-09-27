import React from "react";
// import JobPosts from "../components/JobPosts";
// import PostJob from "../components/PostJob"

const jobListStyle = {
  border: '1px solid #000',
  display: "grid",
 gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
 // Resizable grid columns. //
 gap: "16px", // Gap between grid items. //
 maxWidth: "1200px", // Limit the maximum width of the grid. //
 margin: "0 auto",
 padding: "20px",
};

const postJobStyle = {
  border: '1px solid #000',
};

const Jobs = () => {
 return (
  <>
   <h1>JOBS:</h1>

   <div style={{ display: "flex", flexDirection: "column" }}>

      <div className="job-list-container"  style={jobListStyle}>
      {/* Lists jobs: */}
      <h2>Card for list of available Jobs ---> </h2>
      {/* <JobPosts /> */}
      </div>

      <div className="job-post-container" style={postJobStyle}>
      {/* Box for posting jobs: */}
      <>This is a card where you can use a form to post a new Job</>
      {/* <PostJob /> */}
      </div>

   </div>
  </>
 );
};

export default Jobs;
