import React from "react";
import gitlogo from "../styles/images/github-mark.png";

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
        {/* POSSIBLE Link to path /about-company */}
        {/* POSSIBLE Link to path /faq */}
      </div>
      <div>
      <a className="px-2" href="https://github.com/ChadBowler/employ-me-now" target="_blank" rel="noreferrer">
        <img src={gitlogo} alt="Git Icon" width="30px" />
      </a>
        <p>&copy; 2023 4ninjas group</p>
      </div>
    </>
  );
};

export default Footer;
