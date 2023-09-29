import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

// import UserProfile from "../components/UserProfile";

const someStyle = {
 //add styles
};

const buttonStyle = {
  background: "#1F5014",
  borderRadius: "10px",
  color: "white",
};

const Dashboard = () => {
 const { username: userParam } = useParams();

 const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  variables: { username: userParam },
 });
 console.log(userParam);
 const user = data?.me || data?.user || {};
 console.log(user);
 // navigate to personal profile page if username is yours
 if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  return <Navigate to="/me" />;
 }

 if (loading) {
  return <div>Loading...</div>;
 }

 if (!user?.username) {
  return (
   <h4>
    You need to be logged in to see this. Use the navigation links above to sign
    up or log in!
   </h4>
  );
 }
 
 // format skills as an array
 const skillsArray = user.bio[0].skills.split(",");
 console.log(skillsArray);
 return (
  <>
   <div style={someStyle} className="text-white mt-4">
     <h1>User Profile</h1>
     {/* react logic for pulling user info - name, &c. */}
     {/* <UserProfile /> */}
    <div className="container">
    <div className="row">
      <div className="ms-4 col-md-4">
        <h4 className="mt-4">Name: {user.name}</h4>
        <div className="ms-2 mt-4">
          <p>Email: {user.email}</p>
          <p>Phone: {user.phoneNumber}</p>
          <p>Skills:</p>
          <p>{skillsArray.map((skill) => {
            return <li>{skill}</li>;
          })}</p>
          <p>About Me:</p>
          <p className="ms-4">{user.bio[0].userDescription}</p>
        </div>
        <button className="btn btn-success" style={buttonStyle}>Edit Profile</button>
      </div>
      <div className="ms-4 col-md-6">
        <h4>Applications</h4>
        <p>Number of Applications: {user.applications.length}</p>
        {/* itterate through applications */}
      </div>
    </div>
    </div>
   </div>
  </>
 );
};

export default Dashboard;
