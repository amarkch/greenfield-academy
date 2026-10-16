import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./GreenfieldHeaderBar.css";
const host = "https://greenfield-academy-back-end.onrender.com";
//const host = "http://localhost:3000";

const GreenfieldHeaderBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDataOpen, setMobileDataOpen] = useState(false);

  const handleNavClick = (portalName) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setMobileDataOpen(false);
    
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setMobileDataOpen(false);
  };

  return (
    <>
      <header className="ga-header-container">
        <Link to="/" className="ga-header-title">
          GREENFIELD<br/>ACADEMY
        </Link>

        {/* Desktop Navigation */}
        <nav className="ga-desktop-nav">
          <Link to="/" className="ga-desktop-nav-link">Home</Link>
          <Link to="/class/all" className="ga-desktop-nav-link">Class</Link>
          <Link to="/faculty/" className="ga-desktop-nav-link">Teachers</Link>
          
          {
            localStorage.getItem("teacherId") && <div 
            className="ga-dropdown-container"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className="ga-desktop-nav-link ga-dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Enter Data <span>▾</span>
            </button>
            
            {dropdownOpen && (
              <div className="ga-dropdown-menu">
                <Link to="/teacher-data/" className="ga-dropdown-item" onClick={closeAllMenus}>Teacher's Data</Link>
                <Link to="/students-data/" className="ga-dropdown-item" onClick={closeAllMenus}>Student's Data</Link>
                <Link to="/subject-data/" className="ga-dropdown-item" onClick={closeAllMenus}>Subject Data</Link>
                <Link to="/marks-data/" className="ga-dropdown-item" onClick={closeAllMenus}>Marks</Link>
                
              </div>
            )}
          </div>
        }

          <Link to="/parents-dashboard" className="ga-mobile-nav-link" onClick={closeAllMenus}>Parents</Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="ga-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Slide-out Drawer */}
        <nav className={`ga-mobile-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="ga-nav-header">Navigation Menu</div>
          <Link to="/" className="ga-mobile-nav-link" onClick={closeAllMenus}>Home <span>→</span></Link>
          <Link to="/class/all" className="ga-mobile-nav-link" onClick={closeAllMenus}>Class <span>→</span></Link>
          <Link to="/faculty/" className="ga-mobile-nav-link" onClick={closeAllMenus}>Teachers <span>→</span></Link>
          
          {
            localStorage.getItem("teacherId") &&
          <button 
            className="ga-mobile-nav-link" 
            onClick={() => setMobileDataOpen(!mobileDataOpen)}
          >
            Enter Data <span>{mobileDataOpen ? '▴' : '▾'}</span>
          </button>
          }
          {mobileDataOpen && (
            <>
              <Link to="/teacher-data/" className="ga-mobile-sub-link" onClick={closeAllMenus}>Teacher's Data <span>→</span></Link>
              <Link to="/students-data/" className="ga-mobile-sub-link" onClick={closeAllMenus}>Student's Data <span>→</span></Link>
              <Link to="/subject-data/" className="ga-mobile-sub-link" onClick={closeAllMenus}>Subject Data <span>→</span></Link>
              <Link to="/marks-data/" className="ga-mobile-sub-link" onClick={closeAllMenus}>Marks <span>→</span></Link>
            </>
          )}
          
          <Link to="/parents-dashboard" className="ga-mobile-nav-link" onClick={closeAllMenus}>Parents <span>→</span></Link>
          
        </nav>
      </header>
    </>
  );
};

export default GreenfieldHeaderBar;