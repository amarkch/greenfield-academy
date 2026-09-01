import React, { useState } from 'react';
import { Link } from "react-router-dom";

const GreenfieldHeaderBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (portalName) => {
    setMobileMenuOpen(false);
    alert(`Navigating to ${portalName} Portal`);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* --- Unified Header Bar (Desktop & Mobile) --- */
        .ga-header-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #ffffff;
          padding: 16px 40px;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
        }

        .ga-header-title {
          font-family: 'Bentham', serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: #0b6623;
          letter-spacing: 1px;
          line-height: 1.2;
          text-decoration: none;
        }

        /* --- Desktop Navigation Styles --- */
        .ga-desktop-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ga-desktop-nav-link {
          font-family: 'Oswald', sans-serif;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #2d3748;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .ga-desktop-nav-link span {
          opacity: 0.4;
          font-size: 0.85rem;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .ga-desktop-nav-link:hover {
          background-color: rgba(11, 102, 35, 0.08);
          color: #0b6623;
        }

        .ga-desktop-nav-link:hover span {
          opacity: 1;
          transform: translateY(2px);
          color: #0b6623;
        }

        /* --- Mobile Toggle Button (Hidden on Desktop) --- */
        .ga-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.4rem;
          color: #0b6623;
          z-index: 110;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .ga-menu-toggle:hover {
          background-color: rgba(11, 102, 35, 0.06);
        }

        /* --- Mobile Slide-out Drawer --- */
        .ga-mobile-nav {
          position: fixed;
          top: 0;
          right: 0;
          width: 82%;
          max-width: 320px;
          height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f4f7f6 100%);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          gap: 8px;
          padding: 60px 24px 30px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(100%);
          z-index: 105;
        }

        .ga-mobile-nav.mobile-open {
          transform: translateX(0);
        }

        .ga-nav-header {
          font-family: 'Bentham', serif;
          font-size: 1.1rem;
          color: #0b6623;
          margin-bottom: 8px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e2e8f0;
          letter-spacing: 1px;
        }

        .ga-mobile-nav-link {
          font-family: 'Oswald', sans-serif;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #2d3748;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          text-align: left;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ga-mobile-nav-link span {
          opacity: 0.4;
          font-size: 0.9rem;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .ga-mobile-nav-link:hover {
          background-color: rgba(11, 102, 35, 0.08);
          color: #0b6623;
          padding-left: 20px;
        }

        .ga-mobile-nav-link:hover span {
          opacity: 1;
          transform: translateX(4px);
          color: #0b6623;
        }

        /* --- Responsive Media Query --- */
        @media screen and (max-width: 992px) {
          .ga-header-container {
            padding: 12px 20px;
          }
          .ga-desktop-nav {
            display: none;
          }
          .ga-mobile-header-title {
            font-size: 0.85rem;
          }
          .ga-menu-toggle {
            display: flex;
          }
        }
      `}</style>

      <header className="ga-header-container">
        <Link to="/" className="ga-header-title">
          GREENFIELD<br/>ACADEMY
        </Link>

        {/* Desktop Navigation Bar */}
        <nav className="ga-desktop-nav">
          <Link to="/" className="ga-desktop-nav-link">
            Home
          </Link>
          <Link to="/students/" className="ga-desktop-nav-link">
            Student
          </Link>
          <Link to="/faculty/" className="ga-desktop-nav-link">
            Faculty
          </Link>
          <Link to="/teacher-data/" className="ga-desktop-nav-link">
            Enter Faculty Data
          </Link>
          <button className="ga-desktop-nav-link" onClick={() => handleNavClick('Parents')}>
            Parents
          </button>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="ga-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Professional Slide-out Mobile Navigation Drawer */}
        <nav className={`ga-mobile-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="ga-nav-header">Navigation Menu</div>
          
          <Link to="/" className="ga-mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home <span>→</span>
          </Link>
          <Link to="/students/" className="ga-mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Student <span>→</span>
          </Link>
          <Link to="/faculty/" className="ga-mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Faculty <span>→</span>
          </Link>
          <Link to="/teacher-data/" className="ga-mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Enter Faculty Data <span>→</span>
          </Link>
          <Link className="ga-mobile-nav-link" onClick={() => handleNavClick('Parents')}>
            Parents <span>→</span>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default GreenfieldHeaderBar;