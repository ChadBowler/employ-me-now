import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../styles/logo/employ-me-now-low-resolution-logo-color-on-transparent-background.png"
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const headerContainerStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	background: '#1F5014', // Adjust background color as needed
	padding: '10px 20px',
};
const logoStyle = {
  height: '75px',
  width: '200px'
}

const headerStyle = {
	margin: 0,
};

const navStyle = {
	display: 'flex',
	alignItems: 'center',
};

const buttonStyle = {
  background: "#1F5014",
  borderRadius: "10px",
  color: "white",
};

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

 return (
  <>
   <div style={headerContainerStyle}>
    {/* <p className="text-light">LOGO</p> */}
    <img src={logo} alt="Employ Me Now Logo" style={logoStyle} />
    <nav className="px-3" style={navStyle}>
     <a className="px-3 text-light text-decoration-none" href="/home">
      Home
     </a>
     <a className="px-3 text-light text-decoration-none" href="/me">
      Dashboard
     </a>
     <a className="px-3 text-light text-decoration-none" href="/jobs">
      Jobs
     </a>
     <a className="px-3 text-light text-decoration-none" href="/contact">
      Contact
     </a>
    </nav>
    <div>
     {Auth.loggedIn() ? (
      <>
        <Link className="text-light m-2 text-decoration-none" to="/me">
          Welocome, {Auth.getProfile().data.username}
        </Link>
        <button className="btn btn-success text-light m-2" onClick={logout}>
          Logout
        </button>
      </> 
      ) :( 
      <>
      <Link className="btn btn-outline-secondary text-light m-2" to="/signup">
        SIGN UP
      </Link>
      <Link className="btn btn-success text-light m-2" style={buttonStyle} to="/login">
        LOG IN
      </Link>
      </>
      )}
    </div>
   </div>
  </>
 );
}

export default Header;
