// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSignInAlt, FaHome, FaProjectDiagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('token') != null || undefined;
    setIsAuthenticated(loggedIn);
  }, []);
  const removeToken = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">FreeNex</h1>
        <nav className="nav-links">
          <Link to="/" className="nav-link"><FaHome /> Home</Link>
          <Link to="/nearby" className="nav-link"><FaMapMarkerAlt /> Nearby</Link>
          <Link to="/projects" className="nav-link"><FaProjectDiagram /> Projects</Link>
          {
            isAuthenticated ? (<Link to="/messages" className="nav-link"><FaEnvelope /> Messages</Link>) : ""
          }
          {isAuthenticated ? (
            <Link to="/profile" className="nav-link"><FaUserCircle /> Profile</Link>
          ) : (
            <>
              <Link to="/signup" className="nav-link"><FaUserCircle /> Sign Up</Link>
              <Link to="/login" className="nav-link"><FaSignInAlt /> Login</Link>
            </>
          )}
          {isAuthenticated ? (
            <button className='logout' onClick={removeToken}>Logout</button>
          ) : ""
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
