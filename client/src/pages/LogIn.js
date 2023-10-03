import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const someStyle = {
  //add styles
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
};

const buttonStyle = {
  background: "#1F5014",
  borderRadius: "10px",
  color: "white",
};

const LogIn = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
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
    // console.log(formState);
    try {
      // retrieve data from the login mutation using the user's input email and password
      const { data } = await login({
        variables: { ...formState },
      });
      // console.log(data);
      Auth.login(data.login.token);
      navigate('/me');
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
    <div className="text-white" style={someStyle}>
      <h1 className="text-center">Log In</h1>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control name="email" value={formState.email} onChange={handleChange} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control name="password" value={formState.password} onChange={handleChange} type="password" placeholder="Password" />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button style={buttonStyle} variant="primary-color" type="submit">
            Log In
          </Button>
        </div>
      </Form>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
      <div className="text-center">
        <p>Don't have an account?</p>
        <Link to="/signup">Sign up here</Link>
      </div>
    </div>
    </>
  );
};

export default LogIn;
