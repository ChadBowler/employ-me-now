import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../utils/mutations';


const successStyle = {
    fontSize: "1.5rem"
}

const EditProfileForm = ({ user, onSave, onCancel }) => {
  const editedUser = useRef({
    name: user.username || '',
    email: user.email || '',
    // phoneNumber: user.phoneNumber || '',
    skills: user.bio.skills || '',
    location: user.bio.location || '',
    userDescription: user.bio.userDescription || '',
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    editedUser.current = { ...editedUser.current, [name]: value };
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Call the mutation with the edited user data
        await updateProfile({
          variables: {
            userId: user._id,
            // phoneNumber: editedUser.current.phoneNumber,
            skills: editedUser.current.skills,
            location: editedUser.current.location,
            userDescription: editedUser.current.userDescription,
            // resume: user.resume || '',
          },
        });
        
        // Set the success message
        setSuccessMessage('Profile updated successfully!');
  
        // If the mutation is successful, data will contain the updated user data
        const updatedUserData = {
          ...user,
          bio: {
            ...user.bio,
            // phoneNumber: editedUser.current.phoneNumber,
            skills: editedUser.current.skills,
            location: editedUser.current.location,
            userDescription: editedUser.current.userDescription,
          },
        };
        onSave(updatedUserData);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Name:</label>
            <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            />
        </div>
        <div>
            <label>Email:</label>
            <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            />
        </div>
        {/* <div>
            <label>Phone Number:</label>
            <input
            type="text"
            name="phoneNumber"
            value={editedUser.phoneNumber}
            onChange={handleChange}
            />
        </div> */}
        <div>
            <label>Skills:</label>
            <input
            type="text"
            name="skills"
            value={editedUser.skills}
            onChange={handleChange}
            />
        </div>
        <div>
            <label>Location:</label>
            <input
            type="text"
            name="location"
            value={editedUser.location}
            onChange={handleChange}
            />
        </div>
        <div>
            <label>User Description:</label>
            <textarea
            name="userDescription"
            value={editedUser.userDescription}
            onChange={handleChange}
            />
        </div>
        <div>
            <button type="submit" onClick={onSave}>Save</button>
            <button type="button" onClick={onCancel}>
            Close
            </button>
        </div>
        </form>
        {successMessage && <div style={successStyle} className="success-message">{successMessage}</div>}
    </div>
  );
};

export default EditProfileForm;
