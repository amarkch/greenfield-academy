import React, { useState, useEffect } from 'react';
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";
import GreenfieldHomePageHeaderBar from "../components/GreenfieldHomePageHeaderBar.jsx";

const GreenfieldAcademy = () => {
  // Register service worker on component mount
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log('Service Worker registered!', reg))
          .catch((err) => console.log('Service Worker registration failed', err));
      });
    }
  }, []);

  const handleActionClick = (actionName) => {
    if (actionName === 'Apply') {
      alert('Redirecting to Application Form...');
    } else {
      alert('Exploring Greenfield Academy...');
    }
  };

  return (
    <>
      {/* Scoped CSS styles injected into the component */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', sans-serif;
          background-color: #f4f7f6;
          color: #333;
          min-height: 100vh;
        }

        .ga-page-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          width: 100%;
        }

        .ga-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ga-banner-wrapper {
          width: 100%;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 50px 50px 40px 50px;
          gap: 30px;
        }

        .ga-header-bar-top-right {
          position: absolute;
          top: 20px;
          right: 30px;
          z-index: 10;
        }

        .ga-left-content {
          flex: 1;
          max-width: 560px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ga-coming-soon {
          font-family: 'Oswald', sans-serif;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #bb0000;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .ga-banner-title {
          font-family: 'Bentham', serif;
          font-size: clamp(2.2rem, 4.5vw, 4.8rem);
          font-weight: 400;
          color: #0b6623;
          margin-bottom: 8px;
          letter-spacing: 1px;
          line-height: 1.05;
        }

        .ga-banner-subtitle {
          font-family: 'Noto Serif Todhri', serif;
          font-size: clamp(0.9rem, 1.1vw, 1.1rem);
          font-weight: 400;
          color: #4a5568;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .ga-banner-buttons {
          display: flex;
          gap: 12px;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .ga-btn-primary, .ga-btn-secondary {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 20px;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .ga-btn-primary {
          background-color: #0b6623;
          color: #ffffff;
          border: 2px solid #0b6623;
        }

        .ga-btn-primary:hover {
          background-color: #084e1b;
          border-color: #084e1b;
        }

        .ga-btn-secondary {
          background-color: transparent;
          color: #0b6623;
          border: 2px solid #0b6623;
        }

        .ga-btn-secondary:hover {
          background-color: rgba(11, 102, 35, 0.05);
        }

        .ga-right-image-container {
          flex: 0 0 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .ga-banner-image {
          width: 100%;
          max-height: 380px;
          object-fit: cover;
          border-radius: 8px;
        }

        .ga-content-section {
          padding: 30px 15px 15px;
          text-align: center;
          max-width: 800px;
        }

        .ga-section-title {
          font-size: clamp(1.6rem, 2.5vw, 2.1rem);
          color: #0b6623;
          margin-bottom: 12px;
          font-family: 'Bentham', serif;
        }

        .ga-section-text {
          font-size: 1rem;
          line-height: 1.7;
          color: #555;
        }

        .ga-cards-container {
          display: flex;
          gap: 20px;
          justify-content: center;
          max-width: 1200px;
          width: 100%;
          margin: 20px auto 40px;
          flex-wrap: wrap;
        }

        .ga-section-image-card {
          flex: 1;
          min-width: 260px;
          max-width: 500px;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .ga-section-image {
          width: 100%;
          height: 240px;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        /* Responsive Media Query for Tablets and Mobiles */
        @media screen and (max-width: 992px) {
          .ga-banner-wrapper {
            flex-direction: column;
            padding: 60px 20px 30px 20px;
            text-align: center;
            align-items: stretch;
          }

          .ga-header-bar-top-right {
            top: 15px;
            right: 15px;
          }

          .ga-left-content {
            max-width: 100%;
            align-items: center;
            margin-top: 15px;
            margin-bottom: 25px;
          }

          .ga-banner-buttons {
            justify-content: center;
            width: 100%;
          }

          .ga-right-image-container {
            width: 100%;
            margin-top: 15px;
          }

          .ga-banner-image {
            max-height: 280px;
          }
        }

        @media screen and (max-width: 576px) {
          .ga-page-wrapper {
            padding: 0px;
          }

          .ga-banner-wrapper {
            padding: 60px 20px 30px 20px;
          }

          .ga-banner-buttons {
            flex-direction: column;
            width: 100%;
          }

          .ga-btn-primary, .ga-btn-secondary {
            width: 100%;
            text-align: center;
          }

          .ga-section-image {
            height: 200px;
          }
        }
      `}</style>

      <div className="ga-page-wrapper">
        <div className="ga-container">
          
          <header className="ga-banner-wrapper">
            <div className="ga-header-bar-top-right">
              <GreenfieldHomePageHeaderBar />  
            </div>
            
            <div className="ga-left-content">
              <div className="ga-coming-soon">Coming Soon</div>
              <h1 className="ga-banner-title">
                GREENFIELD <br />
                ACADEMY
              </h1>

              <p className="ga-banner-subtitle">
                Empowering minds, cultivating character, and shaping the leaders of
                tomorrow through excellence in education.
              </p>
              
              <div className="ga-banner-buttons">
                <button className="ga-btn-primary" onClick={() => handleActionClick('Apply')}>
                  Apply Now
                </button>
                <button className="ga-btn-secondary" onClick={() => handleActionClick('Discover')}>
                  Discover More
                </button>
              </div>
            </div>

            <div className="ga-right-image-container">
              <img 
                src="https://res.cloudinary.com/ds72vzw9j/image/upload/v1787856193/im2_wzrrdm.jpg" 
                alt="Student studying code sketches" 
                className="ga-banner-image" 
              />
            </div>
          </header>

          <section className="ga-content-section">
            <h2 className="ga-section-title">Welcome to Excellence</h2>
            <p className="ga-section-text">
              At Greenfield Academy, we foster a dynamic learning ecosystem built on
              integrity, academic rigor, and creative exploration. Discover our
              programs designed to bring out the absolute best in every student.
            </p>
          </section>

          <div className="ga-cards-container">
            <div className="ga-section-image-card">
              <img 
                src="https://res.cloudinary.com/ds72vzw9j/image/upload/v1787858609/d57c7bcb4ab088f17e46e354d4b28b99_mkrzo7.jpg" 
                alt="Academy excellence and campus life" 
                className="ga-section-image" 
              />
            </div>
            <div className="ga-section-image-card">
              <img 
                src="https://res.cloudinary.com/ds72vzw9j/image/upload/v1787893729/62bf8a655caac3f85892594c7edabbc6_xrwbxn.jpg" 
                alt="Academy excellence and campus life" 
                className="ga-section-image" 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GreenfieldAcademy;