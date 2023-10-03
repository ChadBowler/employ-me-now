import React, { useState } from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import Auth from "../../utils/auth";
import Modal from 'react-modal';
import styles from './UserProfile.module.scss';
import EditProfileForm from "../EditProfileForm";

//Hide background elements for accessibility while modal is open
Modal.setAppElement('#root');

const GET_USER_PROFILE = gql`
query GetUserProfile($username: String!) {
  user(username: $username) {
    _id
    username
    email
    bio {
      skills
      location
      userDescription
    } 
  }
}
`;

const UserProfile = () => {
  //Check user authentication
  const username = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE, {
    variables: { username },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error){
    console.error("GraphQL error:", error.message);
    return <div>Error: {error.message}</div>;
  } 

  const user = data.user;
//Button handlers
  const handleEditProfileClick = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveProfileClick = async () => {
    refetch();
    setIsModalOpen(false);
  }

  return (
    <>
      <div>
        <h1>User Profile: {user.username}</h1>
        <p>Email: {user.email}</p>
        {/* <p>Phone Number: {user.bio.phoneNumber}</p> */}
        {user.bio.length > 0 ? (
          <>
            <p>Skills: {user.bio[0].skills}</p>
            <p>Location: {user.bio[0].location}</p>
            <p>User Description: {user.bio[0].userDescription}</p>
          </>
        ) : (
          <p>No bio information available.</p>
        )}
        <button onClick={handleEditProfileClick}>Edit Profile</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Profile Modal"
        className={`${styles.profileModal}`}
      >
       
        <h2>Edit Profile</h2>
        <EditProfileForm user={user} onSave={handleSaveProfileClick} onCancel={closeModal} />
      </Modal>
    </>
  );
};

export default UserProfile;