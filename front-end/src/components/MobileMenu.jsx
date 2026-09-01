import React from 'react';
import { Link } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose, onNavClick }) => {
  return (
    <>
      <style>{`
        .ga-top-nav {
          position: fixed;
          top: 0;
          right: 0;
          width: 80%;
          max-width: 320px;
          height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f4f7f6 100%);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          gap: 12px;
          padding: 60px 30px 40px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(100%);
          z-index: 1000;
        }

        .ga-top-nav.mobile-open {
          transform: translateX(0);
        }

        .ga-nav-header {
          font-family: 'Bentham', serif;
          font-size: 1.2rem;
          color: #0b6623;
          margin-bottom: 10px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e2e8f0;
          letter-spacing: 1px;
        }

        .ga-nav-link {
          font-family: 'Oswald', sans-serif;
          font-size: 1.05rem;
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

        .ga-nav-link span {
          opacity: 0.4;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .ga-nav-link:hover {
          background-color: rgba(11, 102, 35, 0.08);
          color: #0b6623;
          padding-left: 20px;
        }

        .ga-nav-link:hover span {
          opacity: 1;
          transform: translateX(4px);
          color: #0b6623;
        }

        @media screen and (min-width: 993px) {
          .ga-top-nav {
            position: absolute;
            top: 25px;
            right: 40px;
            width: auto;
            max-width: none;
            height: auto;
            background: transparent;
            box-shadow: none;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 20px;
            padding: 0;
            transform: translateX(0) !important;
          }

          .ga-nav-header {
            display: none;
          }

          .ga-nav-link {
            font-size: 0.95rem;
            padding: 0;
            border-radius: 0;
            color: #0b6623;
          }

          .ga-nav-link span {
            display: none;
          }

          .ga-nav-link:hover {
            background: transparent;
            padding-left: 0;
            opacity: 0.7;
          }
        }
      `}</style>

      <nav className={`ga-top-nav ${isOpen ? 'mobile-open' : ''}`}>
        <div className="ga-nav-header">Menu</div>
        <Link to="/" className="ga-nav-link" onClick={onClose}>
          Home <span>→</span>
        </Link>
        <Link to="/students/" className="ga-nav-link" onClick={onClose}>
          Student <span>→</span>
        </Link>
        <Link to="/faculty/" className="ga-nav-link" onClick={onClose}>
          Faculty <span>→</span>
        </Link>
        <Link to="/teacher-data/" className="ga-nav-link" onClick={onClose}>
          Enter Faculty Data <span>→</span>
        </Link>
        <button className="ga-nav-link" onClick={() => onNavClick('Parents')}>
          Parents <span>→</span>
        </button>
      </nav>
    </>
  );
};

export default MobileMenu;