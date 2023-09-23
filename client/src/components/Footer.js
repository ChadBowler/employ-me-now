import React from "react";

const footerStyles = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  
};

const Footer = () => {
  return (
    <>
      <div style={footerStyles}>
        {/* Link to path /about-company */}
        {/* Link to path /faq */}
      </div>
      <div>
        <p>&copy; 2023 4ninjas group</p>
      </div>
    </>
  );
};

export default Footer;
