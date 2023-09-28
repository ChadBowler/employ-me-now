import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const someStyle = {
  //add styles
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
};

const LogIn = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // function to update the state of the form as input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      // retrieve data from the login mutation using the user's input email and password
      const { data } = await login({
        variables: { ...formState },
      });
      // console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
    <div style={someStyle}>
      <h1>LOGIN PAGE</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input 
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}>
          </input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}>
          </input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/signup">signup here</Link>
    </div>
    </>
  );
};

export default LogIn;