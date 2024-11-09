// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to FreeNex</h1>
      <p className="tagline">Discover, Connect, and Collaborate with Freelancers Near You!</p>
      <p className="description">
        Join a global community of freelancers and connect with professionals nearby for exciting on-the-go collaborations.
      </p>
      <div className="buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
