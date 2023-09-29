import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

// import UserProfile from "../components/UserProfile";

const someStyle = {
 //add styles
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
 return (
  <>
   <div style={someStyle}>
    <section>
     <h1>Welcome {userParam ? `${user.name}` : "your"}</h1>
     {/* react logic for pulling user info - name, &c. */}

     <h1>{user.name}'s Profile</h1>
     {/* <UserProfile /> */}
    </section>
    <div>
     <section>
      <h3>
      {user.phoneNumber}
      </h3>
      <p1></p1>
      <ul>
       <li></li>
      </ul>
     </section>
    </div>
   </div>
  </>
 );
};

export default Dashboard;
