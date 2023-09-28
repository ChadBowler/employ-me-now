import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USER_PROFILE = gql`
query GetUserProfile($username: String!) {
  user(username: $username) {
    username
    email
    bio {
      phoneNumber
      skills
      location
      userDescription
    }
    // Add other fields you want to fetch
  }
}
`;

const UserProfile = () => {
  const username = "example_username"; 
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { username },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data.user;

  return (
    <>
      <div>
        <h1>User Profile: {user.username}</h1>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.bio.phoneNumber}</p>
        <p>Skills: {user.bio.skills}</p>
        <p>Location: {user.bio.location}</p>
        <p>User Description: {user.bio.userDescription}</p>
      </div>
    </>
  );
};

export default UserProfile;