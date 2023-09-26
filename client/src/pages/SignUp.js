import React, { useState } from 'react';

const signUpContainer = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !username || !dateOfBirth || !email || !password || !phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    console.log('Sign up submitted with:', { name, username, dateOfBirth, email, password, phoneNumber });
  };

  return (
    <>
      <div style={signUpContainer}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => handleInputChange(e, setName)} required />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => handleInputChange(e, setUsername)} required />
          </div>
          <div>
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => handleInputChange(e, setDateOfBirth)} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => handleInputChange(e, setEmail)} required />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => handleInputChange(e, setPhoneNumber)} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => handleInputChange(e, setPassword)} required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
