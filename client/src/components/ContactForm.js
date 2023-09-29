import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.scss';

// Styles go here

export const ContactForm = () => {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // Resets previous error messages. //
    setNameError('');
    setEmailError('');
    setMessageError('');

    const { user_name, user_email, message } = e.target.elements;

    if (!user_name.value) {
      setNameError('Name is required');
      return;
    }

    if (!user_email.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (!message.value || message.value.length < 5 || message.value.length > 500) {
      setMessageError('Message must be between 5 and 500 characters');
      return;
    }

    emailjs
      .sendForm('service_umymdxc', 'template_0xqzqfo', form.current, 'UXMrhYP-dSOk916Oc')
      .then((result) => {
        console.log(result.text);
        setSuccessMessage('Message has been sent!');
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  return (
    <form className={`${styles.formBox}`} ref={form} onSubmit={sendEmail}>
      <label>
        Name
        <input type="text" name="user_name" required />
        {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
      </label>
      <label>
        Email
        <input type="email" name="user_email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
        {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
      </label>
      <label>
        Message
        <textarea name="message" required minLength={5} maxLength={500} />
        {messageError && <div style={{ color: 'red' }}>{messageError}</div>}
      </label>
      <input type="submit" value="Send" />
      {successMessage && <div>{successMessage}</div>}
    </form>
  );
};
