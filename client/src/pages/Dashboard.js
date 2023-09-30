import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import styles from './Dashboard.module.scss';
import UserProfile from "../components/UserProfile";

const someStyle = {
 // add styles
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

 // Check if user data is available
 if (loading) {
  return <div>Loading...</div>;
 }

 if (!user?.username) {
  // Handle the case when user data is not available
  return (
    <div className={styles.main}>
      <div style={someStyle} className="text-white mt-4">
        <h1>User Profile</h1>
        <p>You need to be logged in to see this. Use the navigation links above to sign up or log in!</p>
      </div>
    </div>
  );
 }

 if (!user.bio) {
  // Handle the case when user.bio is not available (no profile information)
  return (
    <>
      <div style={someStyle} className="text-white mt-4">
        <h1>User Profile</h1>
        <p>No profile information available for this user.</p>
        <button className="btn btn-success" style={buttonStyle}>Edit Profile</button>
      </div>
    </>
  );
 }

 // User data is available, and user.bio is available, render the existing content
 return (
  <>
   <div style={someStyle} className={`text-white mt-4 ${styles.main}`}>
      <UserProfile />
   </div>
  </>
 );
};

export default Dashboard;
