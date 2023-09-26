import React, { useState } from 'react';

// Styling for the component/page. //
const contactContainer = {
  
};

// Handler for the email form, disallows a user to not enter a valid email. //
const Contact = () => {
  // Sets state variables for name, email and 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    // Email validation using valid email pattern and requirement handler for email. //
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputEmail)) {
      setEmailError('You must enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  // Added a handleblur that takes a field name as an argument, checks if email field is empty. //
  const handleBlur = (field) => {
    // Logic for handling no email entry. //a
    if (field === 'email' && !email) {
      setEmailError('Email required!');
    }
  };

  //Section for HTML: //
  return (
    <>
    {/* Section for contact form. */}
      <section style={contactContainer} className="text-center">
        <h1>Contact Us</h1>
        <section className="p-3 d-flex flex-column align-items-center">
          <div className="mb-3">
            {/* Name input. */}
            <input
              type="text"
              className="email-form"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
            />
          </div>
          <div className="mb-3">
            {/* Email input. */}
            <input
              type="email"
              className="email-form"
              placeholder="your email*"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur('email')}
            />
            {/* Logic for handling the email error. */}
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>
          <div className="mb-3">
            {/* Text area is rendered with message and email-form class-list.  */}
            <textarea
              className="email-form"
              placeholder="leave a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default Contact;
