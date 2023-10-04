import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const someStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
};

const buttonStyle = {
  background: '#1F5014',
  borderRadius: '10px',
  color: 'white',
};

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    // phoneNumber: '',
  });

  const [errorState, setErrorState] = useState({
    username: '',
    email: '',
    name: '',
    // phoneNumber: '',
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const errors = { ...errorState };
    if (!value) {
      errors[name] = 'This field is required';
    } else if (name === 'email' && !validateEmail(value)) {
      errors[name] = 'Must provide a valid email';
    } else {
      errors[name] = '';
    }
    setErrorState(errors);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    Object.keys(formState).forEach((key) => {
      if (!formState[key]) {
        errors[key] = 'This field is required';
      }
    });

    if (formState.email && !validateEmail(formState.email)) {
      errors.email = 'Must provide a valid email';
    }

    setErrorState(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });
        Auth.login(data.addUser.token);
        navigate('/me');
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="text-white" style={someStyle}>
      <h1 className="text-center">Sign Up</h1>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/me">to your dashboard.</Link>
        </p>
      ) : (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name:</Form.Label>
            <Form.Control
              name="name"
              value={formState.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Your name"
            />
            {errorState.name && (
              <div className="error-message">{errorState.name}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Your Username:</Form.Label>
            <Form.Control
              name="username"
              value={formState.username}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Your username"
            />
            {errorState.username && (
              <div className="error-message">{errorState.username}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Email:</Form.Label>
            <Form.Control
              name="email"
              value={formState.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              placeholder="Your email"
            />
            {errorState.email && (
              <div className="error-message">{errorState.email}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              name="password"
              value={formState.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="******"
            />
            {errorState.password && (
              <div className="error-message">{errorState.password}</div>
            )}
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Your Phone Number:</Form.Label>
            <Form.Control
              name="phoneNumber"
              value={formState.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              type="tel"
              placeholder="Your phone number"
            />
            {errorState.phoneNumber && (
              <div className="error-message">{errorState.phoneNumber}</div>
            )}
          </Form.Group> */}

          <div className="d-flex justify-content-center">
            <Button
              style={{ ...buttonStyle, cursor: 'pointer' }}
              variant="primary-color"
              type="submit"
            >
              Submit
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
        <p>Already have an account?</p>
        <Link to="/login">Log in here</Link>
      </div>
    </div>
  );
};

export default Signup;
