import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { C, fontDisplay, fontBody } from "../theme.js";
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

  const handleNavClick = (portalName) => {
    alert(`Navigating to ${portalName} Portal`);
  };

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
          padding: 20px;
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
          padding: 40px 60px;
          gap: 20px;
        }

        .ga-top-nav {
          position: absolute;
          top: 25px;
          right: 40px;
          display: flex;
          gap: 20px;
          z-index: 3;
        }

        .ga-nav-link {
          font-family: 'Oswald', sans-serif;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #0b6623;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          transition: opacity 0.2s ease;
        }

        .ga-nav-link:hover {
          opacity: 0.7;
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
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #bb0000;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .ga-banner-title {
          font-family: 'Bentham', serif;
          font-size: clamp(2.5rem, 5vw, 5.2rem);
          font-weight: 400;
          color: #0b6623;
          margin-bottom: 6px;
          letter-spacing: 1px;
          line-height: 1.02;
        }

        .ga-banner-subtitle {
          font-family: 'Noto Serif Todhri', serif;
          font-size: clamp(0.95rem, 1.2vw, 1.15rem);
          font-weight: 400;
          color: #4a5568;
          margin-bottom: 22px;
          line-height: 1.45;
        }

        .ga-banner-buttons {
          display: flex;
          gap: 15px;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .ga-btn-primary {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 22px;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          background-color: #0b6623;
          color: #ffffff;
          border: 2px solid #0b6623;
          transition: all 0.3s ease;
        }

        .ga-btn-primary:hover {
          background-color: #084e1b;
          border-color: #084e1b;
        }

        .ga-btn-secondary {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 22px;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          background-color: transparent;
          color: #0b6623;
          border: 2px solid #0b6623;
          transition: all 0.3s ease;
        }

        .ga-btn-secondary:hover {
          background-color: rgba(11, 102, 35, 0.05);
        }

        .ga-right-image-container {
          flex: 0 0 42%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          z-index: 2;
        }

        .ga-banner-image {
          width: 100%;
          max-height: 430px;
          object-fit: cover;
          border-radius: 8px;
        }

        .ga-content-section {
          padding: 40px 20px 20px;
          text-align: center;
          max-width: 900px;
        }

        .ga-section-title {
          font-size: clamp(1.8rem, 3vw, 2.2rem);
          color: #0b6623;
          margin-bottom: 15px;
          font-family: 'Bentham', serif;
        }

        .ga-section-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
        }

        .ga-cards-container {
          display: flex;
          gap: 30px;
          justify-content: center;
          max-width: 1200px;
          width: 100%;
          margin: 30px auto 50px;
          flex-wrap: wrap;
        }

        .ga-section-image-card {
          flex: 1;
          min-width: 280px;
          max-width: 450px;
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
          height: 280px;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        @media screen and (max-width: 992px) {
          .ga-banner-wrapper {
            flex-direction: column;
            padding: 30px 20px;
            height: auto;
            text-align: center;
          }

          .ga-top-nav {
            position: static;
            justify-content: center;
            margin-bottom: 20px;
            width: 100%;
          }

          .ga-left-content {
            max-width: 100%;
            padding-left: 0;
            align-items: center;
            margin-bottom: 30px;
          }

          .ga-banner-buttons {
            justify-content: center;
          }

          .ga-right-image-container {
            flex: none;
            width: 100%;
            justify-content: center;
          }

          .ga-banner-image {
            max-height: 350px;
          }
        }

        @media screen and (max-width: 576px) {
          .ga-page-wrapper {
            padding: 10px;
          }

          .ga-banner-wrapper {
            padding: 20px 15px;
          }

          .ga-top-nav {
            gap: 15px;
            font-size: 0.85rem;
          }

          .ga-banner-buttons {
            flex-direction: column;
            width: 100%;
          }

          .ga-btn-primary, .ga-btn-secondary {
            width: 100%;
            text-align: center;
          }

          .ga-cards-container {
            gap: 20px;
          }
        }
      `}</style>

      <div className="ga-page-wrapper">
        <div className="ga-container">
          <header className="ga-banner-wrapper">
            <nav className="ga-top-nav">
            <Link
              to={`/students/`}
              className="ga-nav-link"
            >
              Student
            </Link>
            <Link
              to={`/faculty/`}
              className="ga-nav-link"
            >
              Faculty
            </Link>
              
              
              <button className="ga-nav-link" onClick={() => handleNavClick('Parents')}>Parents</button>
            </nav>

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