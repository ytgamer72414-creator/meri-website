import React from 'react';
import './Footer.css';
import logo from '../assets/klyrex_logo.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Klyrex Media" />
            <span>Klyrex.</span>
          </div>
          <p>A creative agency for brands that refuse to be boring.</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Work</h4>
            <a href="#">Motion Graphics</a>
            <a href="#">Short-form Reels</a>
            <a href="#">SaaS Explainers</a>
          </div>
          <div className="footer-column">
            <h4>Agency</h4>
            <a href="/about">About</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Klyrex Media. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
