import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.png"
import './Footer.css';

function Footer() {
  return (
    <footer className="pageFooter">
      <div className="footerContainer">
        
        <div className="footerMain">
          <div className="footerLogo">
           <img src={Logo} alt="Logo" className="navLogo" />
          </div>

          <p className="footerDetail">Attending an event, has never been this easy! Click, Tap, And Pay. Without the stress of inconvenience!</p>

          <div className="socialIcons">
            <a href="https://linkedin.com" target="_blank" className="socialIcon">in</a>
            <a href="https://facebook.com" target="_blank" className="socialIcon">f</a>
            <a href="https://twitter.com" target="_blank" className="socialIcon">t</a>
          </div>
        </div>

        <div className="footerDetailTwo">
          <h4>More</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
            <li><Link to="/Venues">Venues</Link></li>
            <li><Link to="/Events">Special Events</Link></li>
          </ul>
        </div>

        <div className="footerDetailThree">
          <h4>Help</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footerDetailFour">
          <h4>Partner</h4>
          <ul>
            <li><Link to="/partner-hub">Partner Hub</Link></li>
            <li><Link to="/affiliates">Affiliates</Link></li>
            <li><Link to="/advertise">Advertise</Link></li>
          </ul>
        </div>

      </div>

      <div className="footerBottom">
        <p>© 2026 ReserveX. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer