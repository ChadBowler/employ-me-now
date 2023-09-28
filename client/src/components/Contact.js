import React from 'react';
import { ContactForm } from './ContactForm';
import twoSmiles from "../styles/images/man_and_woman_smiling_at_camera.jpg";

// // Styling for the component/page. //
// const contactContainer = {
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: '20px',
// };

const imageSection = {
  flex: '1',
  padding: '20px',
};

// const contactFormSection = {
//   flex: '1',
//   padding: '20px',
// };

const Contact = () => {
  
  return (
    <>
        <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>

        <section style={imageSection}>
          {/* Add your image here */}
          
          <img src={twoSmiles} alt="Git Icon" width="250px" />
        </section>
      
    </>
  );
};

export default Contact;
