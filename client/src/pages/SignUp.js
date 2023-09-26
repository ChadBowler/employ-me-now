import React, { useState } from "react";

const someStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Validate if all fields are entered
    if (!name || !username || !dateOfBirth || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Perform the sign-up logic here, e.g., send the data to the server
    console.log("Sign up submitted with:", { name, username, dateOfBirth, email, password });
  };

  return (
    <>
      <div style={someStyle}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} required />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
          </div>
          <div>
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={handleDateOfBirthChange} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
