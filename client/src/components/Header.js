import React from "react";
// import "bootstrap/dist/css/bootstrap.css";

const headerContainerStyle = {
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 background: "#f0f0f0", // Adjust background color as needed
 padding: "10px 20px",
};

const headerStyle = {
 margin: 0,
};

const navStyle = {
 display: "flex",
 alignItems: "center",
};

function Header() {
 return (
  <>
   <div style={headerContainerStyle}>
    <p>LOGO</p>
    <header style={headerStyle}>
     <h1>Header</h1>
    </header>
    <nav class="px-3" style={navStyle}>
     <a class="px-3" href="/home">
      Home
     </a>
     <a class="px-3" href="/dashboard">
      Dashboard
     </a>
     <a class="px-3" href="/jobs">
      Jobs
     </a>
     <a class="px-3" href="/contact">
      Contact
     </a>
    </nav>
    <div>
     <div>
      <a class="px-5" href="/">
       SIGN IN
      </a>
     </div>
     <a class="px-5" href="/">
      SIGNED IN WIDGET
     </a>
    </div>
   </div>
  </>
 );
}

export default Header;
