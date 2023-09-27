import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

//npm i @emailjs/browser

//SYTLES HERE

export const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_umymdxc", 
      "template_0xqzqfo", 
      form.current, 
      "UXMrhYP-dSOk916Oc"
      )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

