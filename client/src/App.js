import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/Header";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

const App = () => {
  return (
    <Router>
        <div className="flex-column justify-flex-start min-100-vh bg-primary-black">
          <Header />
          
          <div className="container">
            <Routes>
              {/* Define routes using the Route component to render different page components at different paths */}
              {/* Define a default route that will render the Home component */}
              <Route 
                path="/home" //for any user
                element={<Home />} 
              />
              <Route 
                path="/dashboard" // for signed-in user
                element={<Dashboard />} 
              />
              <Route 
                path="/jobs" 
                element={<Jobs />} 
              />
              <Route 
              path="/contact" 
              element={<Contact />} 
              />
              <Route 
              path="/signup" 
              element={<SignUp />} 
              />
              <Route 
              path="/login" 
              element={<LogIn />} 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    
  );
}

export default App;
