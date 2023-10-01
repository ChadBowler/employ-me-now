import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const flexContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: 'calc(100vh - 20px)',
  paddingTop: '20px',
  backgroundColor: '#272727',
};

const formColumnStyles = {
  display: 'flex',
  flexDirection: 'column',
};

const formInputStyles = {
  marginBottom: '10px',
};

const btnPrimaryStyles = {
  backgroundColor: '#1F5014',
  color: '#F6F6F6',
  border: 'none',
};

const btnPrimaryHoverStyles = {
  backgroundColor: '#343a40',
};

const btnPrimaryActiveStyles = {
  backgroundColor: '#343a40',
};

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });
  const [errorState, setErrorState] = useState({
    username: '',
    email: '',
    name: '',
    phoneNumber: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
      // If name is "phoneNumber," parse the value as an integer
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
    // console.log(formState);
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
          refetchQueries: [{ query: QUERY_USER }, { query: QUERY_ME }],
        });

        Auth.login(data.addUser.token);
        return <Navigate to="/me" />;
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <main style={flexContainerStyles}>
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/me">to your dashboard.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} style={formColumnStyles}>
                <div className="form-group">
                  <input
                    style={formInputStyles}
                    placeholder="Your name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errorState.name && (
                    <div className="error-message">{errorState.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    style={formInputStyles}
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errorState.username && (
                    <div className="error-message">{errorState.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    style={formInputStyles}
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errorState.email && (
                    <div className="error-message">{errorState.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    style={formInputStyles}
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errorState.password && (
                    <div className="error-message">{errorState.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    style={formInputStyles}
                    placeholder="Your phone number"
                    name="phoneNumber"
                    type="tel"
                    value={formState.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errorState.phoneNumber && (
                    <div className="error-message">{errorState.phoneNumber}</div>
                  )}
                </div>
                <button
                  style={{ ...btnPrimaryStyles, cursor: 'pointer' }}
                  type="submit"
                  onClick={() => {
                    <Navigate to="/me" />;
                  }}
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
