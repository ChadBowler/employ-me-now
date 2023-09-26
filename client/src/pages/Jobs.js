import React from "react";
// import JobPosts from "../components/JobPosts"; // Import the job post component here/

const someStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Resizable grid columns
  gap: "16px", // Gap between grid items
  maxWidth: "1200px", // Limit the maximum width of the grid
  margin: "0 auto",
  padding: "20px",
};

const Jobs = () => {
  return (
    <>
    <h1>THIS IS THE JOBS PAGE</h1>
      <div style={someStyle}>
        <>JobPosts go here </> {/* We'll put the JOBS component here.  */}
      </div>
    </>
  );
};

export default Jobs;
