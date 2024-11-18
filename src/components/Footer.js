// Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
      </div>
      <p>&copy; 2024 FreeNex. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
