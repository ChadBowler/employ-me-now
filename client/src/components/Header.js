import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import logo from "../styles/images/"
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const headerContainerStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	background: '#1F5014', // Adjust background color as needed
	padding: '10px 20px',
};

const headerStyle = {
	margin: 0,
};

const navStyle = {
	display: 'flex',
	alignItems: 'center',
};

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

 return (
  <>
   <div style={headerContainerStyle}>
    <p className="text-light">LOGO</p>
    {/* <img src={logo} alt="Employ Me Now Logo"/> */}
    <nav className="px-3" style={navStyle}>
     <a className="px-3 text-light text-decoration-none" href="/home">
      Home
     </a>
     <a className="px-3 text-light text-decoration-none" href="/dashboard">
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
        <Link className="text-light m-2 text-decoration-none" to="/dashboard">
          Welocome {Auth.getProfile().data.username}!
        </Link>
        <button className="btn btn-success text-light m-2" onClick={logout}>
          Logout
        </button>
      </> 
      ) :( 
      <>
      <Link className="btn btn-secondary text-light m-2" to="/signup">
        SIGN UP
      </Link>
      <Link className="btn btn-success text-light m-2" to="/login">
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
