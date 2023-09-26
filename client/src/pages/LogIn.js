import React, { useState } from "react";

const someStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
};

const LogIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameOrEmailChange = (event) => {
    setUsernameOrEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Perform login logic here (e.g., send login data to the server)
    console.log("Login submitted with username/email:", usernameOrEmail, "and password:", password);

    // Redirect to the Dashboard or perform any other action upon successful login
    // For demonstration, we'll log a success message
    console.log("Login successful! Redirecting to the Dashboard...");
  };

  return (
    <>
      <div style={someStyle}>
        <h1>THIS IS THE LOG IN PAGE</h1>
        <p1>It should take you to the Dashboard once you are logged in.</p1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="usernameOrEmail">Username/Email:</label>
            <input type="text" id="usernameOrEmail" value={usernameOrEmail} onChange={handleUsernameOrEmailChange} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
